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
      <span>
        <Link to="/menue">Burger</Link>
      </span>
    </div>
  );
};

export default Header;
