import FieldLabel from './StrongText';

const TextAreaField = ({
  name,
  fieldName,
  handleChange,
  infoText,
}: {
  name: string
  fieldName: string
  handleChange: any
  infoText?: string
}) => {
  return (
    <span className='border-4'>
      <FieldLabel
        styles="my-auto"
      >
        {fieldName}
        <div className="font-light text-xs">
          {infoText}
        </div>
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
    </span>
  );
};

export default TextAreaField;
