
import type { CardProp } from "./LeftCard";

const RightCard = ({ img, title, description }: CardProp) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center ">
        <img src={img} alt="card image" className="h-60 w-80 rounded-lg"/>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h2 className="font-bold text-lg gradient-text-primary">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default RightCard;
