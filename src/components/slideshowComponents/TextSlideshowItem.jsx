const TextSlideshowItem = ({ content }) => {
  return (
    <div className="slide-text-wrapper">
      <div className="project-description">
        <h1>{content.bigTitle}</h1>
        <h2>{content.smallTitle}</h2>
        {content.paragraphs.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
      <div className="scrollbar">
        <div className="scrollbar-thumb"></div>
        <div className="scrollbar-track"></div>
      </div>
    </div>
  );
};

export default TextSlideshowItem;
