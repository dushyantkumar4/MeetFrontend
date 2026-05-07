import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/react";
import { useMediaStream } from "../hooks/useMediaStream";
import { useWebRTC } from "../hooks/useWebRTC";
import { VideoGrid } from "../components/VideoGrid";
import { MeetingControls } from "../components/meetingControls";
import { useMeetingStore } from "../store/meeting.store";
import { getSocket } from "@/lib/socket/socket.client";
import { SOCKET_EVENTS } from "@/lib/socket/socket.events";
import type { Participant } from "../types/meeting.types";

export default function MeetingPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  const {
    localStream,
    isVideoEnabled,
    isAudioEnabled,
    toggleVideo,
    toggleAudio,
    stopStream,
  } = useMediaStream();
  const {
    addParticipant,
    removeParticipant,
    participants,
    activeSpeakerId,
    reset,
  } = useMeetingStore();
  const [socket] = useState(() => {
    try {
      return getSocket();
    } catch {
      return null;
    }
  });

  const onRemoteStream = useCallback(
    (peerId: string, stream: MediaStream) => {
      addParticipant({
        id: peerId,
        socketId: peerId,
        name: "Participant",
        avatarUrl: undefined,
        isVideoOn: true,
        isAudioOn: true,
        isScreenSharing: false,
        isHandRaised: false,
        stream,
      });
    },
    [addParticipant],
  );

  const onPeerDisconnected = useCallback(
    (peerId: string) => {
      removeParticipant(peerId);
    },
    [removeParticipant],
  );

  useWebRTC({
    socket,
    roomId: roomId!,
    localStream,
    onRemoteStream,
    onPeerDisconnected,
  });

  useEffect(() => {
    if (!socket || !roomId) return;
    socket.emit(SOCKET_EVENTS.ROOM_JOIN, { roomId });
    return () => {
      socket.emit(SOCKET_EVENTS.ROOM_LEAVE, { roomId });
    };
  }, [socket, roomId]);

  const handleLeave = useCallback(() => {
    stopStream();
    reset();
    navigate("/dashboard");
  }, [stopStream, reset, navigate]);

  return (
    <div className="flex h-screen flex-col bg-zinc-950">
      {/* Video area */}
      <div className="flex-1 overflow-hidden">
        <VideoGrid
          localStream={localStream}
          localName={user?.fullName ?? "You"}
          participants={[...participants.values()]}
          activeSpeakerId={activeSpeakerId}
        />
      </div>

      {/* Controls bar */}
      <div className="flex items-center justify-center p-4">
        <MeetingControls onLeave={handleLeave} />
      </div>
    </div>
  );
}
