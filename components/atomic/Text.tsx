import FieldLabel from './StrongText';

const TextField = ({
  name,
  fieldName,
  handleChange,
  infoText,
  danger,
  dangerReason,
  placeholder,
  className,
}: {
  name: string
  fieldName?: string
  handleChange: any
  infoText?: string
  danger?: boolean
  dangerReason?:string
  placeholder?:string
  className?:string
}) => {
  return (
    <div>
      <FieldLabel
        styles="my-auto"
      >
        {fieldName}
        <div className="text-sm font-primary lowercase font-light">
          {infoText}
        </div>
      </FieldLabel>
      <div className="flex flex-col">
        <input
          type="text"
          name={name}
          className={`
          rounded-lg
          ${` ` + className + ` `}
          ${danger ? `
            ring-red-300 border-red-300
            focus:border-red-500 focus:ring-red-500` : `
            ring-gray-300 border-gray-300
            focus:border-primary focus:ring-primary`}
          `}
          onChange={handleChange}
          required
          placeholder={placeholder}
        />
        <div className="font-primary lowercase text-sm text-red-400">
          {dangerReason}
        </div>
      </div>
    </div>
  );
};

export default TextField;
