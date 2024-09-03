import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ menuVisible, visibilityHandler }) => {
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
      : name === "uebermich"
      ? "Über mich"
      : name === "aktuelles"
      ? "Aktuelles"
      : "";

  const projectTitles = {
    "projekt-architektur-2": "Biberach Schülerwohnheim",
    portfolio: "MPR Portfolio",
  };

  useEffect(() => {
    let currentUrl = "/" + name;
    if (project !== undefined) {
      currentUrl += "/" + project;
    }

    setCurrentPage(currentUrl);
  }, [name, project]);

  return (
    <header>
      <div>
        {project === undefined ? (
          <h1>{mainPageTitle}</h1>
        ) : project !== undefined && slideshow === undefined ? (
          <>
            <h1 className="project-title">{projectTitles[project]}</h1>
            <Link to={`/${name}`}>
              <span className="material-symbols-outlined close-project-icon">
                close
              </span>
            </Link>
          </>
        ) : (
          ""
        )}
      </div>
      {slideshow === "slideshow" || slideshow === "projektbeschreibung" ? (
        <Link to={currentPage}>
          <span className={"material-symbols-outlined"}>{"close"}</span>
        </Link>
      ) : (
        <button onClick={visibilityHandler}>
          <span
            className={
              "material-symbols-outlined " + (menuVisible ? "" : "burger-menu")
            }
          >
            {menuVisible ? "close" : "menu"}
          </span>
        </button>
      )}
    </header>
  );
};

export default Header;

Header.propTypes = {
  menuVisible: PropTypes.bool,
  visibilityHandler: PropTypes.func,
};
