import { useParams } from "react-router-dom";
import SlideshowItem from "./SlideshowItem";

const Slideshow = () => {
  const { name, project } = useParams();

  return (
    <>
      <div className="slideshow-container">
        <div className="slider">
          HI! Here will be a slider for project {project} soon. Just some
          patience pls uwu
        </div>
      </div>
    </>
  );
};

export default Slideshow;
