import FieldLabel from './StrongText';

const TextField = ({
  name,
  fieldName,
  handleChange,
}: {
  name: string,
  fieldName: string,
  handleChange: any
}) => {
  return (
    <>
      <FieldLabel
        styles="my-auto"
      >
        {fieldName}
      </FieldLabel>
      <input
        type="text"
        name={`${name}`}
        id="proposetitle"
        className="
          rounded-lg
          ring-gray-300 border-gray-300
          focus:border-primary focus:ring-primary
          "
        onChange={handleChange}
      />
    </>
  );
};

export default TextField;
