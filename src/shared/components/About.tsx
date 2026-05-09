import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail } from "lucide-react";

const About = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="gradient-text-primary flex items-center gap-3 font-bold text-xl">
          About Decent Meet 
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-5">
        <p className="text-base">
          Decent Meet is a modern real-time video conferencing platform built
          for seamless communication, collaboration, and online meetings.
          Inspired by platforms like Google Meet, Zoom, and Microsoft Teams, it
          enables users to connect through secure high-quality video calls,
          real-time messaging, and collaborative meeting experiences.
        </p>
        <p className="text-base">
          The platform is designed with scalability, performance, and
          production-level architecture in mind using modern web technologies
          and WebRTC for peer-to-peer communication.
        </p>
        <div>
          <h2 className="gradient-text-primary text-lg font-semibold">Features</h2>
          <ul className="list-disc list-inside pl-1">
            <li>Secure authentication with Clerk</li>
            <li>One-to-one and group video calls</li>
            <li>Real-time meeting chat</li>
            <li>Instant meeting creation and joining</li>
            <li>Screen sharing support</li>
            <li>Participant management</li>
          </ul>
        </div>
        <div>
          <h2 className="gradient-text-primary text-lg font-semibold">Vision</h2>
          <p className="text-base pl-1">
            Decent Meet aims to provide a fast, scalable, and developer-focused
            meeting platform that demonstrates modern real-time communication
            architecture while delivering a smooth user experience for video
            collaboration.
          </p>
        </div>
      </CardContent>
      <CardFooter className="cursor-pointer">
        <Mail className=""/>
        &nbsp; Contact for more &nbsp;
        <span className="gradient-text-primary">dushyantvelar@gmail.com</span>
      </CardFooter>
    </Card>
  );
};

export default About;
