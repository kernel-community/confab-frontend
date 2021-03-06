const Hero = ({
  title, type,
}: {
  title: string | undefined,
  type: 'Junto' | 'Build Guild'
}) => {
  return (
    <div className={`
        w-full h-64 relative
        rounded-t-lg
        ${type == 'Junto' ?
            'bg-gradient-to-bl from-indigo-200 via-red-200 to-yellow-100' :
            'bg-gradient-to-bl from-yellow-200 via-green-200 to-green-300'}
      `}>
      <div className="
          absolute bottom-5 left-5
          font-inter
          font-bold text-4xl
          sm:font-bold sm:text-4xl
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
