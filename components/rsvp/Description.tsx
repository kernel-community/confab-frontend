const Description = ({
  description,
}: {
  description: string | undefined
}) => {
  const createMarkup = () => {
    return {
      __html: description ? description : '',
    };
  };
  return (
    <div
      className="
            col-span-2 py-12 px-6
          "
    >
      <article className="
        prose prose-lg max-w-none font-noto
        "
      >
        <div
          dangerouslySetInnerHTML={createMarkup()}
        >

        </div>
      </article>
    </div>
  );
};

export default Description;
