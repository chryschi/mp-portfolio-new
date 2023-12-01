import { Link, useParams } from "react-router-dom";

const Header = () => {
  const { name, project } = useParams();

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

  return (
    <div>
      {project === undefined ? (
        title
      ) : (
        <>
          {projectTitles[project]}
          <span className="material-symbols-outlined">close</span>
        </>
      )}
      <Link to="/menue">
        <span className="material-symbols-outlined">
          {name === "menue" ? "close" : "menu"}
        </span>
      </Link>
    </div>
  );
};

export default Header;
