import FieldLabel from '../FieldLabel';

const Location = () => {
  return (
    <>
      <FieldLabel>
        Location
      </FieldLabel>
      <input
        type="text"
        name="location"
        id="proposelocation"
        className="
          rounded-lg
          ring-gray-300 border-gray-300
          focus:border-primary focus:ring-primary
          "
      />
    </>
  );
};

export default Location;
