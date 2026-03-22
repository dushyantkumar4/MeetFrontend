import Button from "@mui/material/Button";


const LandingPage = () => {
  return (
    <div className="flex justify-around items-center">
      <div className="flex flex-col gap-10 items-start">
        <h1 className="text-4xl font-bold">
          <span className="text-purple-500">Connect</span> with your loved
          Once{" "}
        </h1>
        <p className="text-2xl font-semibold">
          Cover a distance by{" "}
          <span className="text-purple-500">DecentMeet</span> Video Call
        </p>
        <Button variant="contained">Get Started</Button>
        
      </div>
      <div>
        <img src="/amico.png" alt="img" className="size-90 mt-5" />
      </div>
    </div>
  );
};

export default LandingPage;
