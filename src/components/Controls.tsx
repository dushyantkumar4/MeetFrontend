interface ControlsProps {
  // An array of active WebRTC peer connections
  peers: RTCPeerConnection[];
}

export default function Controls({ peers }: ControlsProps) {
  const shareScreen = async () => {
    try {
      // getDisplayMedia returns a MediaStream
      const screen: MediaStream = await navigator.mediaDevices.getDisplayMedia();
      const track: MediaStreamTrack = screen.getVideoTracks()[0];

      peers.forEach((pc) => {
        // Find the sender that is currently handling video
        const sender = pc.getSenders().find((s) => s.track?.kind === "video");
        
        if (sender) {
          sender.replaceTrack(track);
        }
      });

      // Handle the "Stop Sharing" button in the browser UI
      track.onended = () => {
        console.log("Screen share stopped");
        // Logic to revert back to camera goes here
      };

    } catch (err) {
      console.error("Error sharing screen:", err);
    }
  };

  return (
    <div className="flex gap-4 p-4 bg-gray-800 rounded-lg shadow-lg">
      <button className="px-4 py-2 bg-blue-600 rounded">Mic</button>
      <button className="px-4 py-2 bg-blue-600 rounded">Cam</button>
      <button 
        onClick={shareScreen} 
        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition"
      >
        Share Screen
      </button>
    </div>
  );
}