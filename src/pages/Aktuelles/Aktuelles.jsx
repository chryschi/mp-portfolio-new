import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from "../../components/Carousel";
import { catalog } from "./catalog_Aktuelles.jsx";

const Aktuelles = () => {
  const { project } = useParams();

  const [projectName, setProjectName] = useState("Aktuelles");

  useEffect(() => {
    if (project === undefined) {
      setProjectName("Aktuelles");
    } else if (projectName in catalog) {
      setProjectName(project);
    }
  }, [project]);

  return (
    <>
      <Carousel images={catalog[`${projectName}`].images} />
    </>
  );
};

export default Aktuelles;
