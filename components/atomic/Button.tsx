const Button = ({
  handleClick,
  disabled,
  buttonText,
  displayLoading,
}: {
  handleClick: any
  disabled?: boolean
  buttonText: string
  displayLoading?: boolean
}) => {
  return (
    <div>
      <button
        className={`
        ${disabled? `
          bg-gray-400
          text-gray-600
          cursor-not-allowed` :
          `
          bg-kernel-purple
          text-gray-200
          hover:shadow-kernel
          `}
        font-secondary
        py-2
        px-16
        rounded-lg
        text-lg
        uppercase
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
    </div>
  );
};
export default Button;
