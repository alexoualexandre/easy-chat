import { Link } from "react-router-dom";
import { MyContext } from "./Context";
import Cookies from "js-cookie";

function MenuMember() {
  const env = import.meta.env;
  const {
    setBurgerMember,
    setMyAlbum,
    setFilter,
    setDivMessage,
    divMessage,
    setFrequence,
  } = MyContext();

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
              if (window.innerWidth >= 1024) {
                fetch(
                  `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/update-present`,

                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      user: 0,
                      m: Cookies.get("auth"),
                    }),
                  }
                ).then((response) => response.json());
              }

              if (window.innerWidth < 1024) {
                setDivMessage(false);
              }

              setBurgerMember(false);
              setFilter(false);
              setMyAlbum(true);
              setFrequence(false);
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
