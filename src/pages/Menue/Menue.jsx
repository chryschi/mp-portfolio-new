import { Link } from "react-router-dom";
import "./Menue.css";
import PropTypes from "prop-types";

const Menue = ({ menuVisible, visibilityHandler }) => {
  const pageList = [
    { url: "/aktuelles", title: "Aktuelles" },
    { url: "/architektur", title: "Architektur" },
    { url: "/innenarchitektur", title: "Innenarchitektur" },
    { url: "/grafikdesign", title: "Grafikdesign" },
    { url: "/kontakt", title: "Kontakt" },
    { url: "/uebermich", title: "Über mich" },
  ];

  return (
    <div
      className="menu-container transition-container"
      style={{
        visibility: menuVisible ? "visible" : "hidden",
        opacity: menuVisible ? "1" : "0",
      }}
    >
      <nav>
        <ul>
          {pageList.map((page, idx) => (
            <li key={idx}>
              <Link to={page.url} onClick={visibilityHandler}>
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Menue;

Menue.propTypes = {
  menuVisible: PropTypes.bool,
  visibilityHandler: PropTypes.func,
};
