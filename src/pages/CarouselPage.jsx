import { useParams } from "react-router-dom";
import Carousel from "../components/carouselComponents/Carousel/Carousel.jsx";
import { catalogueProjects, cataloguePages } from "./catalogues.jsx";

const CarouselPage = () => {
  const { name, project } = useParams();

  return (
    <main>
      {project === undefined ? (
        <Carousel images={cataloguePages[`${name}`].images} />
      ) : (
        <Carousel images={catalogueProjects[`${project}`].images} />
      )}
    </main>
  );
};

export default CarouselPage;
