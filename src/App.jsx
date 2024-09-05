import { Link } from "react-router-dom";
import "./App.css";
import Logo from "./components/Logo";

function App() {
  return (
    <>
      <main className="logo-container">
        <Link to="aktuelles">
          <Logo fillColor="white" />
        </Link>
      </main>
    </>
  );
}

export default App;
