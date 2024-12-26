import { Link } from "react-router-dom";
import { MyContext } from "./Context";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

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

  const [desinscription, setDesinscription] = useState(false);
  const [respUser, setRespUser] = useState();

  useEffect(() => {
    fetch(
      `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/select-user-id/${Cookies.get("auth")}`
    )
      .then((response) => response.json())
      .then((response) => {
        setRespUser(response[0]);
        console.log(response[0]);
      });
  }, []);

  const suppAccount = () => {
    fetch(
      `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/my-photos/${Cookies.get("auth")}`
    )
      .then((response) => response.json())
      .then((response) => {
        for (let i = 0; i < response.length; i++) {
          fetch(
            `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/remove-img-album`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ img: response[i].photo }),
            }
          ).then((response) => response.json());
        }
        if (respUser) {
          fetch(
            `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/mail-desinscription`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                pseudo: respUser.pseudo,
                mail: respUser.mail,
              }),
            }
          ).then((response) => response.status);
        }

        fetch(
          `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/remove-message`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user: Cookies.get("auth") }),
          }
        ).then((response) => response.json());
        Cookies.remove("auth");
        window.location.href = "/";
      });
  };

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
          <button
            type="button"
            className="button-li-menu-member"
            onClick={() => {
              setDesinscription(true);
            }}
          >
            Désinscription
          </button>
        </li>
        {desinscription && (
          <div className="popup-desinscription">
            Êtes-vous sûr de vouloir supprimer définitivement votre compte ?
            <div className="button-suppr">
              <button type="button" className="suppr-def" onClick={suppAccount}>
                oui
              </button>
              <button
                type="button"
                className="suppr-def"
                onClick={() => {
                  setDesinscription(false);
                }}
              >
                non
              </button>
            </div>
          </div>
        )}

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
