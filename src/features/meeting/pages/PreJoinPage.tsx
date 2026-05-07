import { useParams, useNavigate } from 'react-router-dom';
import { useMediaStream } from '../hooks/useMediaStream';
import { VideoTile } from '../components/VideoTile';
import { useUser } from '@clerk/react';
import { Mic, MicOff, Video, VideoOff } from 'lucide-react';

export default function PreJoinPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  const { localStream, isVideoEnabled, isAudioEnabled, toggleVideo, toggleAudio } = useMediaStream();

  const join = () => {
    navigate(`/meeting/${roomId}`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-zinc-950 p-6">
      <h1 className="text-2xl font-semibold text-white">Ready to join?</h1>

      <div className="w-full max-w-md overflow-hidden rounded-2xl">
        <VideoTile
          stream={localStream}
          name={user?.fullName ?? 'You'}
          isLocal
          isVideoOn={isVideoEnabled}
          isAudioOn={isAudioEnabled}
          className="aspect-video w-full"
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={toggleAudio}
          className="flex items-center gap-2 rounded-xl bg-zinc-800 px-4 py-2.5 text-white hover:bg-zinc-700"
        >
          {isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4 text-red-400" />}
          {isAudioEnabled ? 'Mute' : 'Unmute'}
        </button>
        <button
          onClick={toggleVideo}
          className="flex items-center gap-2 rounded-xl bg-zinc-800 px-4 py-2.5 text-white hover:bg-zinc-700"
        >
          {isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4 text-red-400" />}
          {isVideoEnabled ? 'Stop Video' : 'Start Video'}
        </button>
      </div>

      <div className="text-sm text-zinc-400">
        Room: <span className="font-mono text-white">{roomId}</span>
      </div>

      <button
        onClick={join}
        className="rounded-xl bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
      >
        Join Meeting
      </button>
    </div>
  );
}