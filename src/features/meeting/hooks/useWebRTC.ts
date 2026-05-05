
// The master hook that orchestrates signaling + peer connection

import { useEffect, useRef, useCallback } from 'react';
import { Socket } from 'socket.io-client';
import { PeerConnectionManager, DEFAULT_RTC_CONFIG } from '@/lib/webrtc/peer-connection';

interface UseWebRTCProps {
  socket: Socket;
  roomId: string;
  localStream: MediaStream | null;
  onRemoteStream: (peerId: string, stream: MediaStream) => void;
  onPeerDisconnected: (peerId: string) => void;
}

export function useWebRTC({
  socket,
  roomId,
  localStream,
  onRemoteStream,
  onPeerDisconnected,
}: UseWebRTCProps) {
  // Map of peerId -> PeerConnectionManager
  const peersRef = useRef<Map<string, PeerConnectionManager>>(new Map());

  const createPeerConnection = useCallback(
    (peerId: string, isInitiator: boolean) => {
      const manager = new PeerConnectionManager(DEFAULT_RTC_CONFIG);
      const pc = manager.connection;

      // Add local tracks to the peer connection
      localStream?.getTracks().forEach(track => {
        pc.addTrack(track, localStream);
      });

      // Handle ICE candidates - send them to remote peer via signaling server
      pc.onicecandidate = ({ candidate }) => {
        if (candidate) {
          socket.emit('webrtc:ice-candidate', {
            to: peerId,
            candidate: candidate.toJSON(),
            roomId,
          });
        }
      };

      // When remote track arrives, build stream and notify UI
      pc.ontrack = ({ streams }) => {
        if (streams[0]) {
          onRemoteStream(peerId, streams[0]);
        }
      };

      // Monitor connection state for auto-reconnect logic
      pc.onconnectionstatechange = () => {
        if (pc.connectionState === 'failed' || pc.connectionState === 'disconnected') {
          onPeerDisconnected(peerId);
          peersRef.current.delete(peerId);
          manager.destroy();
        }
      };

      peersRef.current.set(peerId, manager);

      // If we are the caller, create and send an offer
      if (isInitiator) {
        pc.createOffer()
          .then(offer => pc.setLocalDescription(offer))
          .then(() => {
            socket.emit('webrtc:offer', {
              to: peerId,
              offer: pc.localDescription,
              roomId,
            });
          });
      }

      return manager;
    },
    [localStream, socket, roomId, onRemoteStream, onPeerDisconnected]
  );

  useEffect(() => {
    if (!localStream) return;

    // A new peer joined the room — WE initiate the offer
    socket.on('webrtc:peer-joined', ({ peerId }: { peerId: string }) => {
      createPeerConnection(peerId, true);
    });

    // We received an offer from someone else
    socket.on('webrtc:offer', async ({ from, offer }: { from: string; offer: RTCSessionDescriptionInit }) => {
      const manager = createPeerConnection(from, false);
      const pc = manager.connection;

      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socket.emit('webrtc:answer', {
        to: from,
        answer: pc.localDescription,
        roomId,
      });
    });

    // We received an answer to our offer
    socket.on('webrtc:answer', async ({ from, answer }: { from: string; answer: RTCSessionDescriptionInit }) => {
      const manager = peersRef.current.get(from);
      if (manager) {
        await manager.connection.setRemoteDescription(new RTCSessionDescription(answer));
      }
    });

    // We received an ICE candidate from a peer
    socket.on('webrtc:ice-candidate', async ({ from, candidate }: { from: string; candidate: RTCIceCandidateInit }) => {
      const manager = peersRef.current.get(from);
      if (manager) {
        await manager.addIceCandidate(candidate);
      }
    });

    // Peer left
    socket.on('webrtc:peer-left', ({ peerId }: { peerId: string }) => {
      const manager = peersRef.current.get(peerId);
      if (manager) {
        manager.destroy();
        peersRef.current.delete(peerId);
        onPeerDisconnected(peerId);
      }
    });

    return () => {
      socket.off('webrtc:peer-joined');
      socket.off('webrtc:offer');
      socket.off('webrtc:answer');
      socket.off('webrtc:ice-candidate');
      socket.off('webrtc:peer-left');

      // Cleanup all peer connections
      peersRef.current.forEach(manager => manager.destroy());
      peersRef.current.clear();
    };
  }, [localStream, socket, createPeerConnection, roomId, onPeerDisconnected]);
}