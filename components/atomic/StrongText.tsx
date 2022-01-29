const FieldLabel = ({children, styles}: {children: any, styles?: string}) => {
  return (
    <div className={`
      font-secondary
      text-gray-800
      uppercase
      text-base
      ${styles}
    `}>
      {children}
    </div>
  );
};

export default FieldLabel;
