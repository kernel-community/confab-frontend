const RsvpButton = ({
  handleClick,
}: {
  handleClick:any
}) => {
  return (
    <button
      className="
        bg-primary rounded-lg
        py-2
        mt-4
        text-gray-200
        font-nato
        text-lg
        uppercase
        hover:bg-primary-dark
      "
      onClick={handleClick}
    >
      {`RSVP →`}
    </button>
  );
};
export default RsvpButton;
