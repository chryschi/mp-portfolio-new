import { Link } from "react-router-dom";
import "./Menue.css";

const Menue = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/aktuelles">Aktuelles</Link>
        </li>
        <li>
          <Link to="/architektur">Architektur</Link>
        </li>
        <li>
          <Link to="/innenarchitektur">Innenarchitektur</Link>
        </li>
        <li>
          <Link to="/grafikdesign">Grafikdesign</Link>
        </li>
        <li>
          <Link to="/kontakt">Kontakt</Link>
        </li>
        <li>
          <Link to="/uebermich">Über mich</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menue;
