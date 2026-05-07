import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { MicOff, VideoOff } from 'lucide-react';

interface VideoTileProps {
  stream: MediaStream | null;
  name: string;
  isLocal?: boolean;
  isVideoOn: boolean;
  isAudioOn: boolean;
  isActiveSpeaker?: boolean;
  className?: string;
}

export function VideoTile({
  stream,
  name,
  isLocal = false,
  isVideoOn,
  isAudioOn,
  isActiveSpeaker = false,
  className,
}: VideoTileProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden rounded-xl bg-zinc-900',
        isActiveSpeaker && 'ring-2 ring-blue-500',
        className
      )}
    >
      {isVideoOn && stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isLocal}
          className={cn('h-full w-full object-cover', isLocal && 'scale-x-[-1]')}
        />
      ) : (
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-700 text-2xl font-semibold text-white">
            {name.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm text-zinc-400">{isLocal ? 'You' : name}</span>
        </div>
      )}

      {/* Name label */}
      <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/50 px-2 py-0.5 text-xs text-white">
        {!isAudioOn && <MicOff className="h-3 w-3 text-red-400" />}
        <span>{isLocal ? `${name} (You)` : name}</span>
      </div>

      {/* Video off indicator */}
      {!isVideoOn && (
        <div className="absolute right-2 top-2">
          <VideoOff className="h-4 w-4 text-zinc-400" />
        </div>
      )}
    </div>
  );
}