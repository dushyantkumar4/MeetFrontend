import { Mic, MicOff, Video, VideoOff, MonitorUp, PhoneOff, MessageSquare, Users, Hand } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMeetingStore } from '../store/meeting.store';

interface MeetingControlsProps {
  onLeave: () => void;
}

export function MeetingControls({ onLeave }: MeetingControlsProps) {
  const {
    isVideoEnabled, isAudioEnabled, isScreenSharing, isHandRaised,
    isChatOpen, isParticipantListOpen,
    toggleVideo, toggleAudio, toggleScreenShare, toggleHandRaise,
    toggleChat, toggleParticipantList,
  } = useMeetingStore();

  return (
    <div className="flex items-center justify-center gap-3 rounded-2xl bg-zinc-900/80 p-3 backdrop-blur-sm">
      <ControlButton
        onClick={toggleAudio}
        active={isAudioEnabled}
        activeIcon={<Mic className="h-5 w-5" />}
        inactiveIcon={<MicOff className="h-5 w-5" />}
        label={isAudioEnabled ? 'Mute' : 'Unmute'}
        danger={!isAudioEnabled}
      />
      <ControlButton
        onClick={toggleVideo}
        active={isVideoEnabled}
        activeIcon={<Video className="h-5 w-5" />}
        inactiveIcon={<VideoOff className="h-5 w-5" />}
        label={isVideoEnabled ? 'Stop Video' : 'Start Video'}
        danger={!isVideoEnabled}
      />
      <ControlButton
        onClick={toggleScreenShare}
        active={isScreenSharing}
        activeIcon={<MonitorUp className="h-5 w-5" />}
        inactiveIcon={<MonitorUp className="h-5 w-5" />}
        label={isScreenSharing ? 'Stop Share' : 'Share Screen'}
      />
      <ControlButton
        onClick={toggleHandRaise}
        active={isHandRaised}
        activeIcon={<Hand className="h-5 w-5" />}
        inactiveIcon={<Hand className="h-5 w-5" />}
        label={isHandRaised ? 'Lower Hand' : 'Raise Hand'}
      />
      <ControlButton
        onClick={toggleChat}
        active={isChatOpen}
        activeIcon={<MessageSquare className="h-5 w-5" />}
        inactiveIcon={<MessageSquare className="h-5 w-5" />}
        label="Chat"
      />
      <ControlButton
        onClick={toggleParticipantList}
        active={isParticipantListOpen}
        activeIcon={<Users className="h-5 w-5" />}
        inactiveIcon={<Users className="h-5 w-5" />}
        label="Participants"
      />
      {/* Leave button — always red */}
      <button
        onClick={onLeave}
        className="flex flex-col items-center gap-1 rounded-xl bg-red-600 px-4 py-2.5 text-white transition hover:bg-red-700"
      >
        <PhoneOff className="h-5 w-5" />
        <span className="text-[10px]">Leave</span>
      </button>
    </div>
  );
}

interface ControlButtonProps {
  onClick: () => void;
  active: boolean;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
  label: string;
  danger?: boolean;
}

function ControlButton({ onClick, active, activeIcon, inactiveIcon, label, danger }: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center  gap-1 rounded-xl px-4 py-2.5 text-white transition',
        active && !danger ? 'gradient-primary' : 'gradient-primary',
        danger ? 'bg-red-500 hover:bg-red-600' : '',
        !active && !danger ? 'bg-zinc-700 hover:bg-zinc-600' : ''
      )}
    >
      {active ? activeIcon : inactiveIcon}
      <span className="text-[10px]">{label}</span>
    </button>
  );
}