import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ImgCard from "./ImgCard";
import shareImg from "@/assets/meetShare.png";
import messageImg from "@/assets/meetMesssage.png";
import meetingImg from "@/assets/meetGridGlass.png";
import videoCall from "@/assets/meetLogo1.png";

const features = [
  { title: "Meeting", img: meetingImg },
  { title: "Chat", img: messageImg },
  { title: "Share", img: shareImg },
  { title: "VideoCall", img: videoCall },
];

const CarouselCompo = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{
        align: "start",
      }}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      className="w-full max-w-48 sm:max-w-xs md:max-w-2xl"
    >
      <CarouselContent>
        {features.map((item, index) => (
          <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
            <div className="rounded-lg ">
              <ImgCard img={item.img} title={item.title} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselCompo;
