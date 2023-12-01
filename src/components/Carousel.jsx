import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import CarouselItem from "./CarouselItem";
import cardDetails from "./carousel-config";

const Carousel = () => {
  const [mousePosX, setMousePosX] = useState();
  const [isDragging, setDraggingState] = useState(false);
  const [startPosX, setStartPosX] = useState();
  const [startTranslatePosition, setStartTranslatePosition] = useState();
  const [childRefs, setChildRefs] = useState([]);

  const containerRef = useRef(null);
  const carouselTrackRef = useRef(null);

  const UPPER_BOUNDARY_FACTOR_FOR_INFINITE_EFFECT = -0.2;
  const LOWER_BOUNDARY_FACTOR_FOR_INFINITE_EFFECT = -0.7;
  const PREFERED_FIRST_CHILD_POSITION = 0;
  const NUMBER_OF_CAROUSEL_CARDS = 2 * cardDetails.length;
  let childLeftPositions = [];
  let childRefsCopy = [];

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosX(event.clientX);
    };

    window.addEventListener("mouseup", dragStop);

    if (containerRef.current) {
      containerRef.current.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mouseup", dragStop);
      containerRef.current.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const transitionEnd = () => {
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
      const nextPos = Math.round(
        currentTranslation - (nextChildLeft - PREFERED_FIRST_CHILD_POSITION)
      );

      const previousChildLeft = childLeftPositions[nextChildIndex - 1];
      if (previousChildLeft) {
        const previousPos = Math.round(
          currentTranslation -
            (previousChildLeft - PREFERED_FIRST_CHILD_POSITION)
        );

        nextPos <= previousPos
          ? infiniteSlide(nextPos, carouselRealWidth)
          : infiniteSlide(previousPos, carouselRealWidth);
      }
    };

    carouselTrackRef.current.addEventListener("transitionend", transitionEnd);

    return () => {
      carouselTrackRef.current.removeEventListener(
        "transitionend",
        transitionEnd
      );
    };
  }, []);

  const dragStart = () => {
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
    const newTranslateValue = Math.ceil(
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
      current = Math.ceil(current);
      carouselTrackRef.current.style.transitionDuration = "0ms";
      changeTranslateValue(current);
    } else if (
      desiredCarouselTranslation <
      LOWER_BOUNDARY_FACTOR_FOR_INFINITE_EFFECT * carouselRealWidth
    ) {
      let current = getCurrentCarouselTranslation();
      current += 0.5 * carouselRealWidth;
      current = Math.ceil(current);
      carouselTrackRef.current.style.transitionDuration = "0ms";

      changeTranslateValue(current);
    }
  };

  const getCurrentCarouselTranslation = () => {
    const currentCarouselTranslation = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--scrollPos");
    const roundedTranslation = Math.ceil(
      Number(currentCarouselTranslation.slice(0, -2))
    );
    return roundedTranslation;
  };

  const dragStop = () => {
    setDraggingState(false);
  };

  const addRef = (ref) => {
    if (childRefsCopy.length < NUMBER_OF_CAROUSEL_CARDS) {
      childRefsCopy.push(ref.current);
    } else if (childRefsCopy.length === NUMBER_OF_CAROUSEL_CARDS) {
      setChildRefs([...childRefsCopy]);
    }
  };

  const scrollToChild = (mode) => {
    carouselTrackRef.current.style.transitionDuration = "400ms";
    const carouselRealWidth = carouselTrackRef.current.scrollWidth;
    const currentTranslation = getCurrentCarouselTranslation();

    childLeftPositions = [];
    childLeftPositions = childRefs.map((currentChild) => {
      return getChildLeftPosition(currentChild);
    });

    const nextChildIndex = childLeftPositions.findIndex((childLeftPosition) => {
      return Math.floor(childLeftPosition) > PREFERED_FIRST_CHILD_POSITION;
    });

    if (mode === "next") {
      const nextChildLeft = childLeftPositions[nextChildIndex];
      let newPos = Math.round(
        currentTranslation - (nextChildLeft - PREFERED_FIRST_CHILD_POSITION)
      );
      changeTranslateValue(newPos);
    }

    if (mode === "previous") {
      let previousChildLeft = childLeftPositions[nextChildIndex - 2];
      if (Math.round(childLeftPositions[nextChildIndex - 1]) < 0) {
        previousChildLeft = childLeftPositions[nextChildIndex - 1];
      }
      let newPos = Math.round(
        currentTranslation - (previousChildLeft - PREFERED_FIRST_CHILD_POSITION)
      );
      changeTranslateValue(newPos);
    }
  };

  const positionTriggersInfiniteSlide = (pos, carouselRealWidth) => {
    if (
      pos > UPPER_BOUNDARY_FACTOR_FOR_INFINITE_EFFECT * carouselRealWidth ||
      pos < LOWER_BOUNDARY_FACTOR_FOR_INFINITE_EFFECT * carouselRealWidth
    ) {
      return true;
    } else {
      return false;
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
          {cardDetails.map((card, idx) => (
            <CarouselItem
              key={idx}
              imgUrl={card.imgUrl}
              imgTitle={card.imgTitle}
              addRef={addRef}
            />
          ))}
          {cardDetails.map((card, idx) => (
            <CarouselItem
              uselItem
              key={idx + cardDetails.length}
              imgUrl={card.imgUrl}
              imgTitle={card.imgTitle}
              addRef={addRef}
            />
          ))}
        </div>
      </div>

      <div>
        <p>Scrollen oder Klicken und Ziehen</p>
        <div>
          <button onClick={() => scrollToChild("previous")}>links</button>
          <button onClick={() => scrollToChild("next")}>rechts</button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
