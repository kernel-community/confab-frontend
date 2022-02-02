const BigFatBanner = ({text, helperText}: {text: string, helperText?:string}) => {
  return (
    <div className="
        rounded-lg
        bg-primary
        m-12
      ">
      <div className="
          font-secondary font-bold text-6xl p-32
          text-gray-200
        ">
        {text}
        {helperText ? (<div
          className="
            text-xl font-secondary font-light
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
