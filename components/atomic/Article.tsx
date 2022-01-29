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
        prose prose-xl font-primary
        "
    >
      <div
        dangerouslySetInnerHTML={createMarkup()}
      >

      </div>
    </article>
  );
};
