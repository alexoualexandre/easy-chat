import { useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "./Context";

function App() {
  const [count, setCount] = useState(0);
  const { texte, setTexte } = MyContext();
  return (
    <>
      <button
        onClick={() => {
          setCount((count) => count + 1);
          setTexte("aurevoir");
        }}
        className="button-teste"
      >
        count is {count}
      </button>
      <Link to="/teste">
        <p>dev {texte}</p>
      </Link>
    </>
  );
}

export default App;
