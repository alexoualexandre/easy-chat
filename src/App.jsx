import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch('http://localhost:3311/user')
      .then((response) => response)
      .then((resp) => resp.json())
      .then((rep) => {
        setData(rep[0]);
      });
  }, []);

  return <>{data && data.pseudo}</>;
}

export default App;
