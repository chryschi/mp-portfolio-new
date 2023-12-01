import { Link, useParams } from "react-router-dom";

const Header = () => {
  const { name } = useParams();

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

  return (
    <div>
      {title}

      <Link to="/menue">
        <span className="material-symbols-outlined">
          {name === "menue" ? "close" : "menu"}
        </span>
      </Link>
    </div>
  );
};

export default Header;
