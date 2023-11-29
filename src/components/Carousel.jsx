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
  const [carouselCardList, setCardList] = useState([
    // {
    //   imgUrl: IMAGES.image5,
    //   imgTitle: "randomImage5",
    // },
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
  const scrollRef = useRef(700);
  scrollRef.current = 700;

  const lowerBoundaryFactorForInfiniteEffect = 0.03;
  const upperBoundaryFactorForInfiniteEffect = 0.8;

  let childSizeValues = [];
  let childRefsCopy = [];
  const preferedFirstChildPosition = 0;

  useEffect(() => {
    // console.log("before erasing childRefs on container mount: " + childRefs);

    // childRefs = [];
    // console.log("after erasing childRefs on container mount: " + childRefs);
    const handleMouseMove = (event) => {
      setMousePosX(event.clientX);
    };

    window.addEventListener("mouseup", dragStop);

    if (containerRef.current) {
      containerRef.current.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      containerRef.current.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", dragStop);
      // clearChildRefs();
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

  const infiniteSlide = (currentCarouselTranslation, carouselRealWidth) => {
    if (
      currentCarouselTranslation >
      -lowerBoundaryFactorForInfiniteEffect * carouselRealWidth
    ) {
      let current = getCurrentCarouselTranslation();
      current -= 0.5 * carouselRealWidth;
      current = Math.ceil(current);
      changeTranslateValue(current);
    } else if (
      currentCarouselTranslation <
      -upperBoundaryFactorForInfiniteEffect * carouselRealWidth
    ) {
      let current = getCurrentCarouselTranslation();
      current += 0.5 * carouselRealWidth;
      current = Math.ceil(current);
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
    console.log("dragStop: " + childRefs);
    setDraggingState(false);
  };

  const addRef = (ref) => {
    childRefsCopy.push(ref.current);
    if (childRefsCopy.length === 2 * carouselCardList.length) {
      setChildRefs([...childRefsCopy]);
      childRefsCopy = [];
    }
  };

  const getChildSizeValues = (currentChild) => {
    const childDetails = currentChild.getBoundingClientRect();
    const childWidth = childDetails.width;
    const childLeft = childDetails.left;
    return { childWidth, childLeft };

    // childSizeValues.push({ childWidth, childLeft });
    // console.log(childSizeValues);
  };
  const scrollToNextChild = () => {
    childSizeValues = [];
    console.log("scrollToNextChild: ->");
    console.log(childRefs);
    childSizeValues = childRefs.map((currentChild) => {
      return getChildSizeValues(currentChild);
    });
    console.log("scrollToNextChild width and left: ->");
    console.log(childSizeValues);
  };

  const clearChildRefs = () => {
    setChildRefs([]);
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
          <button onClick={() => console.log("links")}>links</button>
          <button onClick={scrollToNextChild}>rechts</button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
