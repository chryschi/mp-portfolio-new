import { useParams } from "react-router-dom";
import {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useContext,
} from "react";
import SlideshowItem from "./SlideshowItem";
import { PageContext } from "../Page";

import TextSlideshowItem from "./TextSlideshowItem";
import "./Slideshow.css";

const Slideshow = ({ images }) => {
  const { firstImageIndexInSlideshow } = useContext(PageContext);

  const transformIndex = () =>
    firstImageIndexInSlideshow < images.length + 1
      ? firstImageIndexInSlideshow
      : firstImageIndexInSlideshow - images.length - 1;
  const [currentImageIndex, setCurrentImageIndex] = useState(transformIndex);
  const [translateX, setTranslateX] = useState(0);
  const [disableScrollNavigation, setDisableScrollNavigation] = useState(false);

  const sliderRef = useRef(null);

  const lastImage = images[0];
  const firstImage = images[images.length - 1];
  const GAP_FACTOR_OF_WINDOW_WIDTH = 0.2;

  const scrollToChild = (mode) => {
    setDisableScrollNavigation(true);
    sliderRef.current.style.transitionDuration = "400ms";
    if (mode === "next") {
      if (currentImageIndex >= images.length) {
        setTranslateX(
          window.innerWidth *
            (images.length + 1 - 0.5 * GAP_FACTOR_OF_WINDOW_WIDTH)
        );
        setCurrentImageIndex(1);
      } else {
        setTranslateX(
          window.innerWidth *
            (currentImageIndex + 1 - 0.5 * GAP_FACTOR_OF_WINDOW_WIDTH)
        );
        setCurrentImageIndex((prev) => ++prev);
      }
    } else if (mode === "previous") {
      if (currentImageIndex <= 1) {
        setTranslateX(window.innerWidth * (-0.5 * GAP_FACTOR_OF_WINDOW_WIDTH));
        setCurrentImageIndex(images.length);
      } else {
        setTranslateX(
          window.innerWidth *
            (currentImageIndex - 1 - 0.5 * GAP_FACTOR_OF_WINDOW_WIDTH)
        );
        setCurrentImageIndex((prev) => --prev);
      }
    }
    console.log("current Image INdex" + currentImageIndex);
    console.log("translateX" + translateX);
  };

  useLayoutEffect(() => {
    setTranslateX(
      window.innerWidth * (currentImageIndex - 0.5 * GAP_FACTOR_OF_WINDOW_WIDTH)
    );
  }, []);
  //
  const transitionEnd = () => {
    setDisableScrollNavigation(false);

    if (currentImageIndex <= 1) {
      sliderRef.current.style.transitionDuration = "0ms";
      setTranslateX(
        window.innerWidth *
          (currentImageIndex - 0.5 * GAP_FACTOR_OF_WINDOW_WIDTH)
      );
    } else if (currentImageIndex >= images.length) {
      sliderRef.current.style.transitionDuration = "0ms";
      setTranslateX(
        window.innerWidth * (images.length - 0.5 * GAP_FACTOR_OF_WINDOW_WIDTH)
      );
    }
  };

  if (images.length > 1) {
    return (
      <>
        <div className="slideshow-container">
          {" "}
          <nav
            className={
              "slideshow-button-scroll " +
              (disableScrollNavigation ? "disable-navigation" : "")
            }
          >
            <div onClick={() => scrollToChild("previous")} className="previous">
              <span className="material-symbols-outlined navigate-icon">
                navigate_before
              </span>
            </div>
            <div onClick={() => scrollToChild("next")} className="next">
              <span className="material-symbols-outlined navigate-icon">
                navigate_next
              </span>
            </div>
          </nav>
          <div
            onTransitionEnd={transitionEnd}
            ref={sliderRef}
            className="slider"
            style={{
              transform: `translate3d(${-translateX}px,  0px, 0px)`,
            }}
          >
            <SlideshowItem
              key={0}
              imgUrl={firstImage.imgUrl}
              imgTitle={firstImage.imgTitle}
              // project={firstImage.projectUrlName}
            />
            {images.map((image, idx) => (
              <SlideshowItem
                key={idx + 1}
                imgUrl={image.imgUrl}
                imgTitle={image.imgTitle}
                // project={images.projectUrlName}
              />
            ))}
            <SlideshowItem
              key={images.length + 1}
              imgUrl={lastImage.imgUrl}
              imgTitle={lastImage.imgTitle}
              // project={lastImage.projectUrlName}
            />
          </div>
        </div>
        {/* <div>
          <button onClick={() => scrollToChild("previous")}>previous</button>
          <button onClick={() => scrollToChild("next")}>next</button>
        </div> */}
        <div className="slider-counter-container">
          <div className="slider-counter">
            {currentImageIndex === 0
              ? images.length
              : currentImageIndex === images.length + 1
              ? 1
              : currentImageIndex}
            /{images.length}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="slideshow-container">
        <div className="slider">
          <TextSlideshowItem content={images[0].fullContent} />
        </div>
      </div>
    );
  }
};

export default Slideshow;
