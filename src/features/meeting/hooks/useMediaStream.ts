

import { useState, useEffect, useRef } from 'react';

interface MediaStreamState {
  localStream: MediaStream | null;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  error: string | null;
}

interface UseMediaStreamReturn extends MediaStreamState {
  toggleVideo: () => void;
  toggleAudio: () => void;
  stopStream: () => void;
}

export function useMediaStream(): UseMediaStreamReturn {
  const [state, setState] = useState<MediaStreamState>({
    localStream: null,
    isVideoEnabled: true,
    isAudioEnabled: true,
    error: null,
  });

  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    async function initStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            frameRate: { ideal: 30 },
          },
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });

        streamRef.current = stream;
        setState(prev => ({ ...prev, localStream: stream }));
      } catch (err) {
        const error = err as Error;
        // Handle specific error types
        if (error.name === 'NotAllowedError') {
          setState(prev => ({
            ...prev,
            error: 'Camera/microphone permission denied. Please allow access.',
          }));
        } else if (error.name === 'NotFoundError') {
          setState(prev => ({
            ...prev,
            error: 'No camera or microphone found on this device.',
          }));
        } else {
          setState(prev => ({ ...prev, error: error.message }));
        }
      }
    }

    initStream();

    // Cleanup on unmount
    return () => {
      streamRef.current?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const toggleVideo = () => {
    const videoTrack = streamRef.current?.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setState(prev => ({ ...prev, isVideoEnabled: videoTrack.enabled }));
    }
  };

  const toggleAudio = () => {
    const audioTrack = streamRef.current?.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setState(prev => ({ ...prev, isAudioEnabled: audioTrack.enabled }));
    }
  };

  const stopStream = () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
    streamRef.current = null;
    setState(prev => ({ ...prev, localStream: null }));
  };

  return { ...state, toggleVideo, toggleAudio, stopStream };
}