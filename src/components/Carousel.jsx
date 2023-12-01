import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import CarouselItem from "./CarouselItem";
import IMAGES from "../assets/IMAGES";

const Carousel = () => {
  const [mousePosX, setMousePosX] = useState();
  const [isDragging, setDraggingState] = useState(false);
  const [startPosX, setStartPosX] = useState();
  const [startTranslatePosition, setStartTranslatePosition] = useState();
  // const [currentCardIndex, setCurrentCardIndex] = useState([2]);
  const [carouselCardList, setCardList] = useState([
    {
      imgUrl: IMAGES.image1,
      imgTitle: "randomImage1",
    },
    {
      imgUrl: IMAGES.image2,
      imgTitle: "randomImage2",
    },
    {
      imgUrl: IMAGES.image3,
      imgTitle: "randomImage3",
    },
    {
      imgUrl: IMAGES.image4,
      imgTitle: "randomImage4",
    },
    {
      imgUrl: IMAGES.image5,
      imgTitle: "randomImage5",
    },
  ]);

  const [childRefs, setChildRefs] = useState([]);

  const containerRef = useRef(null);
  const carouselTrackRef = useRef(null);
  let childLeftPositions = [];
  let childRefsCopy = [];

  const UPPER_BOUNDARY_FACTOR_FOR_INFINITE_EFFECT = -0.3;
  const LOWER_BOUNDARY_FACTOR_FOR_INFINITE_EFFECT = -0.7;
  const PREFERED_FIRST_CHILD_POSITION = 0;
  const NUMBER_OF_CAROUSEL_CARDS = 2 * carouselCardList.length;

  useEffect(() => {
    // console.log("childLeft position in first useEffect");
    // console.log(childLeftPositions);
    // console.log("childRefs in first useEffect");
    // console.log(childRefs);
    // console.log("childRefsCopy in first useEffect");
    // console.log(childRefsCopy);
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
      console.log("transition has ended!!");
      const carouselRealWidth = carouselTrackRef.current.scrollWidth;
      console.log("carousel width" + carouselRealWidth);
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
      console.log(
        "left of currentChild: " + childLeftPositions[nextChildIndex - 1]
      );
      console.log("left of nextChild: " + childLeftPositions[nextChildIndex]);

      let nextPos = Math.round(
        currentTranslation - (nextChildLeft - PREFERED_FIRST_CHILD_POSITION)
      );
      console.log("nextPos: " + nextPos);

      const previousChildLeft = childLeftPositions[nextChildIndex - 1];
      console.log("previousChildLeft" + previousChildLeft);
      if (previousChildLeft) {
        const previousPos = Math.round(
          currentTranslation -
            (previousChildLeft - PREFERED_FIRST_CHILD_POSITION)
        );
        console.log("previousPos: " + previousPos);

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
      console.log("infinite effect triggered by transitionEnd!");
    } else if (
      desiredCarouselTranslation <
      LOWER_BOUNDARY_FACTOR_FOR_INFINITE_EFFECT * carouselRealWidth
    ) {
      let current = getCurrentCarouselTranslation();
      current += 0.5 * carouselRealWidth;
      current = Math.ceil(current);
      carouselTrackRef.current.style.transitionDuration = "0ms";

      changeTranslateValue(current);
      console.log("infinite effect triggered by transitionEnd!");
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
    console.log("childRefs in scroll function");
    console.log(childRefs);
    carouselTrackRef.current.style.transitionDuration = "400ms";
    const carouselRealWidth = carouselTrackRef.current.scrollWidth;
    const currentTranslation = getCurrentCarouselTranslation();

    childLeftPositions = [];
    childLeftPositions = childRefs.map((currentChild) => {
      return getChildLeftPosition(currentChild);
    });

    console.log("childLeftPositions in scrollnext function");
    console.log(childLeftPositions);
    console.log("childRefsCopy in scrollnext function");
    console.log(childRefsCopy);
    console.log("childRefs in scrollnext function");
    console.log(childRefs);

    const nextChildIndex = childLeftPositions.findIndex((childLeftPosition) => {
      console.log(childLeftPosition);
      return Math.floor(childLeftPosition) > PREFERED_FIRST_CHILD_POSITION;
    });

    if (mode === "next") {
      console.log("next is fired");

      const nextChildLeft = childLeftPositions[nextChildIndex];
      console.log(
        "OLD left of currentChild: " + childLeftPositions[nextChildIndex]
      );
      let newPos = Math.round(
        currentTranslation - (nextChildLeft - PREFERED_FIRST_CHILD_POSITION)
      );
      console.log("new Pos (which should be current translate" + newPos);

      changeTranslateValue(newPos);
      console.log("current translate" + getCurrentCarouselTranslation());

      console.log(
        "lower boundary" +
          LOWER_BOUNDARY_FACTOR_FOR_INFINITE_EFFECT * carouselRealWidth
      );
      console.log(
        "upper boundary" +
          UPPER_BOUNDARY_FACTOR_FOR_INFINITE_EFFECT * carouselRealWidth
      );
    }

    if (mode === "previous") {
      console.log("previous is fired");

      let previousChildLeft = childLeftPositions[nextChildIndex - 2];
      console.log("previous Childleft before updating" + previousChildLeft);
      if (Math.round(childLeftPositions[nextChildIndex - 1]) < 0) {
        previousChildLeft = childLeftPositions[nextChildIndex - 1];
      }
      console.log(
        "previous left of currentChild (after updating): " + previousChildLeft
      );
      let newPos = Math.round(
        currentTranslation - (previousChildLeft - PREFERED_FIRST_CHILD_POSITION)
      );
      console.log("new Pos (which should be current translate" + newPos);
      changeTranslateValue(newPos);
      console.log("current translate" + getCurrentCarouselTranslation());

      console.log(
        "upper boundary" +
          UPPER_BOUNDARY_FACTOR_FOR_INFINITE_EFFECT * carouselRealWidth
      );
      console.log(
        "Lower boundary" +
          LOWER_BOUNDARY_FACTOR_FOR_INFINITE_EFFECT * carouselRealWidth
      );
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

  // const scrollToChild = (mode) => {

  //   const carouselRealWidth = carouselTrackRef.current.scrollWidth;

  //   childLeftPositions = [];
  //   childLeftPositions = childRefs.map((currentChild) => {
  //     return getChildLeftPosition(currentChild);
  //   });

  //   const childAfterPreviousChildIndex = childLeftPositions.findIndex(
  //     (childLeft) => {
  //       console.log(childLeft);

  //       return childLeft >= PREFERED_FIRST_CHILD_POSITION;
  //     }
  //   );
  //   const previousChild = childLeftPositions[childAfterPreviousChildIndex - 1];
  //   console.log("previousChild left: " + previousChild.childLeft);
  //   const currentTranslation = getCurrentCarouselTranslation();
  //   const newPos =
  //     currentTranslation -
  //     (previousChild.childLeft - PREFERED_FIRST_CHILD_POSITION);

  //   changeTranslateValue(newPos);

  //   console.log(
  //     "lower noudary" +
  //       -LOWER_BOUNDARY_FACTOR_FOR_INFINITE_EFFECT * carouselRealWidth
  //   );
  //   console.log(
  //     "upper noudary" +
  //       -UPPER_BOUNDARY_FACTOR_FOR_INFINITE_EFFECT * carouselRealWidth
  //   );
  //   infiniteSlide(getCurrentCarouselTranslation(), carouselRealWidth);
  //   console.log("childLeftPositions width and left: ->");
  //   console.log(childLeftPositions);
  //   console.log("current translate: " + getCurrentCarouselTranslation());
  // };

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
          className={
            isDragging
              ? "carousel-no-transition dragging"
              : "carousel-transition"
          }
        >
          {carouselCardList.map((card, idx) => (
            <CarouselItem
              key={idx}
              imgUrl={card.imgUrl}
              imgTitle={card.imgTitle}
              addRef={addRef}
            />
          ))}
          {carouselCardList.map((card, idx) => (
            <CarouselItem
              uselItem
              key={idx + carouselCardList.length}
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
