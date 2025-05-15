import { MyContext } from "./Context.jsx";
import { Link } from "react-router-dom";
import Contact from "./Contact.jsx";

function BurgerHome() {
  const { setBurgerHome, gotToContact, setGoToContact } = MyContext();
  return (
    <>
      <section className="burger-home">
        <button
          className="x"
          onClick={() => {
            setBurgerHome(false);
            setGoToContact(false);
          }}
        >
          ×
        </button>
      </section>
      <section className="ins-co">
        <Link
          to="/registration"
          style={{ textDecoration: "none", color: "white" }}
        >
          <button type="button" className="ins">
            S&apos;inscrire
          </button>
        </Link>
        <Link
          to="/connexion"
          style={{ textDecoration: "none", color: "white" }}
        >
          <button type="button" className="ins" id="se-connecter">
            Se connecter
          </button>
        </Link>
        <ul className="liste-burger-home">
          <li className="li-burger-home">
            <button
              type="button"
              className="return-accueil"
              onClick={() => {
                setBurgerHome(false);
              }}
            >
              Accueil
            </button>
          </li>
          <li className="li-burger-home">
            <button
              type="button"
              className="return-accueil"
              onClick={() => {
                setGoToContact(true);
              }}
            >
              Contact
            </button>
          </li>
        </ul>
        {gotToContact && <Contact />}
      </section>
    </>
  );
}

export default BurgerHome;
