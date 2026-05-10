import Tilt from "react-parallax-tilt";
export interface CardProp {
  img: string;
  title: string;
  description: string;
}

const LeftCard = ({ img, title, description }: CardProp) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col items-center justify-center order-2 md:order-1">
        <h2 className="font-bold text-lg gradient-text-primary">{title}</h2>
        <p>{description}</p>
      </div>
      <div className="flex items-center justify-center order-1 md:order-2">
        <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25} perspective={500}>
          <img
            src={img}
            alt="card image"
            className="h-60 w-80 rounded-lg object-fit"
          />
        </Tilt>
      </div>
    </div>
  );
};

export default LeftCard;
