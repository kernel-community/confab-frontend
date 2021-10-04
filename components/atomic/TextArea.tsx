import FieldLabel from './StrongText';

const TextAreaField = ({
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
      <textarea
        name={`${name}`}
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

export default TextAreaField;
