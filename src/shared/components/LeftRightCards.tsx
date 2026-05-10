import LeftCard from "./LeftCard";
import RightCard from "./RightCard";
import shareImg from "@/assets/card2.png";
import messageImg from "@/assets/card3.png";
import meetingImg from "@/assets/card4.png";
import videoCall from "@/assets/card1.png";

const LeftRightCards = () => {
  return (
    <div className="flex flex-col gap-10 w-full">
      <LeftCard title="Meeting" img={meetingImg} description="Schedule a meeting without lag with no of users" />
      <RightCard title="Chat" img={messageImg} description="Sand unlimited messages" />
      <LeftCard title="Share files" img={shareImg} description="Share images, videos , links , pdf etc." />
      <RightCard title="Video call" img={videoCall} description="Do One on one video call " />
    </div>
  );
};

export default LeftRightCards;
