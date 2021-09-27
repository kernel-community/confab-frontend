import FieldLabel from '../FieldLabel';

const Title = () => {
  return (
    <>
      <FieldLabel
        styles="my-auto"
      >
          Title
      </FieldLabel>
      <input
        type="text"
        name="title"
        id="proposetitle"
        className="
          rounded-lg
          ring-gray-300 border-gray-300
          focus:border-primary focus:ring-primary
          "
      />
    </>
  );
};

export default Title;
