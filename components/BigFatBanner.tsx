const BigFatBanner = ({text, helperText}: {text: string, helperText?:string}) => {
  return (
    <div className="
        w-full h-96 relative
        rounded-lg
        bg-gradient-to-r from-gray-700 via-gray-900 to-black
      ">
      <div className="
          absolute bottom-9 left-14
          font-inter font-bold text-6xl
          text-gray-200
        ">
        {text}
        {helperText ? (<div
          className="
            text-xl font-inter font-light
            text-gray-300
          "
        >
          {helperText}
        </div>):<></>}
      </div>

    </div>
  );
};

export default BigFatBanner;
