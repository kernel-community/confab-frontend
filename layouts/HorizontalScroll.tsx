export const HorizontalScroll = ({children}: {children: any}) => {
  return (
    <div className="overflow-x-scroll">
      <div className="flex flex-nowrap">
        {children}
      </div>
    </div>
  );
};
