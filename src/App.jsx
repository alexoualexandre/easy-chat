// import { useEffect, useState } from "react";
import Header from "./Header.jsx";
import BurgerHome from "./BurgerHome.jsx";
import { MyContext } from "./Context.jsx";
import { useEffect, useState } from "react";

function App() {
  //	fonction de MAJ auto bdd
  //  const [data, setData] = useState();
  const { burgerHome } = MyContext();
  const [number, setNumber] = useState(0);
  const table = [
    "_e33c4ccd-453f-44c9-8b41-c27d0eeb24c8.jfif",
    "img-homme-chelou.png",
    "img-femme-chelou.png",
    "dalle.webp",
  ];

  useEffect(() => {
    const interval = setInterval(function () {
      if (number < 3) {
        setNumber(number + 1);
      } else setNumber(0);
    }, 5000);
    return () => clearInterval(interval);
  }, [number]);

  //  useEffect(() => {

  // const interval=setInterval(

  // function(){
  //    fetch("http://77.37.51.45:3311/user")
  //      .then((response) => response)
  //      .then((resp) => resp.json())
  //      .then((rep) => {
  //	console.log(rep);
  //        setData(rep[0]);
  //      }
  //  )
  // },
  // 10000);
  // return ()=>clearInterval(interval)
  // }, []);

  return (
    <body className="body-home-page">
      <Header />

      {burgerHome && <BurgerHome />}
      {!burgerHome && (
        <>
          <ul className="animate-logo">
            <li className="li-animate-logo1">
              <img src="pied.png" alt="no-picture" className="img-pied" />
            </li>
            <li className="li-animate-logo2">
              <img src="homme.png" alt="no-picture" className="img-pied" />
            </li>
            <li className="li-animate-logo3">
              <img src="femme.png" alt="no-picture" className="img-pied" />
            </li>
          </ul>
          {window.innerWidth >= 1024 && (
            <div className="image-container">
              <img src={table[number]} alt="Image avec dégradé" />
            </div>
          )}
        </>
      )}
    </body>
  );
}

export default App;
