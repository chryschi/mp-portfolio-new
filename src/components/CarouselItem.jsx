import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { catalog } from "../pages/Aktuelles/catalog_Aktuelles";

const CarouselItem = ({ imgUrl, imgTitle, projectUrlName, addRef }) => {
  const itemRef = useRef(null);
  const { name } = useParams();

  useEffect(() => {
    addRef(itemRef);
    console.log(`${imgTitle} was added to carousel!`);
  }, []);

  return (
    <>
      <Link
        draggable="false"
        to={
          projectUrlName in catalog ? `/${name}/${projectUrlName}` : "/notfound"
        }
      >
        <img
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
