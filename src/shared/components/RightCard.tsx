import type { CardProp } from "./LeftCard";
import Tilt from "react-parallax-tilt";

const RightCard = ({ img, title, description }: CardProp) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex items-center justify-center overflow-hidden rounded-lg">
        <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25} perspective={500}>
          <img
            src={img}
            alt="card image"
            className="h-60 w-80 rounded-lg object-fit"
          />
        </Tilt>
      </div>
      <div className="flex flex-col px-10 md:px-30 justify-center">
        <h2 className="font-bold text-lg gradient-text-primary">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default RightCard;
