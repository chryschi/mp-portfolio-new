import { Link } from "react-router-dom";

const Menue = () => {
  return (
    <main>
      <ul>
        <Link to="/aktuelles">Aktuelles</Link>
        <Link to="/architektur">Architektur</Link>
        <Link to="/innenarchitektur">Innenarchitektur</Link>
        <Link to="/grafikdesign">Grafikdesign</Link>
        <Link to="/kontakt">Kontakt</Link>
        <Link to="/uebermich">Über mich</Link>
      </ul>
    </main>
  );
};

export default Menue;
