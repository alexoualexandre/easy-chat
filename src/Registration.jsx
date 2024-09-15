/* eslint-disable no-useless-escape */
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";

function Registration() {
  const env = import.meta.env;
  const [form, setForm] = useState({
    ip: "",
    sex: "",
    search: "",
    age: "choisir",
    pseudo: "",
    mail: "",
    password: "",
  });
  const [pseudoExist, setPseudoExist] = useState();
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      form.ip = data.ip;
    });

  const formData = (e) => {
    const { name, value } = e.target;
    setForm((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
    if (name === "pseudo") {
      fetch(
        `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/get-user/${value}`
      )
        .then((response) => response)
        .then((resp) => resp.json())
        .then((r) => {
          console.info(r);
          setPseudoExist(r);
        });
    }
  };
  const [selected, setSelected] = useState("");
  const [selectedSearch, setSelectedSearch] = useState("");
  const [next, setNext] = useState(true);

  const regexMail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const regexPass = /[!@#$%^&*(),.?:{}|<>]/;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.mail.length > 0 && form.password.length > 0) {
      if (regexMail.test(form.mail) && regexPass.test(form.password)) {
        fetch(
          `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/insert-user`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        )
          .then((response) => response)
          .then((resp) => resp.json())
          .then((r) => {
            Cookie.set("auth", r.nb_user);
            window.location.href = "/home";
          });
      }
    }
  };

  const ul = useRef(null);
  const select = useRef(null);

  const nextCarrousel = (number) => {
    if (form.sex.length > 0 && form.search.length > 0 && next) {
      ul.current.style.transform = `translateX(-${number}%)`;
      ul.current.style.transition = "transform 0.7s";
      setNext(false);
    }
    if (
      form.age.length > 0 &&
      form.pseudo.length > 0 &&
      form.age !== "choisir" &&
      form.pseudo.length >= 4 &&
      pseudoExist &&
      !pseudoExist[0]
    ) {
      ul.current.style.transform = `translateX(-${number}%)`;
      ul.current.style.transition = "transform 0.7s";
    }
  };
  useEffect(() => {
    const createOption = () => {
      for (let i = 18; i < 100; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = `${i} ans`;
        select.current.appendChild(option);
      }
    };

    createOption();
  }, []);

  return (
    <section className="body-home-page">
      <button className="x">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          ×
        </Link>
      </button>
      <form method="post" onSubmit={handleSubmit}>
        <div className="carrousel-registration">
          <ul className="ul-carrousel-registration" ref={ul}>
            <li className="li-carrousel-registration">
              <h3 className="i-am">Je suis</h3>

              <div className="li-sex">
                <button
                  className="button-sex"
                  onClick={() => {
                    setSelected("selectedHomme");
                  }}
                  id={selected === "selectedHomme" && selected}
                >
                  un homme
                  <input
                    type="radio"
                    name="sex"
                    value="homme"
                    className="radio-sex"
                    onChange={formData}
                  />
                </button>
                <button
                  className="button-sex"
                  onClick={() => {
                    setSelected("selectedFemme");
                  }}
                  id={selected === "selectedFemme" && selected}
                >
                  une femme
                  <input
                    type="radio"
                    name="sex"
                    value="femme"
                    className="radio-sex"
                    onChange={formData}
                  />
                </button>
              </div>

              <h3 className="i-search">Je recherche</h3>

              <div className="li-search">
                <button
                  className="button-sex"
                  onClick={() => {
                    setSelectedSearch("selectedSearchHomme");
                  }}
                  id={
                    selectedSearch === "selectedSearchHomme" && selectedSearch
                  }
                >
                  un homme
                  <input
                    type="radio"
                    name="search"
                    value="homme"
                    className="radio-sex"
                    onChange={formData}
                  />
                </button>
                <button
                  className="button-sex"
                  onClick={() => {
                    setSelectedSearch("selectedSearchFemme");
                  }}
                  id={
                    selectedSearch === "selectedSearchFemme" && selectedSearch
                  }
                >
                  une femme
                  <input
                    type="radio"
                    name="search"
                    value="femme"
                    className="radio-sex"
                    onChange={formData}
                  />
                </button>
              </div>
              <button
                type="button"
                className={
                  form.sex.length > 0 && form.search.length
                    ? "next-inscription-on"
                    : "next-inscription-off"
                }
                onClick={() => {
                  nextCarrousel("33.333333333333333333333");
                }}
              >
                suivant
              </button>
            </li>
            <li className="li-carrousel-registration">
              <h3 className="age">Âge</h3>
              <select
                name="age"
                onChange={formData}
                ref={select}
                className="select-option"
              >
                <option>choisir</option>
              </select>
              <h3 className="pseudo">
                Pseudo
                {pseudoExist && pseudoExist[0] && (
                  <span style={{ color: "red" }}>
                    &nbsp; &nbsp; pseudo déja utilisé
                  </span>
                )}
              </h3>
              <input
                type="text"
                name="pseudo"
                className="input-pseudo"
                placeholder="4 caractères min"
                onChange={formData}
              />
              <button
                type="button"
                className={
                  form.sex.length > 0 &&
                  form.search.length > 0 &&
                  form.age.length > 0 &&
                  select.current.value !== "choisir" &&
                  form.pseudo.length >= 4 &&
                  pseudoExist &&
                  !pseudoExist[0]
                    ? "next-inscription-on"
                    : "next-inscription-off"
                }
                onClick={() => {
                  nextCarrousel("66.666666666666666666666");
                }}
              >
                suivant
              </button>
            </li>

            <li className="li-carrousel-registration">
              <h3 className="mail">
                Email{" "}
                {!regexMail.test(form.mail) && form.mail.length > 0 ? (
                  <span style={{ color: "red" }}>
                    {" "}
                    &nbsp; &nbsp; email invalide
                  </span>
                ) : (
                  ""
                )}{" "}
              </h3>
              <input
                type="text"
                name="mail"
                className="input-mail"
                onChange={formData}
              />
              <h3 className="h3-password">Mot de passe</h3>
              <input
                type="password"
                name="password"
                className="input-password"
                onChange={formData}
              />
              <div className="validate-password">
                <p>
                  8 caractères{" "}
                  {form.password.length >= 8 ? (
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      &#10003;
                    </span>
                  ) : (
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      &#215;
                    </span>
                  )}
                </p>
                <p>
                  1 majuscule{" "}
                  {/[A-Z]/.test(form.password) ? (
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      &#10003;
                    </span>
                  ) : (
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      &#215;
                    </span>
                  )}
                </p>
                <p>
                  1 chiffre{" "}
                  {/\d/.test(form.password) ? (
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      &#10003;
                    </span>
                  ) : (
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      &#215;
                    </span>
                  )}
                </p>
                <p>
                  1 caractère spécial{" "}
                  {/[!@#$%^&*(),.?:{}|<>]/.test(form.password) ? (
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      &#10003;
                    </span>
                  ) : (
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      &#215;
                    </span>
                  )}
                </p>
              </div>
              <input
                type="submit"
                className={
                  form.mail.length > 0 &&
                  regexMail.test(form.mail) &&
                  form.password.length > 0 &&
                  regexPass.test(form.password)
                    ? "submit-inscription-on"
                    : "submit-inscription-off"
                }
                value="valider"
              />
            </li>
          </ul>
        </div>
      </form>
    </section>
  );
}

export default Registration;
