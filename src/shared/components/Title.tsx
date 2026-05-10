import img from "@/assets/border2.png";

type TitleProp ={
  text:string
}

const Title = ({text}: TitleProp) => {
  return (
    <div className="relative">
      <img src={img} alt="" className="rotate-180 size-10 absolute -left-4 top-2" />
      <h1 className="gradient-text-primary font-bold text-4xl">{text}</h1>
      <img src={img} alt="" className="size-10 absolute -right-4 -top-2" />
    </div>
  );
};

export default Title;
