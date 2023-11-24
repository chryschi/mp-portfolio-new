import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Link to="aktuelles">
        <h1>MP</h1>
      </Link>
      <p>Click to reach my website!</p>
    </>
  );
}

export default App;
