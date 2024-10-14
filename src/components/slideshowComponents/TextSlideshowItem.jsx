// import { useEffect } from "react";
// import { useRef } from "react";
// import { useState } from "react";
import PropTypes from "prop-types";

const TextSlideshowItem = ({ content }) => {
  //KEEP FOR CUSTOM SCROLLBAR

  // const [translateY, setTranslateY] = useState(0);
  // const [mousePosY, setMousePosY] = useState();
  // const [startPosY, setStartPosY] = useState();
  // const [isDragging, setDraggingState] = useState();
  // const [thumbTop, setThumbTop] = useState(0);

  // const descriptionContainerRef = useRef(null);
  // const scrollthumbRef = useRef(null);

  // useEffect(() => {
  //   const currentContainerRef = descriptionContainerRef.current;
  //   const handleMouseMove = (event) => {
  //     setMousePosY(event.clientY);
  // dragging();
  // };

  // const handleScroll = () => {
  //   const { scrollTop, clientHeight, scrollHeight } = currentContainerRef;
  //   const newThumbTop =
  //     ((clientHeight - 15) * scrollTop) / (scrollHeight - clientHeight);
  //   setThumbTop(Math.round(newThumbTop));
  // };

  // window.addEventListener("mousemove", handleMouseMove);
  // window.addEventListener("mousemove", );
  // currentContainerRef.addEventListener("scroll", handleScroll);

  // return () => {
  // window.removeEventListener("mousemove", handleMouseMove);
  // window.removeEventListener("mousemove", dragging);
  //     currentContainerRef.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // const dragStart = () => {
  //   setDraggingState(true);
  //   setStartPosY(mousePosY);
  // };

  // const dragging = () => {
  //   if (!isDragging) return;
  //   const mouseMoveDelta = mousePosY - startPosY;
  //   if (translateY > 0 || translateY < 100) {
  //   }
  //   setTranslateY(mouseMoveDelta);
  //   console.log(mouseMoveDelta);
  // };

  return (
    <div className="slide-text-wrapper">
      <article
        className="description-container"
        // ref={descriptionContainerRef}
      >
        <h1>{content.bigTitle}</h1>
        <h2>{content.smallTitle}</h2>
        {content.paragraphs.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </article>
      {/* <div className="scrollbar">
        <div
          className="scrollbar-thumb"
          onMouseDown={dragStart}
          ref={scrollthumbRef}
          style={{ top: `${thumbTop}px` }}
        ></div>
        <div className="scrollbar-track"></div>
      </div> */}
    </div>
  );
};

export default TextSlideshowItem;

TextSlideshowItem.propTypes = {
  content: PropTypes.object,
};
