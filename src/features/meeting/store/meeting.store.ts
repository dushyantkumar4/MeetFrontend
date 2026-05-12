
import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

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

interface MeetingState {
  // Room info
  roomId: string | null;
  isHost: boolean;
  meetingStatus: 'idle' | 'joining' | 'in-meeting' | 'ended';

  // Local user
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isScreenSharing: boolean;
  isHandRaised: boolean;

  // Participants (remote peers)
  participants: Map<string, Participant>;

  // View
  viewMode: 'grid' | 'speaker';
  activeSpeakerId: string | null;

  // UI panels
  isChatOpen: boolean;
  isParticipantListOpen: boolean;

  // Actions
  setRoomId: (roomId: string) => void;
  setMeetingStatus: (status: MeetingState['meetingStatus']) => void;
  toggleVideo: () => void;
  toggleAudio: () => void;
  toggleScreenShare: () => void;
  toggleHandRaise: () => void;
  addParticipant: (participant: Participant) => void;
  removeParticipant: (id: string) => void;
  updateParticipant: (id: string, updates: Partial<Participant>) => void;
  setViewMode: (mode: 'grid' | 'speaker') => void;
  setActiveSpeaker: (id: string | null) => void;
  toggleChat: () => void;
  toggleParticipantList: () => void;
  reset: () => void;
}

const initialState = {
  roomId: null,
  isHost: false,
  meetingStatus: 'idle' as const,
  isVideoEnabled: true,
  isAudioEnabled: true,
  isScreenSharing: false,
  isHandRaised: false,
  participants: new Map(),
  viewMode: 'grid' as const,
  activeSpeakerId: null,
  isChatOpen: false,
  isParticipantListOpen: false,
};

export const useMeetingStore = create<MeetingState>()(
  devtools(
    subscribeWithSelector((set) => ({
      ...initialState,

      setRoomId: (roomId) => set({ roomId }, false, 'setRoomId'),

      setMeetingStatus: (meetingStatus) =>
        set({ meetingStatus }, false, 'setMeetingStatus'),

      toggleVideo: () =>
        set(
          (state) => ({ isVideoEnabled: !state.isVideoEnabled }),
          false,
          'toggleVideo'
        ),

      toggleAudio: () =>
        set(
          (state) => ({ isAudioEnabled: !state.isAudioEnabled }),
          false,
          'toggleAudio'
        ),

      toggleScreenShare: () =>
        set(
          (state) => ({ isScreenSharing: !state.isScreenSharing }),
          false,
          'toggleScreenShare'
        ),

      toggleHandRaise: () =>
        set(
          (state) => ({ isHandRaised: !state.isHandRaised }),
          false,
          'toggleHandRaise'
        ),

      addParticipant: (participant) =>
        set(
          (state) => ({
            participants: new Map(state.participants).set(participant.id, participant),
          }),
          false,
          'addParticipant'
        ),

      removeParticipant: (id) =>
        set((state) => {
          const next = new Map(state.participants);
          next.delete(id);
          return { participants: next };
        }, false, 'removeParticipant'),

      updateParticipant: (id, updates) =>
        set((state) => {
          const next = new Map(state.participants);
          const existing = next.get(id);
          if (existing) next.set(id, { ...existing, ...updates });
          return { participants: next };
        }, false, 'updateParticipant'),

      setViewMode: (viewMode) => set({ viewMode }, false, 'setViewMode'),

      setActiveSpeaker: (activeSpeakerId) =>
        set({ activeSpeakerId }, false, 'setActiveSpeaker'),

      toggleChat: () =>
        set((state) => ({ isChatOpen: !state.isChatOpen }), false, 'toggleChat'),

      toggleParticipantList: () =>
        set(
          (state) => ({ isParticipantListOpen: !state.isParticipantListOpen }),
          false,
          'toggleParticipantList'
        ),

      // Called when leaving a meeting — reset to clean state
      reset: () => set(initialState, false, 'reset'),
    })),
    { name: 'MeetingStore' }
  )
);