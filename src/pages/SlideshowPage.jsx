import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { catalog } from "./Aktuelles/catalog_Aktuelles.jsx";
import Slideshow from "../components/slideshowComponents/Slideshow.jsx";

const SlideshowPage = () => {
  const { name, project, slideshow } = useParams();

  const [projectName, setProjectName] = useState("portfolio");
  const images = catalog[`${projectName}`].images;

  useEffect(() => {
    // const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    if (project in catalog) {
      setProjectName(project);
    }
  }, [name, project]);

  return (
    <main>
      {slideshow === "slideshow" ? (
        <Slideshow images={images.slice(1)} />
      ) : (
        <Slideshow images={images.slice(0, 1)} />
      )}
    </main>
  );
};

export default SlideshowPage;
