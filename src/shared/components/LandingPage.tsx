import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center p-6 order-2 md:order-1">
        <div className="flex flex-col items-start gap-5">
          <h1 className="text-4xl font-bold">
            <span className="gradient-text-primary">Connect</span> with your loved
            Once{" "}
          </h1>
          <p className="text-2xl font-semibold">
            Cover any distance with{" "}
            <span className="gradient-text-primary">DecentMeet</span> Video Call
          </p>
          <Button
            className=" gradient-primary"
          >
            <Video />
            New meeting
          </Button>
          <div className="text-gray-400">
            Video calls, chats, and share files with anyone, anytime — for free.
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 order-1 md:order-2">
        <img src="/amico.png" alt="img" className="size-90 mt-5" />
      </div>
    </div>
  );
};

export default LandingPage;
