import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from "../components/carouselComponents/Carousel/Carousel.jsx";
import { catalog } from "./Aktuelles/catalog_Aktuelles.jsx";

const CarouselPage = () => {
  const { name, project } = useParams();

  return (
    <main>
      {project === undefined ? (
        <Carousel images={catalog[`${name}`].images} />
      ) : (
        <Carousel images={catalog[`${project}`].images} />
      )}
    </main>
  );
};

export default CarouselPage;
