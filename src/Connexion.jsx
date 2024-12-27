import { Link } from "react-router-dom";
import { useState } from "react";
import Cookie from "js-cookie";

function Connexion() {
  const [change, setChange] = useState({
    pseudo: "",
    password: "",
  });

  const [pseudoAndEmail, setPseudoAndEmail] = useState({
    pseudo: "",
    bool: false,
    id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChange((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const env = import.meta.env;
  const handleSubmit = (event) => {
    event.preventDefault();
    if (change.pseudo !== "" && change.password !== "") {
      fetch(
        `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/connexion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(change),
        }
      )
        .then((response) => response)
        .then((resp) => resp.json())
        .then((r) => {
          setPseudoAndEmail(r);
        });
    }
  };

  if (pseudoAndEmail.bool === true) {
    Cookie.set("auth", pseudoAndEmail.id, { expires: 365 * 100, path: "/" });
    fetch(
      `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/add-calendar`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: Cookie.get("auth"),
        }),
      }
    ).then((response) => response.json());
    fetch(
      `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/update-inline/${Cookie.get("auth")}`
    ).then((response) => response.json());

    setTimeout(() => {
      window.location.href = "/home" ;
    }, 200);
  }

  return (
    <>
      {window.innerWidth >= 1024 && (
        <ul className="animate-logo" style={{ zIndex: 1 }}>
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
      )}

      <div className="div-connexion">
        <Link to="/">
          <button className="x">×</button>
        </Link>

        <div className="block-connexion">
          <form method="post" onSubmit={handleSubmit}>
            <h3 className="pseudo-connexion">
              Pseudo
              {pseudoAndEmail.pseudo === "introuvable" && (
                <span style={{ color: "red" }}>&nbsp; &nbsp;introuvable</span>
              )}
            </h3>
            <input
              type="text"
              name="pseudo"
              className="input-pseudo-connexion"
              onChange={handleChange}
            />

            <h3 className="mdp-connexion">
              Mot de passe{" "}
              {pseudoAndEmail.bool === false &&
                pseudoAndEmail.pseudo !== "" &&
                pseudoAndEmail.pseudo !== "introuvable" && (
                  <span style={{ color: "red" }}>&nbsp;invalide</span>
                )}
            </h3>
            <input
              type="password"
              name="password"
              className="input-password-connexion"
              onChange={handleChange}
            />

            <input
              type="submit"
              value="me connecter"
              className={
                change.pseudo !== "" && change.password !== ""
                  ? "me-connecter-on"
                  : "me-connecter-off"
              }
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Connexion;
