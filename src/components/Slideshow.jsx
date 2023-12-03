import { useParams } from "react-router-dom";
import SlideshowItem from "./SlideshowItem";

const Slideshow = ({ images }) => {
  // const { name, project } = useParams();
  const lastImage = images[0];
  const firstImage = images[images.length - 1];

  return (
    <>
      <div className="slideshow-container">
        <div className="slider">
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
    </>
  );
};

export default Slideshow;
