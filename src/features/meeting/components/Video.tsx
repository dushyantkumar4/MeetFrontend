export interface VideoProps {
  stream: MediaStream | null;
}
const Video = ({ stream }: VideoProps) => {
  return (
    <div>
      <video
        autoPlay
        playsInline
        ref={(v) => {
          if (v && stream) {
            v.srcObject = stream;
          }
        }}
        className="w-64 h-48 bg-black"
      />
    </div>
  );
};

export default Video;
