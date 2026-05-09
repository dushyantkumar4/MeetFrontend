import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ImgCardProp {
  img: string;
  title: string;
}

const ImgCard = ({ img, title }: ImgCardProp) => {
  return (
    <div className="">
      <AspectRatio ratio={1 / 1} className="rounded-lg bg-muted">
        <img
          src={img}
          alt="Photo"
          className="w-full h-full rounded-lg object-cover shadow-lg"
        />
      </AspectRatio>
      <p className="font-bold gradient-text-primary pl-1 text-shadow-lg">{title}</p>
    </div>
  );
};

export default ImgCard;
