import { useEffect, useState, useRef, useLayoutEffect } from "react";
import CarouselItem from "./CarouselItem";

const Carousel = ({ images }) => {
  const [mousePosX, setMousePosX] = useState();
  const [isDragging, setDraggingState] = useState(false);
  const [startPosX, setStartPosX] = useState();
  const [startTranslatePosition, setStartTranslatePosition] = useState();
  const [childRefs, setChildRefs] = useState([]);
  const [disableButton, setDisableButton] = useState(false);

  const containerRef = useRef(null);
  const carouselTrackRef = useRef(null);

  const UPPER_BOUNDARY_FACTOR_FOR_INFINITE_EFFECT = -0.2;
  const LOWER_BOUNDARY_FACTOR_FOR_INFINITE_EFFECT = -0.7;
  const PREFERED_FIRST_CHILD_POSITION = 50;
  const NUMBER_OF_CAROUSEL_CARDS = 2 * images.length;
  let childLeftPositions = [];
  let childRefsCopy = [];
  let timer;

  useLayoutEffect(() => {
    const carouselRealWidth = carouselTrackRef.current.scrollWidth;
    changeTranslateValue(-0.5 * carouselRealWidth);
  }, []);

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

  useEffect(() => {
    const currentCarouselRef = carouselTrackRef.current;
    const transitionEnd = () => {
      setDisableButton(false);
      const carouselRealWidth = carouselTrackRef.current.scrollWidth;
      const currentTranslation = getCurrentCarouselTranslation();

      childLeftPositions = [];
      childLeftPositions = childRefsCopy.map((currentChild) => {
        return getChildLeftPosition(currentChild);
      });
      const nextChildIndex = childLeftPositions.findIndex(
        (childLeftPosition) => {
          return Math.floor(childLeftPosition) > PREFERED_FIRST_CHILD_POSITION;
        }
      );
      const nextChildLeft = childLeftPositions[nextChildIndex];
      const nextPos =
        currentTranslation - (nextChildLeft - PREFERED_FIRST_CHILD_POSITION);
      const previousChildLeft = childLeftPositions[nextChildIndex - 1];
      if (previousChildLeft) {
        const previousPos =
          currentTranslation -
          (previousChildLeft - PREFERED_FIRST_CHILD_POSITION);
        nextPos <= previousPos
          ? infiniteSlide(nextPos, carouselRealWidth)
          : infiniteSlide(previousPos, carouselRealWidth);
      }
    };

    currentCarouselRef.addEventListener("transitionend", transitionEnd);

    return () => {
      currentCarouselRef.removeEventListener("transitionend", transitionEnd);
    };
  }, []);

  useEffect(() => {
    const currentCarouselRef = carouselTrackRef.current;
    const handleWheel = (e) => {
      e.preventDefault();

      const carouselRealWidth = currentCarouselRef.scrollWidth;
      const currentCarouselTranslation = getCurrentCarouselTranslation();
      const newTranslateValue = currentCarouselTranslation - e.deltaY * 0.6;

      changeTranslateValue(newTranslateValue);
      infiniteSlide(newTranslateValue, carouselRealWidth);
    };

    currentCarouselRef.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      currentCarouselRef.removeEventListener("wheel", handleWheel, {
        passive: false,
      });
    };
  }, []);

  const dragStart = () => {
    const currentCarouselRef = carouselTrackRef.current;
    timer = setTimeout(() => {
      currentCarouselRef.style.pointerEvents = "none";
    }, 150);
    carouselTrackRef.current.style.transitionDuration = "0ms";
    const currentCarouselTranslation = getCurrentCarouselTranslation();
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
    changeTranslateValue(newTranslateValue);
    infiniteSlide(getCurrentCarouselTranslation(), carouselRealWidth);
  };

  const changeTranslateValue = (newPos) => {
    newPos = Number(newPos);
    newPos += "px";
    document.documentElement.style.setProperty("--scrollPos", newPos);
  };

  const infiniteSlide = (desiredCarouselTranslation, carouselRealWidth) => {
    if (
      desiredCarouselTranslation >
      UPPER_BOUNDARY_FACTOR_FOR_INFINITE_EFFECT * carouselRealWidth
    ) {
      let current = getCurrentCarouselTranslation();
      current -= 0.5 * carouselRealWidth;
      current = Math.round(current);
      carouselTrackRef.current.style.transitionDuration = "0ms";
      changeTranslateValue(current);
    } else if (
      desiredCarouselTranslation <
      LOWER_BOUNDARY_FACTOR_FOR_INFINITE_EFFECT * carouselRealWidth
    ) {
      let current = getCurrentCarouselTranslation();
      current += 0.5 * carouselRealWidth;
      current = Math.round(current);
      carouselTrackRef.current.style.transitionDuration = "0ms";

      changeTranslateValue(current);
    }
  };

  const getCurrentCarouselTranslation = () => {
    const currentCarouselTranslation = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--scrollPos");
    const translation = Number(currentCarouselTranslation.slice(0, -2));
    return translation;
  };

  const dragStop = () => {
    setDraggingState(false);
    clearTimeout(timer);
    const currentCarouselRef = carouselTrackRef.current;
    currentCarouselRef.style.pointerEvents = "auto";
  };

  const addRef = (ref) => {
    if (childRefsCopy.length < NUMBER_OF_CAROUSEL_CARDS) {
      childRefsCopy.push(ref.current);
    } else if (childRefsCopy.length === NUMBER_OF_CAROUSEL_CARDS) {
      setChildRefs([...childRefsCopy]);
    }
  };

  const scrollToChild = (mode) => {
    setDisableButton(true);
    carouselTrackRef.current.style.transitionDuration = "400ms";
    const carouselRealWidth = carouselTrackRef.current.scrollWidth;
    const currentTranslation = getCurrentCarouselTranslation();
    console.log("carousel width: " + carouselRealWidth);

    childLeftPositions = [];
    childLeftPositions = childRefs.map((currentChild) => {
      return getChildLeftPosition(currentChild);
    });

    console.log("previous childLefts: ");
    console.log(childLeftPositions);

    console.log(childRefs);
    console.log(childRefsCopy);

    const nextChildIndex = childLeftPositions.findIndex((childLeftPosition) => {
      return Math.floor(childLeftPosition) > PREFERED_FIRST_CHILD_POSITION;
    });

    if (mode === "next") {
      const nextChildLeft = childLeftPositions[nextChildIndex];
      let newPos =
        currentTranslation - (nextChildLeft - PREFERED_FIRST_CHILD_POSITION);
      changeTranslateValue(newPos);
    }

    if (mode === "previous") {
      let previousChildLeft = childLeftPositions[nextChildIndex - 2];
      if (
        Math.round(childLeftPositions[nextChildIndex - 1]) <
        PREFERED_FIRST_CHILD_POSITION
      ) {
        previousChildLeft = childLeftPositions[nextChildIndex - 1];
      }
      let newPos =
        currentTranslation -
        (previousChildLeft - PREFERED_FIRST_CHILD_POSITION);
      changeTranslateValue(newPos);
    }
  };

  const getChildLeftPosition = (currentChild) => {
    const childDetails = currentChild.getBoundingClientRect();
    const leftPosition = childDetails.left;
    return leftPosition;
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
        >
          {images.map((card, idx) => (
            <CarouselItem
              key={idx}
              id={idx}
              imgUrl={card.imgUrl}
              imgTitle={card.imgTitle}
              projectUrlName={card.projectUrlName}
              content={card.previewContent}
              addRef={addRef}
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
              addRef={addRef}
            />
          ))}
        </div>
      </div>

      <div className="carousel-navigation">
        <p className="carousel-nav-text">Scrollen oder Klicken und Ziehen</p>
        <div className="carousel-buttons">
          <button
            disabled={disableButton}
            onClick={() => scrollToChild("previous")}
          >
            links
          </button>
          <button
            disabled={disableButton}
            onClick={() => scrollToChild("next")}
          >
            rechts
          </button>
        </div>
        <p className="carousel-nav-text" style={{ visibility: "hidden" }}>
          Scrollen oder Klicken und Ziehen
        </p>
      </div>
    </>
  );
};

export default Carousel;
