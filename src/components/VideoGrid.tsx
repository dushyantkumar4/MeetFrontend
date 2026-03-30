import Video from "./Video.tsx";
import type { VideoProps } from "./Video.tsx";

const VideoGrid = ({ stream }: VideoProps) => {
  return (
    <div className="flex gap-4 flex-wrap">
      {stream && <Video stream={stream} />}
    </div>
  );
};

export default VideoGrid;
