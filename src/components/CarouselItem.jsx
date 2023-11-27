import { useLayoutEffect, useRef, useState } from "react";

const CarouselItem = ({ imgUrl, imgTitle }) => {
  return (
    <>
      <img
        className="carousel-card"
        src={imgUrl}
        alt={imgTitle}
        draggable="false"
      />
    </>
  );
};

export default CarouselItem;
