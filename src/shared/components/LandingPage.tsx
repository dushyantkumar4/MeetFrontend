import { Button } from "@/shared/components/ui/button";

const LandingPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center p-6 order-2 md:order-1">
        <div className="flex flex-col items-start gap-5">
          <h1 className="text-4xl font-bold">
          <span className="text-purple-500">Connect</span> with your loved
          Once{" "}
        </h1>
        <p className="text-2xl font-semibold">
          Cover a distance by{" "}
          <span className="text-purple-500">DecentMeet</span> Video Call
        </p>
        <Button variant="secondary">Get Started</Button>
        </div>
        
      </div>
      <div className="flex items-center justify-center p-6 order-1 md:order-2">
        <img src="/amico.png" alt="img" className="size-90 mt-5" />
      </div>
    </div>
  );
};

export default LandingPage;
