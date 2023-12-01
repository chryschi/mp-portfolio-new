import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Header = () => {
  const { name, project } = useParams();
  const [currentPage, setCurrentPage] = useState();

  const title =
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
    <div>
      {project === undefined ? (
        title
      ) : (
        <>
          {projectTitles[project]}
          <Link to={`/${name}`}>
            <span className="material-symbols-outlined">close</span>
          </Link>
        </>
      )}
      <Link to={name === "menue" ? currentPage : "/menue"}>
        <span className="material-symbols-outlined">
          {name === "menue" ? "close" : "menu"}
        </span>
      </Link>
    </div>
  );
};

export default Header;
