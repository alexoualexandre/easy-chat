import { MyContext } from "./Context.jsx";

function Header() {
  const { setBurgerHome } = MyContext();
  return (
    <header className="header">
      <img src="logo.png" className="logo" />
      <div className="menu">
        <div className="burger"></div>
        <div className="burger"></div>
        <div className="burger"></div>
        <button
          className="click-burger"
          onClick={() => {
            setBurgerHome(true);
          }}
        >
          .
        </button>
      </div>
      <button className="button-inscription">S&apos;inscrire</button>
    </header>
  );
}

export default Header;
