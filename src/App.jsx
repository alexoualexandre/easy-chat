import Header from "./Header.jsx";
import BurgerHome from "./BurgerHome.jsx";
import { MyContext } from "./Context.jsx";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Contact from "./Contact.jsx";

function App() {
  if (Cookies.get("auth")) {
    window.location.href = "/home";
  }

  const { burgerHome, gotToContact } = MyContext();
  const [number, setNumber] = useState(0);
  const table = [
    "femme-black.jpg",
    "pierre-26-35-ans.png",
    "sophie-26-35-ans.jpg",
    "homme-blanc.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(function () {
      if (number < 3) {
        setNumber(number + 1);
      } else setNumber(0);
    }, 5000);
    return () => clearInterval(interval);
  }, [number]);

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
          {gotToContact && <Contact />}
        </>
      )}
    </body>
  );
}

export default App;
