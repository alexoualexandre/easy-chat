import { Link } from 'react-router-dom';
import { MyContext } from "./Context.jsx";

function Header() {
  const { setBurgerHome } = MyContext();
  const sizeScreen = window.innerWidth;
  return (
    <header className="header">
      {sizeScreen < 1024 && (
        <>
        <h1 className="easy-chat">
	Easy-chat
	</h1>

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
        </>
      )}

      <button className="button-inscription">
	<Link to="/registration" style={{textDecoration: "none",color: "white"}}>
	S&apos;inscrire
	</Link>
	</button>
        
	 {sizeScreen >= 1024 && (
        <>
          <h1 className="easy-chat">Easy-chat</h1>
          <button className="button-connexion">Se connecter</button>
        </>
      )}
    </header>
  );
}

export default Header;
