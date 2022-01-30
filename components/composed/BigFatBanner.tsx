const BigFatBanner = ({text, helperText}: {text: string, helperText?:string}) => {
  return (
    <div className="
        rounded-lg
        bg-gradient-to-r
      ">
      <div className="
          font-inter font-bold text-6xl p-32
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
