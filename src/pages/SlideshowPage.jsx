import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { catalogueProjects as projects } from "./catalogues.jsx";
import Slideshow from "../components/slideshowComponents/Slideshow/Slideshow.jsx";

const SlideshowPage = () => {
  const { name, project, slideshow } = useParams();

  const [projectName, setProjectName] = useState("portfolio");
  const projectImages = projects[`${projectName}`].images;

  useEffect(() => {
    // const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    if (project in projects) {
      setProjectName(project);
    }
  }, [name, project]);

  return (
    <main>
      {slideshow === "slideshow" ? (
        <Slideshow images={projectImages.slice(1)} />
      ) : (
        <Slideshow images={projectImages.slice(0, 1)} />
      )}
    </main>
  );
};

export default SlideshowPage;
