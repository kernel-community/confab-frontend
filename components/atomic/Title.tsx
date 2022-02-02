export const Title = ({text, className}: {text: string; className?: string}) => {
  return (
    <div className={
      `font-inter mx-auto font-bold sm:text-3xl text-xl text-primary` + ` ${className}`
    }>
      {text}
    </div>
  );
};
