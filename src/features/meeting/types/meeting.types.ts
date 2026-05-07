export interface Participant {
  id: string;
  socketId: string;
  name: string;
  avatarUrl?: string;
  isVideoOn: boolean;
  isAudioOn: boolean;
  isScreenSharing: boolean;
  isHandRaised: boolean;
  stream?: MediaStream;
}

export type MeetingStatus = 'idle' | 'joining' | 'in-meeting' | 'ended';
export type ViewMode = 'grid' | 'speaker';

export interface SignalingPayload {
  to: string;
  roomId: string;
  offer?: RTCSessionDescriptionInit;
  answer?: RTCSessionDescriptionInit;
  candidate?: RTCIceCandidateInit;
}