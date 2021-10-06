import FieldLabel from './StrongText';

const TextField = ({
  name,
  fieldName,
  handleChange,
  infoText,
  danger,
  dangerReason,
}: {
  name: string
  fieldName: string
  handleChange: any
  infoText?: string
  danger?: boolean
  dangerReason?:string
}) => {
  return (
    <>
      <FieldLabel
        styles="my-auto"
      >
        {fieldName}
        <div className="font-light text-xs">
          {infoText}
        </div>
      </FieldLabel>
      <div className="flex flex-col">
        <input
          type="text"
          name={name}
          className={`
          rounded-lg
          ${danger ? `
            ring-red-300 border-red-300 
            focus:border-red-500 focus:ring-red-500` : `
            ring-gray-300 border-gray-300 
            focus:border-primary focus:ring-primary`}
          `}
          onChange={handleChange}
          required
        />
        <div className="font-medium text-xs text-red-400">
          {dangerReason}
        </div>
      </div>
    </>
  );
};

export default TextField;
