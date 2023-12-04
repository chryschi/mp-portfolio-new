const SlideshowItem = ({ imgUrl, imgTitle }) => {
  return (
    <>
      <div className="slide-img-wrapper">
        <figure>
          <figcaption style={{ visibility: "hidden" }}>{imgTitle}</figcaption>
          <img src={imgUrl} alt={imgTitle} />
          <figcaption className="img-caption">{imgTitle}</figcaption>
        </figure>
      </div>
    </>
  );
};

export default SlideshowItem;
