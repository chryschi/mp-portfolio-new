import { useState, useRef, useCallback, useEffect } from "react";
import CarouselItem from "../CarouselItem";
import "./Carousel.css";
import PropTypes from "prop-types";

const Carousel = ({ images }) => {
  const PREFERED_FIRST_CHILD_POSITION = getComputedStyle(
    document.documentElement
  )
    .getPropertyValue("--padding-primary")
    .slice(0, -2);

  const [mousePosX, setMousePosX] = useState();
  // const [isDragging, setDraggingState] = useState(false);
  // const [startPosX, setStartPosX] = useState();
  // const [startTranslatePosition, setStartTranslatePosition] = useState();
  const [disableButton, setDisableButton] = useState(false);
  const [translateX, setTranslateX] = useState(PREFERED_FIRST_CHILD_POSITION);
  const [childrenTranslateValues, setChildrenTranslateValues] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef(null);
  const carouselTrackRef = useRef(null);

  // const UPPER_BOUNDARY_FACTOR_FOR_INFINITE_EFFECT = -0.2;
  // const LOWER_BOUNDARY_FACTOR_FOR_INFINITE_EFFECT = -0.7;

  const NUMBER_OF_CAROUSEL_CARDS = 2 * images.length;
  let childrenLeftPositionsCopy = [];

  // let timer;

  // useEffect(() => {
  //   const currentCarouselRef = carouselTrackRef.current;
  //   const transitionEnd = () => {
  //     setDisableButton(false);
  //     const carouselRealWidth = carouselTrackRef.current.scrollWidth;
  //     const currentTranslation = translateX;

  //     childLeftPositions = [];
  //     childLeftPositions = childrenWidths.map((currentChild) => {
  //       return getChildLeftPosition(currentChild);
  //     });
  //     const nextChildIndex = childLeftPositions.findIndex(
  //       (childLeftPosition) => {
  //         return Math.floor(childLeftPosition) > PREFERED_FIRST_CHILD_POSITION;
  //       }
  //     );
  //     const nextChildLeft = childLeftPositions[nextChildIndex];
  //     const nextPos =
  //       currentTranslation - (nextChildLeft - PREFERED_FIRST_CHILD_POSITION);
  //     const previousChildLeft = childLeftPositions[nextChildIndex - 1];
  //     if (previousChildLeft) {
  //       const previousPos =
  //         currentTranslation -
  //         (previousChildLeft - PREFERED_FIRST_CHILD_POSITION);
  //       nextPos <= previousPos
  //         ? infiniteSlide(nextPos, carouselRealWidth)
  //         : infiniteSlide(previousPos, carouselRealWidth);
  //     }
  //   };

  //   currentCarouselRef.addEventListener("transitionend", transitionEnd);

  //   return () => {
  //     currentCarouselRef.removeEventListener("transitionend", transitionEnd);
  //   };
  // }, []);

  const addChildLeftPosition = useCallback((width) => {
    if (childrenLeftPositionsCopy.length < NUMBER_OF_CAROUSEL_CARDS) {
      childrenLeftPositionsCopy.push(width);

      if (childrenLeftPositionsCopy.length === NUMBER_OF_CAROUSEL_CARDS) {
        setChildrenTranslateValues(
          childrenLeftPositionsCopy.map(
            (leftPosition) => -leftPosition + 2 * PREFERED_FIRST_CHILD_POSITION
          )
        );
        childrenLeftPositionsCopy = [];
      }
    }
  }, []);

  //handle carousel mouse dragging
  // useEffect(() => {
  //   const currentContainerRef = containerRef.current;
  //   const handleMouseMove = (event) => {
  //     setMousePosX(event.clientX);
  //   };

  //   window.addEventListener("mouseup", dragStop);

  //   if (currentContainerRef) {
  //     currentContainerRef.addEventListener("mousemove", handleMouseMove);
  //   }

  //   return () => {
  //     window.removeEventListener("mouseup", dragStop);
  //     currentContainerRef.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, []);

  //handle scrolling
  // useEffect(() => {
  //   const currentCarouselRef = carouselTrackRef.current;
  //   const handleWheel = (e) => {
  //     e.preventDefault();

  //     const carouselRealWidth = currentCarouselRef.scrollWidth;
  //     const currentCarouselTranslation = translateX;
  //     const newTranslateValue = currentCarouselTranslation - e.deltaY * 0.6;

  //     setTranslateX(newTranslateValue);
  //     infiniteSlide(newTranslateValue, carouselRealWidth);
  //   };

  //   currentCarouselRef.addEventListener("wheel", handleWheel, {
  //     passive: false,
  //   });

  //   return () => {
  //     currentCarouselRef.removeEventListener("wheel", handleWheel, {
  //       passive: false,
  //     });
  //   };
  // }, []);

  // const dragStart = () => {
  //   const currentCarouselRef = carouselTrackRef.current;
  //   timer = setTimeout(() => {
  //     currentCarouselRef.style.pointerEvents = "none";
  //   }, 150);
  //   carouselTrackRef.current.style.transitionDuration = "0ms";
  //   const currentCarouselTranslation = translateX;
  //   setDraggingState(true);
  //   setStartTranslatePosition(Number(currentCarouselTranslation));
  //   setStartPosX(mousePosX);
  // };

  // const dragging = () => {
  //   if (!isDragging) return;

  //   const carouselRealWidth = carouselTrackRef.current.scrollWidth;
  //   const mouseMoveDelta = mousePosX - startPosX;
  //   const newTranslateValue = Math.round(
  //     startTranslatePosition + mouseMoveDelta
  //   );
  //   setTranslateX(newTranslateValue);
  //   infiniteSlide(translateX, carouselRealWidth);
  // };

  // const infiniteSlide = (desiredCarouselTranslation, carouselRealWidth) => {
  //   if (
  //     desiredCarouselTranslation >
  //     UPPER_BOUNDARY_FACTOR_FOR_INFINITE_EFFECT * carouselRealWidth
  //   ) {
  //     let current = translateX;
  //     current -= 0.5 * carouselRealWidth;
  //     current = Math.round(current);
  //     carouselTrackRef.current.style.transitionDuration = "0ms";
  //     setTranslateX(current);
  //   } else if (
  //     desiredCarouselTranslation <
  //     LOWER_BOUNDARY_FACTOR_FOR_INFINITE_EFFECT * carouselRealWidth
  //   ) {
  //     let current = translateX;
  //     current += 0.5 * carouselRealWidth;
  //     current = Math.round(current);
  //     carouselTrackRef.current.style.transitionDuration = "0ms";

  //     setTranslateX(current);
  //   }
  // };

  // const dragStop = () => {
  //   setDraggingState(false);
  //   clearTimeout(timer);
  //   const currentCarouselRef = carouselTrackRef.current;
  //   currentCarouselRef.style.pointerEvents = "auto";
  // };

  const scrollToChild = (mode) => {
    setDisableButton(true);
    carouselTrackRef.current.style.transitionDuration = "400ms";

    if (mode === "next") {
      const nextIndex = activeIndex + 1;
      console.log("TRANSLATE FÜR NÄCHSTES IMAGE");
      console.log(childrenTranslateValues);
      console.log(childrenTranslateValues[nextIndex]);
      setTranslateX(childrenTranslateValues[nextIndex]);
      setActiveIndex(nextIndex);
    }

    // if (mode === "previous") {
    //   let previousChildLeft = childLeftPositions[nextChildIndex - 2];
    //   if (
    //     Math.round(childLeftPositions[nextChildIndex - 1]) <
    //     PREFERED_FIRST_CHILD_POSITION
    //   ) {
    //     previousChildLeft = childLeftPositions[nextChildIndex - 1];
    //   }
    //   let newPos =
    //     currentTranslation -
    //     (previousChildLeft - PREFERED_FIRST_CHILD_POSITION);
    //   setTranslateX(newPos);
    // }
  };

  // const getChildLeftPosition = (currentChild) => {
  //   const childDetails = currentChild.getBoundingClientRect();
  //   const leftPosition = childDetails.left;
  //   return leftPosition;
  // };

  return (
    <>
      <div
        className="carousel-container"
        // onMouseDown={dragStart}
        // onMouseMove={dragging}
        ref={containerRef}
      >
        <div
          ref={carouselTrackRef}
          className={
            "carousel "
            // + (isDragging ? "dragging" : "")
          }
          style={{ transform: `translate3d(${translateX}px, 0px, 0px)` }}
          onTransitionEnd={() => {
            setDisableButton(false);
          }}
        >
          {images.map((card, idx) => (
            <CarouselItem
              key={idx}
              id={idx}
              imgUrl={card.imgUrl}
              imgTitle={card.imgTitle}
              projectUrlName={card.projectUrlName}
              content={card.previewContent}
              addChildLeftPosition={addChildLeftPosition}
            />
          ))}
          {images.map((card, idx) => (
            <CarouselItem
              key={idx + images.length}
              id={idx + images.length}
              imgUrl={card.imgUrl}
              imgTitle={card.imgTitle}
              projectUrlName={card.projectUrlName}
              content={card.previewContent}
              addChildLeftPosition={addChildLeftPosition}
            />
          ))}
        </div>
      </div>

      <div className="carousel-navigation">
        <p>
          Scrollen oder <br />
          Klicken &amp; Ziehen
        </p>

        <div className="carousel-button-container">
          <button
            disabled={disableButton}
            // onClick={() => scrollToChild("previous")}
          >
            <span className="material-symbols-outlined navigate-icon">
              navigate_before
            </span>
          </button>
          <button
            disabled={disableButton}
            onClick={() => scrollToChild("next")}
          >
            <span className="material-symbols-outlined navigate-icon">
              navigate_next
            </span>
          </button>
        </div>
        <p style={{ visibility: "hidden" }}>
          Scrollen oder <br />
          Klicken &amp; Ziehen
        </p>
      </div>
    </>
  );
};

export default Carousel;

Carousel.propTypes = {
  images: PropTypes.array,
};
