import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { catalog } from "./Aktuelles/catalog_Aktuelles.jsx";
import Slideshow from "../components/Slideshow.jsx";

const SlideshowPage = () => {
  const { name, project, slideshow, projektbeschreibung } = useParams();

  const [projectName, setProjectName] = useState("portfolio");
  let items = catalog[`${projectName}`].images;

  useEffect(() => {
    // const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    if (project in catalog && slideshow === "slideshow") {
      setProjectName(project);

      items.slice(0, 1);
    } else if (
      project in catalog &&
      projektbeschreibung === "projektbeschreibung"
    ) {
      setProjectName(project);
      items.slice(1);
    }
  }, [name, project]);

  return (
    <>
      <Slideshow images={imagesForSlideShow} />
    </>
  );
};

export default SlideshowPage;
