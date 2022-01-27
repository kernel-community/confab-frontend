export const Card = ({children}: {children: any}) => {
  return (
    <div className="inline-block px-3">
      <div className="w-64 h-64 max-w-xs overflow-scroll rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
        {children}
      </div>
    </div>
  );
};
