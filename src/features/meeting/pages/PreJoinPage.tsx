import { useParams, useNavigate } from "react-router-dom";
import { useMediaStream } from "../hooks/useMediaStream";
import { VideoTile } from "../components/VideoTile";
import { useUser } from "@clerk/react";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PreJoinPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  const {
    localStream,
    isVideoEnabled,
    isAudioEnabled,
    toggleVideo,
    toggleAudio,
  } = useMediaStream();

  const join = () => {
    navigate(`/meeting/${roomId}`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-950 p-6">
      <h1 className="text-2xl font-semibold text-white">Ready to join?</h1>

      <div className="w-full max-w-sm overflow-hidden rounded-2xl">
        <VideoTile
          stream={localStream}
          name={user?.fullName ?? "You"}
          isLocal
          isVideoOn={isVideoEnabled}
          isAudioOn={isAudioEnabled}
          className="aspect-video w-full"
        />
      </div>

      <div className="flex gap-4">
        <Button
          onClick={toggleAudio}
          size="lg"
          className="flex items-center gap-2 px-4 py-2.5 text-white gradient-primary"
        >
          {isAudioEnabled ? (
            <Mic className="size-4" />
          ) : (
            <MicOff className="size-4 text-red-400" />
          )}
          {isAudioEnabled ? "Mute" : "Unmute"}
        </Button>
        <Button
          onClick={toggleVideo}
          size="lg"
          className="flex items-center gap-2 px-4 py-2.5 text-white gradient-primary"
        >
          {isVideoEnabled ? (
            <Video className="size-4" />
          ) : (
            <VideoOff className="size-4 text-red-400" />
          )}
          {isVideoEnabled ? "Stop Video" : "Start Video"}
        </Button>
      </div>

      <div className="text-sm text-zinc-400">
        Room: <span className="font-mono text-white">{roomId}</span>
      </div>

      <Button
        onClick={join}
        size="lg"
        className=" text-lg font-semibold text-white gradient-primary py-5 px-8"
      >
        Join Meeting
      </Button>
    </div>
  );
}
