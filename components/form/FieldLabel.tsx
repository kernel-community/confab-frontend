const FieldLabel = ({children, styles}: {children: any, styles?: string}) => {
  return (
    <div className={`
      font-inter ${styles}
      text-primary
      font-semibold
    `}>
      {children}
    </div>
  );
};

export default FieldLabel;
