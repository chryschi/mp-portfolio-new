import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { catalog } from "../pages/Aktuelles/catalog_Aktuelles";

const CarouselItem = ({ imgUrl, imgTitle, projectUrlName, addRef }) => {
  const itemRef = useRef(null);
  const { name, project, slideshow } = useParams();

  useEffect(() => {
    addRef(itemRef);
    console.log(`${imgTitle} was added to carousel!`);
  }, []);

  // const handleClickOnCarouselCard = () => {
  //   const currentItemRef = itemRef.current;
  //   timer = setTimeout(() => {
  //     currentItemRef.style.pointerEvents = "none";
  //   }, 250);
  // };

  // const cleanUpTimeout = () => {
  //   clearTimeout(timer);
  //   const currentItemRef = itemRef.current;
  //   currentItemRef.style.pointerEvents = "auto";
  // };

  return (
    <>
      <Link
        draggable="false"
        to={
          projectUrlName in catalog && project === undefined
            ? `/${name}/${projectUrlName}`
            : project in catalog
            ? `/${name}/${projectUrlName}/slideshow`
            : "/notfound"
        }
      >
        <img
          // onClick={handleClickOnCarouselCard}
          // onMouseUp={cleanUpTimeout}
          ref={itemRef}
          className="carousel-img"
          src={imgUrl}
          alt={imgTitle}
          draggable="false"
        />
      </Link>
    </>
  );
};

export default CarouselItem;
