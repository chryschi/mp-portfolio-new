import { useEffect, useLayoutEffect, useRef, useState } from "react";

const CarouselItem = ({ imgUrl, imgTitle, addRef }) => {
  const itemRef = useRef(null);

  useEffect(() => {
    addRef(itemRef);
  }, []);

  return (
    <>
      <img
        ref={itemRef}
        className="carousel-card"
        src={imgUrl}
        alt={imgTitle}
        draggable="false"
      />
    </>
  );
};

export default CarouselItem;
