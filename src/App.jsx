import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Link } from "react-router-dom";
import viteLogo from "/vite.svg";
import { MyContext } from "./Context";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const { texte, setTexte } = MyContext();
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            setCount((count) => count + 1);
            setTexte("aurevoir");
          }}
        >
          count is {count}
        </button>
        <Link to="/teste">
          <p>dev {texte}</p>
        </Link>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
