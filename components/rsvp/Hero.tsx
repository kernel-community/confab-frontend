const Hero = ({
  title, type, proposer,
}: {
  title?: string,
  type?: string,
  proposer?:string
}) => {
  return (
    <div className="flex flex-col justify-items-start">
      <div
        className="
            font-secondary
            uppercase
            text-lg
            text-kernel-purple
          "
      >
        {type}
      </div>
      <div className="
          font-heading
          font-bold
          text-6xl
          text-primary
          py-5
        ">
        {title}
      </div>
      {proposer &&
      <div className="font-secondary text-xl">
        by&nbsp;{proposer}
      </div>}
    </div>
  );
};

export default Hero;
