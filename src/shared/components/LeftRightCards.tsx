import LeftCard from "./LeftCard";
import RightCard from "./RightCard";
import shareImg from "@/assets/card2.png";
import messageImg from "@/assets/card3.png";
import meetingImg from "@/assets/card4.png";
import videoCall from "@/assets/card1.png";
import { Separator } from "@/components/ui/separator";

const LeftRightCards = () => {
  return (
    <div className="flex flex-col gap-10 w-full bg-purple-50">
      <LeftCard
        title="Meeting"
        img={meetingImg}
        description="Create smooth and secure meetings with crystal-clear audio, video, and real-time collaboration for teams of any size."
      />
      <Separator className=""/>
      <RightCard
        title="Chat"
        img={messageImg}
        description="Stay connected with instant messaging, real-time conversations, and seamless communication without limits."
      />
      <Separator />
      <LeftCard
        title="Share files"
        img={shareImg}
        description="Easily share images, videos, PDFs, links, and important documents securely with your team in seconds."
      />
      <Separator />
      <RightCard
        title="Video call"
        img={videoCall}
        description="Experience high-quality one-on-one video calls with low latency and smooth communication from anywhere."
      />
    </div>
  );
};

export default LeftRightCards;
