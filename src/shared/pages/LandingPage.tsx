import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import LeftRightCards from "../components/LeftRightCards";
import Title from "../components/Title";

const LandingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* left section  */}
        <div className="flex items-center justify-center p-6 order-2 md:order-1">
          <div className="flex flex-col items-start gap-5">
            <h1 className="text-4xl font-bold">
              <span className="gradient-text-primary">Connect</span> with your
              loved Once{" "}
            </h1>
            <p className="text-2xl font-semibold">
              Cover any distance with{" "}
              <span className="gradient-text-primary">DecentMeet</span> Video
              Call
            </p>
            <Button className=" gradient-primary">
              <Video />
              New meeting
            </Button>
            <div className="text-gray-400">
              Video calls, chats, and share files with anyone, anytime — for
              free.
            </div>
          </div>
        </div>
        {/* right section  */}
        <div className="flex items-center justify-center p-6 order-1 md:order-2">
          <img src="/amico.png" alt="img" className="size-90 mt-5" />
        </div>
      </div>

      <Title text="FEATURES" />
      <LeftRightCards />
    </div>
  );
};

export default LandingPage;
