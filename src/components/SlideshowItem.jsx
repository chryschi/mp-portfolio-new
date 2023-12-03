const SlideshowItem = ({ imgUrl, imgTitle }) => {
  return (
    <>
      <div className="slide-img-wrapper">
        <img src={imgUrl} alt={imgTitle} />
      </div>
    </>
  );
};

export default SlideshowItem;
