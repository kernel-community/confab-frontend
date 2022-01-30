const Button = ({
  handleClick,
  disabled,
  buttonText,
  displayLoading,
  className,
}: {
  handleClick: any
  disabled?: boolean
  buttonText: string
  displayLoading?: boolean
  className?: string
}) => {
  return (
    <button
      className={`
        ${disabled? `
          bg-gray-400
          text-gray-600
          cursor-not-allowed` :
          `
          bg-kernel
          text-gray-200
          hover:shadow-dark
          `}
        font-secondary
        py-2
        px-16
        rounded-lg
        text-lg
        uppercase
        hover:shadow-xl
        transition-shadow
        duration-300
        ease-in-out
        ${` ` + className}
      `}
      onClick={handleClick}
      disabled={disabled}
    >
      <div className="flex flex-row items-center justify-center gap-4">
        {displayLoading ?(<span className="bg-highlight rounded-full h-2 w-2 animate-ping">
        </span>):<></>}
        <div>
          {buttonText}
        </div>
      </div>

    </button>
  );
};
export default Button;
