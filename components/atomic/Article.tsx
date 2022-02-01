export const Article = ({
  html,
}: {
  html: string | undefined
}) => {
  const createMarkup = () => {
    return {
      __html: html ? html : '',
    };
  };
  return (
    <article className="
          prose
          md:prose-xl
          font-primary
          sm:prose-lg
        "
    >
      <div
        dangerouslySetInnerHTML={createMarkup()}
      >

      </div>
    </article>
  );
};
