export const Title = ({
  text,
  className,
  highlight,
}: {
  text?: string;
  className?: string,
  highlight?:string
}) => {
  return (
    <div className={
      `
      font-secondary mx-auto sm:text-4xl text-xl text-primary` + ` ${className}`
    }>
      {text && text}
      {text && highlight && (' ')}
      {highlight && <span className="text-kernel-light">
        {highlight}
      </span>}
    </div>
  );
};
