import Video from "@/features/meeting/components/Video";
import type { VideoProps } from "@/features/meeting/components/Video";

const VideoGrid = ({ stream }: VideoProps) => {
  return (
    <div className="flex gap-4 flex-wrap">
      {stream && <Video stream={stream} />}
    </div>
  );
};

export default VideoGrid;
