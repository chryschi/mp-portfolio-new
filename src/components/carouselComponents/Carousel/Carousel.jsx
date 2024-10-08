import { useState, useRef, useCallback, useEffect } from "react";
import CarouselItem from "../CarouselItem";
import "./Carousel.css";
import PropTypes from "prop-types";
import useViewport from "../../useViewport";
import { useParams } from "react-router-dom";

const Carousel = ({ images }) => {
  const { width } = useViewport();
  const { name, project, slideshow } = useParams();

  const PREFERED_FIRST_CHILD_POSITION =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--padding-left")
      .slice(0, -2) *
    0.01 *
    width;

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

  let timer;

  useEffect(() => {
    const timerSecond = setTimeout(() => {
      if (activeIndex === 0) {
        carouselTrackRef.current.style.transitionDuration = "0ms";
        const newIndex = 0.5 * NUMBER_OF_CAROUSEL_CARDS;
        setActiveIndex(newIndex);
        setTranslateX(childrenTranslateValues[newIndex]);
      }
    }, 310);

    return () => clearTimeout(timerSecond);
  });

  //initialize carousel position on page change
  useEffect(() => {
    setTranslateX(PREFERED_FIRST_CHILD_POSITION);
    setActiveIndex(0);
    setWasDragged(false);
  }, [name, project, slideshow]);

  //effect for carousel mouse dragging
  useEffect(() => {
    const currentContainerRef = containerRef.current;
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

  const compareNumbers = (a, b) => {
    return a - b;
  };

  //retrieving positions of carousel images
  const addChildLeftPosition = useCallback((width) => {
    if (childrenLeftPositionsCopy.length < NUMBER_OF_CAROUSEL_CARDS) {
      childrenLeftPositionsCopy.push(width);

      if (childrenLeftPositionsCopy.length === NUMBER_OF_CAROUSEL_CARDS) {
        childrenLeftPositionsCopy.sort(compareNumbers);
        const finishedArray = childrenLeftPositionsCopy.map(
          (leftPosition) => -leftPosition + 2 * PREFERED_FIRST_CHILD_POSITION
        );
        setChildrenTranslateValues([...finishedArray]);
        childrenLeftPositionsCopy = [];
      }
    }
  }, []);

  // function for wheel scrolling
  const handleWheel = (e) => {
    setWasDragged(true);
    const currentCarouselTranslation = translateX;
    const newTranslateValue = currentCarouselTranslation - e.deltaY * 0.6;
    infiniteEffect(newTranslateValue);
  };

  // functions for dragging the carousel
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

    const mouseMoveDelta = mousePosX - startPosX;
    const newTranslateValue = Math.round(
      startTranslatePosition + mouseMoveDelta
    );
    infiniteEffect(newTranslateValue);
  };

  const dragStop = () => {
    setDraggingState(false);
    clearTimeout(timer);
    const currentCarouselRef = carouselTrackRef.current;
    currentCarouselRef.style.pointerEvents = "auto";
  };

  // logic for letting carousel appear infinite while dragging or scrolling
  const infiniteEffect = (newTranslate) => {
    const carouselRealWidth = carouselTrackRef.current.scrollWidth;
    const minimumTranslateValue = -carouselRealWidth + width;
    const threshold = 500;

    if (
      newTranslate >= minimumTranslateValue + threshold &&
      newTranslate < PREFERED_FIRST_CHILD_POSITION - threshold
    ) {
      setTranslateX(newTranslate);
    } else if (newTranslate - threshold < minimumTranslateValue) {
      setTranslateX(newTranslate + 0.5 * carouselRealWidth);
    } else if (newTranslate + threshold >= PREFERED_FIRST_CHILD_POSITION) {
      setTranslateX(newTranslate - 0.5 * carouselRealWidth);
    }
  };

  //arrow button navigation
  const scrollToChild = (mode) => {
    setWasDragged(false);
    setDisableButton(true);
    carouselTrackRef.current.style.transitionDuration = "400ms";

    let newIndex;

    if (mode === "next") {
      newIndex = wasDragged ? getNextIndex() : activeIndex + 1;
    }
    if (mode === "previous") {
      newIndex = wasDragged ? getNextIndex() - 1 : activeIndex - 1;
      // if (newIndex === -1) {
      //   newIndex = 0.5 * NUMBER_OF_CAROUSEL_CARDS - 1;
      // }
    }

    setTranslateX(childrenTranslateValues[newIndex]);
    setActiveIndex(newIndex);
  };

  const getNextIndex = () => {
    return childrenTranslateValues.findIndex(
      (translateValue) => translateValue < translateX
    );
  };

  const handleTransitionEnd = () => {
    setDisableButton(false);
    const carouselRealWidth = carouselTrackRef.current.scrollWidth;
    const minimumTranslateValue = -carouselRealWidth + width;
    let newIndex;

    if (!wasDragged) {
      // logic for letting carousel appear infinite when navigating with buttons
      if (childrenTranslateValues[activeIndex + 1] < minimumTranslateValue) {
        newIndex = activeIndex - 0.5 * NUMBER_OF_CAROUSEL_CARDS;
      } else if (
        childrenTranslateValues[activeIndex - 1] >=
          PREFERED_FIRST_CHILD_POSITION - 1 ||
        activeIndex === 0
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
        onWheel={handleWheel}
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
