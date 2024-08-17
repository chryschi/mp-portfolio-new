import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { catalogueProjects, cataloguePages } from "../../pages/catalogues";
import TextCarouselItem from "./TextCarouselItem";
import { useContext } from "react";
import { PageContext } from "../Page";

const CarouselItem = ({
  id,
  imgUrl,
  imgTitle,
  projectUrlName,
  addRef,
  content,
}) => {
  const { setFirstImageIndexInSlideshow } = useContext(PageContext);
  const itemRef = useRef(null);
  const { name, project, slideshow } = useParams();
  const [translateCaption, setTranslateCaption] = useState(-20);

  useEffect(() => {
    addRef(itemRef);
  }, []);

  const handleSelectImage = () => {
    setFirstImageIndexInSlideshow(id);
    console.log(`id ${id} was set! imgUrl ${imgUrl}`);
  };

  const showImageCaption = () => {
    setTranslateCaption(0);
  };
  const hideImageCaption = () => {
    setTranslateCaption(-20);
  };

  if (imgUrl !== undefined) {
    return (
      <>
        <Link
          draggable="false"
          to={
            (projectUrlName in cataloguePages ||
              projectUrlName in catalogueProjects) &&
            project === undefined
              ? `/${name}/${projectUrlName}`
              : project in catalogueProjects && slideshow === undefined
              ? `/${name}/${projectUrlName}/slideshow`
              : "/notfound"
          }
          onClick={handleSelectImage}
        >
          <figure>
            {/* <figcaption style={{ visibility: "hidden" }}>{imgTitle}</figcaption> */}
            <img
              ref={itemRef}
              className="carousel-img"
              onMouseEnter={showImageCaption}
              onMouseLeave={hideImageCaption}
              src={imgUrl}
              alt={imgTitle}
              draggable="false"
            />
            <figcaption>
              <div
                className="img-caption"
                style={{
                  transform: `translate3d(${translateCaption}px, 0px, 0px)`,
                }}
              >
                {imgTitle}
              </div>
            </figcaption>
          </figure>
        </Link>
      </>
    );
  } else if (content !== undefined) {
    return <TextCarouselItem ref={itemRef} content={content} />;
  }
};

export default CarouselItem;
