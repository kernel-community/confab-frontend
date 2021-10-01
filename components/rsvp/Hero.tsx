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
        bg-gradient-to-r from-yellow-200 via-green-200 to-green-300
      ">
      <div className="
          absolute bottom-5 left-8
          font-inter
          font-bold text-4xl
          sm:font-extrabold sm:text-6xl
          text-gray-800
          px-3
        ">
        {title}
        <div
          className="
            font-inter
            uppercase
            font-light
            sm:font-light sm:text-lg
            text-sm
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
