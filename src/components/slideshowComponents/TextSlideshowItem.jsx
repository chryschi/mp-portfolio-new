const TextSlideshowItem = ({ content }) => {
  return (
    <>
      <div className="slide-img-wrapper">
        <h1>{content.bigTitle}</h1>
        <h2>{content.smallTitle}</h2>
        {content.paragraphs.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
    </>
  );
};

export default TextSlideshowItem;
