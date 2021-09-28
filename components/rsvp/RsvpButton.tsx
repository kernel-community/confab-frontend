const RsvpButton = ({
  handleClick,
  disabled,
}: {
  handleClick:any
  disabled: boolean
}) => {
  return (
    <button
      className={`
        ${disabled? `
          bg-gray-400 
          text-gray-600 
          cursor-not-allowed` :
          `bg-primary
          text-gray-200
          hover:bg-primary-dark
        `}
        font-nato
        py-2
        rounded-lg
        text-lg
        uppercase
      `}
      onClick={handleClick}
      disabled={disabled}
    >
      {`RSVP →`}
    </button>
  );
};
export default RsvpButton;
