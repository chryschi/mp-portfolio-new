import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { catalog } from "./Aktuelles/catalog_Aktuelles.jsx";
import Slideshow from "../components/Slideshow.jsx";

const SlideshowPage = () => {
  const { name, project, slideshow } = useParams();

  const [projectName, setProjectName] = useState("portfolio");

  useEffect(() => {
    // const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    if (project in catalog && slideshow === "slideshow") {
      setProjectName(project);
    }
  }, [name, project]);

  return (
    <>
      <Slideshow images={catalog[`${projectName}`].images} />
    </>
  );
};

export default SlideshowPage;
