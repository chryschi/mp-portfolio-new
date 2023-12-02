import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from "../components/Carousel.jsx";
import { catalog } from "./Aktuelles/catalog_Aktuelles.jsx";

const CarouselPage = () => {
  const { name, project } = useParams();

  const [projectName, setProjectName] = useState("Aktuelles");

  useEffect(() => {
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    if (project === undefined) {
      setProjectName(capitalizedName);
    } else if (project in catalog) {
      setProjectName(project);
    }
  }, [name, project]);

  return (
    <>
      <Carousel images={catalog[`${projectName}`].images} />
    </>
  );
};

export default CarouselPage;
