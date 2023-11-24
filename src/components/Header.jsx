import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div>Titel</div>
      <span>
        <Link to="/menue">Burger</Link>
      </span>
    </div>
  );
};

export default Header;
