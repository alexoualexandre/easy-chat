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
    dep: "choisir",
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
    console.info(form);
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
  const selectDep = useRef(null);

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
      form.pseudo.length <= 20 &&
      pseudoExist &&
      !pseudoExist[0] &&
      form.dep !== "choisir"
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
              <h3 className="dep">Département</h3>
              <select
                name="dep"
                onChange={formData}
                ref={selectDep}
                className="select-dep"
              >
                <option>choisir</option>
                <option>01-Ain</option>
                <option>02-Aisne</option>
                <option>03-Allier</option>
                <option>04-Alpes-de-Haute-Provence</option>
                <option>05-Hautes-Alpes</option>
                <option>06-Alpes-Maritimes</option>
                <option>07-Ardèche</option>
                <option>08-Ardennes</option>
                <option>09-Ariège</option>
                <option>10-Aube</option>
                <option>11-Aude</option>
                <option>12-Aveyron</option>
                <option>13-Bouches-du-Rhône</option>
                <option>14-Calvados</option>
                <option>15-Cantal</option>
                <option>16-Charente</option>
                <option>17-Charente-Maritime</option>
                <option>18-Cher</option>
                <option>19-Corrèze</option>
                <option>21-Côte-D&apos;or</option>
                <option>22-Côtes-d&apos;Armor</option>
                <option>23-Creuse</option>
                <option>24-Dordogne</option>
                <option>25-Doubs</option>
                <option>26-Drôme</option>
                <option>27-Eure</option>
                <option>28-Eure-et-Loir</option>
                <option>29-Finistère</option>
                <option>30-Gard</option>
                <option>31-Haute-Garonne</option>
                <option>32-Gers</option>
                <option>33-Gironde</option>
                <option>34-Hérault</option>
                <option>35-Ille-et-Vilaine</option>
                <option>36-Indre</option>
                <option>37-Indre-et-Loire</option>
                <option>38-Isère</option>
                <option>39-Jura</option>
                <option>40-Landes</option>
                <option>41-Loir-et-Cher</option>
                <option>42-Loire</option>
                <option>43-Haute-Loire</option>
                <option>44-Loire-Atlantique</option>
                <option>45-Loiret</option>
                <option>46-Lot</option>
                <option>47-Lot-et-Garonne</option>
                <option>48-Lozère</option>
                <option>49-Maine-et-Loire</option>
                <option>50-Manche</option>
                <option>51-Marne</option>
                <option>52-Haute-Marne</option>
                <option>53-Mayenne</option>
                <option>54-Meurthe-et-Moselle</option>
                <option>55-Meuse</option>
                <option>56-Morbihan</option>
                <option>57-Moselle</option>
                <option>58-Nièvre</option>
                <option>59-Nord</option>
                <option>60-Oise</option>
                <option>61-Orne</option>
                <option>62-Pas-de-Calais</option>
                <option>63-Puy-de-Dôme</option>
                <option>64-Pyrénées-Atlantiques</option>
                <option>65-Hautes-Pyrénées</option>
                <option>66-Pyrénées-Orientales</option>
                <option>67-Bas-Rhin</option>
                <option>68-Haut-Rhin</option>
                <option>69-Rhône</option>
                <option>70-Haute-Saône</option>
                <option>71-Saône-et-Loire</option>
                <option>72-Sarthe</option>
                <option>73-Savoie</option>
                <option>74-Haute-Savoie</option>
                <option>75-Paris</option>
                <option>76-Seine-Maritime</option>
                <option>77-Seine-et-Marne</option>
                <option>78-Yvelines</option>
                <option>79-Deux-Sèvres</option>
                <option>80-Somme</option>
                <option>81-Tarn</option>
                <option>82-Tarn-et-Garonne</option>
                <option>83-var</option>
                <option>84-Vaucluse</option>
                <option>85-Vendée</option>
                <option>86-Vienne</option>
                <option>87-Haute-Vienne</option>
                <option>88-Vosges</option>
                <option>89-Yonne</option>
                <option>90-Territoire de Belfort</option>
                <option>91-Essonne</option>
                <option>92-Hauts-de-Seine</option>
                <option>93-Seine-Saint-Denis</option>
                <option>94-Val-de-Marne</option>
                <option>95-Val-d&apos;Oise</option>
              </select>

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
                placeholder="4 min / 20 max"
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
                  form.pseudo.length <= 20 &&
                  pseudoExist &&
                  !pseudoExist[0] &&
                  selectDep.current.value !== "choisir"
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
