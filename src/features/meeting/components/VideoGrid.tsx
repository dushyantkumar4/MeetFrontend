import { cn } from '@/lib/utils';
import { VideoTile } from './VideoTile';
import type { Participant } from '../types/meeting.types';

interface VideoGridProps {
  localStream: MediaStream | null;
  localName: string;
  participants: Participant[];
  activeSpeakerId: string | null;
}

export function VideoGrid({ localStream, localName, participants, activeSpeakerId }: VideoGridProps) {
  const total = participants.length + 1; // +1 for local

  const gridClass = cn(
    'grid h-full w-full gap-2 p-2',
    total === 1 && 'grid-cols-1',
    total === 2 && 'grid-cols-2',
    total <= 4 && total > 2 && 'grid-cols-2',
    total <= 9 && total > 4 && 'grid-cols-3',
    total > 9 && 'grid-cols-4'
  );

  return (
    <div className={gridClass}>
      <VideoTile
        stream={localStream}
        name={localName}
        isLocal
        isVideoOn={true}
        isAudioOn={true}
        isActiveSpeaker={false}
      />
      {participants.map((p) => (
        <VideoTile
          key={p.id}
          stream={p.stream ?? null}
          name={p.name}
          isVideoOn={p.isVideoOn}
          isAudioOn={p.isAudioOn}
          isActiveSpeaker={activeSpeakerId === p.id}
        />
      ))}
    </div>
  );
}