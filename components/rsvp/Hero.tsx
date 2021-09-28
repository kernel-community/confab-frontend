const Hero = ({
  title, type,
}: {
  title: string | undefined,
  type: string | undefined
}) => {
  return (
    <div className="
        w-full h-52 relative
        rounded-t-lg
        bg-gradient-to-bl from-yellow-200 via-green-200 to-green-300
      ">
      <div className="
          absolute bottom-5 left-8
          font-robotoSlab font-extrabold text-6xl
          text-gray-800
        ">
        {title}
        <div
          className="
            text-2xl font-alegreya font-medium
            text-gray-600
          "
        >
          {type}
        </div>
      </div>
    </div>
  );
};

export default Hero;
