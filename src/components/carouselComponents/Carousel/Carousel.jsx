import { useState, useRef, useCallback, useEffect } from "react";
import CarouselItem from "../CarouselItem";
import "./Carousel.css";
import PropTypes from "prop-types";
import useViewport from "../../useViewport";

const Carousel = ({ images }) => {
  const PREFERED_FIRST_CHILD_POSITION = getComputedStyle(
    document.documentElement
  )
    .getPropertyValue("--padding-primary")
    .slice(0, -2);

  const NUMBER_OF_CAROUSEL_CARDS = 2 * images.length;

  //for dragging
  const [mousePosX, setMousePosX] = useState();
  const [isDragging, setDraggingState] = useState(false);
  const [startPosX, setStartPosX] = useState();
  const [startTranslatePosition, setStartTranslatePosition] = useState();

  //switching between dragging and button navigation
  const [wasDragged, setWasDragged] = useState(false);

  //for button navigation
  const [disableButton, setDisableButton] = useState(false);
  const [childrenTranslateValues, setChildrenTranslateValues] = useState([]);
  const [translateX, setTranslateX] = useState(PREFERED_FIRST_CHILD_POSITION);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef(null);
  const carouselTrackRef = useRef(null);

  let childrenLeftPositionsCopy = [];

  const { width } = useViewport();

  let timer;

  //correct position for infinite effect on initial render
  useEffect(() => {
    if (activeIndex === 0) {
      carouselTrackRef.current.style.transitionDuration = "0ms";
      const newIndex = activeIndex + 0.5 * NUMBER_OF_CAROUSEL_CARDS;
      setTranslateX(childrenTranslateValues[newIndex]);
      setActiveIndex(newIndex);
    }
  }, []);

  //handle carousel mouse dragging
  useEffect(() => {
    const currentContainerRef = containerRef.current;
    console.log("effect for dragging");
    const handleMouseMove = (event) => {
      setMousePosX(event.clientX);
    };

    window.addEventListener("mouseup", dragStop);

    if (currentContainerRef) {
      currentContainerRef.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mouseup", dragStop);
      currentContainerRef.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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

  const dragStart = () => {
    setWasDragged(true);
    const currentCarouselRef = carouselTrackRef.current;
    timer = setTimeout(() => {
      currentCarouselRef.style.pointerEvents = "none";
    }, 150);
    carouselTrackRef.current.style.transitionDuration = "0ms";
    const currentCarouselTranslation = translateX;
    setDraggingState(true);
    setStartTranslatePosition(Number(currentCarouselTranslation));
    setStartPosX(mousePosX);
  };

  const dragging = () => {
    if (!isDragging) return;

    const carouselRealWidth = carouselTrackRef.current.scrollWidth;
    const mouseMoveDelta = mousePosX - startPosX;
    const newTranslateValue = Math.round(
      startTranslatePosition + mouseMoveDelta
    );

    const minimumTranslateValue = -carouselRealWidth + width;

    const threshold = 500;
    // logic for letting carousel appear infinite
    if (
      newTranslateValue >= minimumTranslateValue + threshold &&
      newTranslateValue < PREFERED_FIRST_CHILD_POSITION - threshold
    ) {
      setTranslateX(newTranslateValue);
    } else if (newTranslateValue - threshold < minimumTranslateValue) {
      // newIndex = activeIndex - 0.5 * NUMBER_OF_CAROUSEL_CARDS;
      setTranslateX(newTranslateValue + 0.5 * carouselRealWidth);
    } else if (newTranslateValue + threshold >= PREFERED_FIRST_CHILD_POSITION) {
      // newIndex = activeIndex + 0.5 * NUMBER_OF_CAROUSEL_CARDS;
      setTranslateX(newTranslateValue - 0.5 * carouselRealWidth);
    }
  };

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

  const dragStop = () => {
    setDraggingState(false);
    clearTimeout(timer);
    const currentCarouselRef = carouselTrackRef.current;
    currentCarouselRef.style.pointerEvents = "auto";
  };

  const scrollToChild = (mode) => {
    setWasDragged(false);
    setDisableButton(true);
    carouselTrackRef.current.style.transitionDuration = "400ms";

    let newIndex;

    if (mode === "next") {
      newIndex = activeIndex + 1;
    }
    if (mode === "previous") {
      newIndex = activeIndex - 1;
    }

    setTranslateX(childrenTranslateValues[newIndex]);
    setActiveIndex(newIndex);
  };

  const handleTransitionEnd = () => {
    console.log("transition has ended");
    setDisableButton(false);
    const carouselRealWidth = carouselTrackRef.current.scrollWidth;
    const minimumTranslateValue = -carouselRealWidth + width;
    let newIndex;

    if (!wasDragged) {
      // logic for letting carousel appear infinite when navigating with button
      if (childrenTranslateValues[activeIndex + 1] < minimumTranslateValue) {
        newIndex = activeIndex - 0.5 * NUMBER_OF_CAROUSEL_CARDS;
      } else if (
        childrenTranslateValues[activeIndex - 1] >=
        PREFERED_FIRST_CHILD_POSITION
      ) {
        newIndex = activeIndex + 0.5 * NUMBER_OF_CAROUSEL_CARDS;
      } else {
        newIndex = activeIndex;
      }

      carouselTrackRef.current.style.transitionDuration = "0ms";
      setTranslateX(childrenTranslateValues[newIndex]);
      setActiveIndex(newIndex);
    }
  };

  return (
    <>
      <div
        className="carousel-container"
        onMouseDown={dragStart}
        onMouseMove={dragging}
        ref={containerRef}
      >
        <div
          ref={carouselTrackRef}
          className={"carousel " + (isDragging ? "dragging" : "")}
          style={{ transform: `translate3d(${translateX}px, 0px, 0px)` }}
          onTransitionEnd={handleTransitionEnd}
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
            onClick={() => scrollToChild("previous")}
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
