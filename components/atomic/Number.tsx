import FieldLabel from './StrongText';

const Number = ({
  fieldName,
  handleChange,
}: {
  fieldName: string,
  handleChange: any
}) => {
  return (
    <>
      <FieldLabel>
      Set Limit
      </FieldLabel>
      <input
        type="number"
        name="limit"
        id="proposelimit"
        className="
          rounded-lg
          ring-gray-300 border-gray-300
          focus:border-primary focus:ring-primary
        "
      />
    </>
  );
};

export default Number;
