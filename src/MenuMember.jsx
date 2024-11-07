import { Link } from "react-router-dom";
import { MyContext } from "./Context";

function MenuMember() {
  const { setBurgerMember, setMyAlbum, setFilter, setDivMessage, divMessage } =
    MyContext();

  return (
    <div className="menu-member">
      <button
        type="button"
        className="x"
        onClick={() => {
          setBurgerMember(false);
        }}
      >
        ×
      </button>
      <ul className="ul-menu-member">
        <Link to={`/profil`} style={{ textDecoration: "none", color: "white" }}>
          <li className="li-menu-member">Mon profil</li>
        </Link>
        <li className="li-menu-member">
          <button
            type="button"
            className="button-li-menu-member"
            onClick={() => {
              if (window.innerWidth < 1024) {
                setDivMessage(false);
              }

              setBurgerMember(false);
              setFilter(false);
              setMyAlbum(true);
              setDivMessage(divMessage ? true : false);
            }}
          >
            Mon album
          </button>
        </li>
        <li className="li-menu-member">
          <Link
            to="/deconnexion"
            style={{ textDecoration: "none", color: "white" }}
          >
            Deconnexion
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default MenuMember;
