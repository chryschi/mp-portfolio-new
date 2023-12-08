import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Header = () => {
  const { name, project, slideshow } = useParams();
  const [currentPage, setCurrentPage] = useState();

  const mainPageTitle =
    name === "innenarchitektur"
      ? "Innenarchitektur"
      : name === "grafikdesign"
      ? "Grafikdesign"
      : name === "architektur"
      ? "Architektur"
      : name === "kontakt"
      ? "Kontakt"
      : name === "menue"
      ? "Menü"
      : name === "uebermich"
      ? "Über mich"
      : name === "aktuelles"
      ? "Aktuelles"
      : "";

  const projectTitles = {
    "project-biberach": "Biberach HEy Hey 2017",
    portfolio: "MPR Portfolio",
  };

  useEffect(() => {
    if (name !== "menue") {
      let currentUrl = "/" + name;
      if (project !== undefined) {
        currentUrl += "/" + project;
      }
      console.log(currentUrl);
      setCurrentPage(currentUrl);
    }
  }, [name, project]);

  return (
    <header>
      {project === undefined ? (
        <h1>{mainPageTitle}</h1>
      ) : project !== undefined && slideshow === undefined ? (
        <div>
          <h1 id="project-title">{projectTitles[project]}</h1>
          <Link to={`/${name}`}>
            <span className="material-symbols-outlined">close</span>
          </Link>
        </div>
      ) : (
        ""
      )}
      <Link
        to={
          name === "menue" ||
          slideshow === "slideshow" ||
          slideshow === "projektbeschreibung"
            ? currentPage
            : "/menue"
        }
      >
        <span className="material-symbols-outlined">
          {name === "menue" ||
          slideshow === "slideshow" ||
          slideshow === "projektbeschreibung"
            ? "close"
            : "menu"}
        </span>
      </Link>
    </header>
  );
};

export default Header;
