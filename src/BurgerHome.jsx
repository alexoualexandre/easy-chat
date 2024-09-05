import { MyContext } from "./Context.jsx";

function BurgerHome() {
  const { setBurgerHome } = MyContext();
  return (
    <>
      <section className="burger-home">
        <button
          className="x"
          onClick={() => {
            setBurgerHome(false);
          }}
        >
          ×
        </button>
      </section>
      <section className="ins-co">
        <button type="button" className="ins">
          S&apos;inscrire
        </button>
        <button type="button" className="ins" id="se-connecter">
          Se connecter
        </button>
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
          <li className="li-burger-home">Contact</li>
        </ul>
      </section>
    </>
  );
}

export default BurgerHome;
