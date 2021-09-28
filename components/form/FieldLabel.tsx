const FieldLabel = ({children, styles}: {children: any, styles?: string}) => {
  return (
    <div className={`
      font-inter 
      text-primary
      font-semibold
      ${styles}
    `}>
      {children}
    </div>
  );
};

export default FieldLabel;
