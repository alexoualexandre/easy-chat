import { Link } from "react-router-dom";
import { MyContext } from "./Context";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function MyProfil() {
  if (!Cookies.get("auth")) {
    window.location.href = "/";
  }
  const { setBurgerMember } = MyContext();
  const [f, setFile] = useState(null);
  const [newName, setNewName] = useState(null);
  const [resultName, setResultName] = useState("");
  const [updateData, setUpdateData] = useState({
    password: "",
    dep: "",
    mail: "",
    search: "",
    description: "",
    user: "",
  });
  const [colorSubmit, setColorSubmit] = useState("sub-modification");
  const [valider, setValider] = useState("");
  const environment = import.meta.env;

  const formData = new FormData();
  formData.append("file", f);
  const handleSubmit = (e) => {
    e.preventDefault();
    const env = import.meta.env;
    fetch(
      `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/upload-file`,
      { method: "POST", body: formData }
    )
      .then((response) => response)
      .then((resp) => resp.json())
      .then((r) => {
        setNewName(r);
        setTimeout(() => {
          setNewName(null);
          setFile(null);
        }, 100);
      });
  };

  useEffect(() => {
    const env = import.meta.env;
    fetch(
      `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/select-user-id/${Cookies.get("auth")}`
    )
      .then((response) => response)
      .then((resp) => resp.json())
      .then((r) => {
        setResultName(r[0]);
        setUpdateData({
          password: r[0].password,
          dep: r[0].dep,
          mail: r[0].mail,
          search: r[0].search,
          description: r[0].description,
          user: Cookies.get("auth"),
        });
      });
  }, [newName]);

  const regexMail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const regexPass = /[!@#$%^&*(),.?:{}|<>]/;

  const changeInfo = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setColorSubmit("sub-modification-on");
  };

  useEffect(() => {
    if (newName) {
      const env = import.meta.env;
      fetch(
        `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/change-img-profil/${newName.nvName}/${Cookies.get("auth")}`
      );
    }
  }, [newName]);

  const handleSubmitForm = (e) => {
    const env = import.meta.env;
    e.preventDefault();
    if (colorSubmit === "sub-modification-on") {
      if (
        regexMail.test(updateData.mail) &&
        (regexPass.test(updateData.password) ||
          updateData.password.charAt(0) === "$")
      ) {
        fetch(`http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });
      } else {
        setValider("");
      }
    }
    if (regexMail.test(updateData.mail) && regexPass.test(updateData.password))
      setColorSubmit("sub-modification");
  };

  const date = resultName && resultName.created_at.split("T")[0].split("-");
  return (
    <div className="profil-member">
      <Link to={`/home`}>
        <button
          type="button"
          className="x"
          onClick={() => {
            setBurgerMember(false);
          }}
        >
          ×
        </button>
      </Link>
      <div className="my-profil">
        <section className="section-my-profil-picture">
          <p className="h3-photo-profil">{resultName && resultName.pseudo}</p>
          <img
            src={
              resultName !== "" &&
              `http://${environment.VITE_API_URL}:${environment.VITE_API_SERVER_PORT}/upload/${resultName.img}`
            }
            className="img-profil-mini"
            alt="no-picture"
          />

          <form
            action=""
            method="PUT"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            id="form-modify"
          >
            <input
              type="file"
              name="file"
              accept="image/*"
              id="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <label htmlFor="file" id="label-file">
              <img
                src="/1727599060349.png"
                alt="no-picture"
                className="app-photo"
              />
            </label>
            <button
              type="submit"
              className={f !== null ? "" : "sub-file-none"}
              id="submit"
            >
              <img
                src="/1727609609978.png"
                className="submit-change"
                alt="soumettre"
              />
            </button>
          </form>
        </section>

        <section className="section-my-profil-info">
          <p className="date-inscrition">
            Membre depuis le {`${date[2]}-${date[1]}-${date[0]}`}{" "}
          </p>
          <form method="POST" action="" onSubmit={handleSubmitForm}>
            <label
              htmlFor="modify-password"
              className="date-inscrition"
              id="modify-password-txt"
              style={{ cursor: "pointer" }}
            >
              Mot de passe{" "}
              {colorSubmit === "sub-modification-on" &&
                !regexPass.test(updateData.password) && (
                  <span style={{ color: "red" }}>×</span>
                )}
            </label>
            <input
              type="password"
              name="password"
              id="modify-password"
              onChange={changeInfo}
            />
            <div className="select-option-dep">
              <label
                htmlFor="select-dep-modify"
                className="date-inscrition"
                style={{ cursor: "pointer" }}
              >
                Département
              </label>

              <select
                name="dep"
                className="select-dep-modify"
                id="select-dep-modify"
                onChange={changeInfo}
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
              <div className="select-option-dep">
                <label
                  htmlFor="modify-mail"
                  className="date-inscrition"
                  style={{ cursor: "pointer" }}
                >
                  Email{" "}
                  {colorSubmit === "sub-modification-on" &&
                    !regexMail.test(updateData.mail) && (
                      <span style={{ color: "red" }}>×</span>
                    )}
                </label>
                <input
                  type="text"
                  name="mail"
                  id="modify-mail"
                  onChange={changeInfo}
                  value={updateData.mail}
                />
                <div className="select-option-dep">
                  <label
                    htmlFor="modify-search"
                    className="date-inscrition"
                    style={{ cursor: "pointer" }}
                  >
                    Recherche
                  </label>
                  <select
                    name="search"
                    className="select-search-modify"
                    id="select-search-modify"
                    onChange={changeInfo}
                  >
                    <option>choisir</option>
                    <option>homme</option>
                    <option>femme</option>
                  </select>
                  <div className="select-option-dep">
                    <label
                      htmlFor="modify-description"
                      className="date-inscrition"
                      style={{ cursor: "pointer" }}
                      id="description"
                    >
                      Description
                    </label>
                    <textarea
                      name="description"
                      className="area-description"
                      id="modify-description"
                      onChange={changeInfo}
                      value={updateData.description}
                    ></textarea>
                    <button
                      type="submit"
                      className={
                        regexMail.test(updateData.mail) &&
                        regexPass.test(updateData.password)
                          ? colorSubmit
                          : "sub-modification"
                      }
                      onClick={() => {
                        if (colorSubmit === "sub-modification-on")
                          setValider("modify-ok");
                      }}
                    >
                      enregistrer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {valider === "modify-ok" &&
            regexMail.test(updateData.mail) &&
            (regexPass.test(updateData.password) ||
              updateData.password.charAt(0) === "$") && (
              <div className={valider}>
                <h2 className="modification-enregistrer">
                  modification enregistré !
                </h2>
                <Link to="/home">
                  <button
                    type="button"
                    className="return-home"
                    onClick={() => {
                      setBurgerMember(false);
                    }}
                  >
                    ok
                  </button>
                </Link>
              </div>
            )}
        </section>
      </div>
    </div>
  );
}

export default MyProfil;
