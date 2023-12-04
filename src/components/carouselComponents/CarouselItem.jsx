import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { catalog } from "../../pages/Aktuelles/catalog_Aktuelles";
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

  useEffect(() => {
    addRef(itemRef);
  }, []);

  const handleSelectImage = () => {
    setFirstImageIndexInSlideshow(id);
    console.log(`id ${id} was set! imgUrl ${imgUrl}`);
  };

  if (imgUrl !== undefined) {
    return (
      <>
        <Link
          draggable="false"
          to={
            projectUrlName in catalog && project === undefined
              ? `/${name}/${projectUrlName}`
              : project in catalog && slideshow === undefined
              ? `/${name}/${projectUrlName}/slideshow`
              : "/notfound"
          }
          onClick={handleSelectImage}
        >
          <figure>
            <figcaption style={{ visibility: "hidden" }}>{imgTitle}</figcaption>
            <img
              ref={itemRef}
              className="carousel-img"
              src={imgUrl}
              alt={imgTitle}
              draggable="false"
            />
            <figcaption className="img-caption">{imgTitle}</figcaption>
          </figure>
        </Link>
      </>
    );
  } else if (content !== undefined) {
    return <TextCarouselItem ref={itemRef} content={content} />;
  }
};

export default CarouselItem;
