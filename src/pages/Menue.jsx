import { Link } from "react-router-dom";

const Menue = () => {
  return (
    <div>
      <ul>
        <Link to="/aktuelles">Aktuelles</Link>
        <Link to="/architektur">Architektur</Link>
        <Link to="/innenarchitektur">Innenarchitektur</Link>
        <Link to="/grafikdesign">Grafikdesign</Link>
        <Link to="/kontakt">Kontakt</Link>
        <Link to="/uebermich">Über mich</Link>
      </ul>
    </div>
  );
};

export default Menue;
