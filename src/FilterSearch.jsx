import Cookies from "js-cookie";
import { useState } from "react";
import { MyContext } from "./Context";

function FilterSearch() {
  const [number, setNumber] = useState("");
  const [form, setForm] = useState({
    search: { homme: "homme", femme: "femme" },
    min: "18",
    max: "100",
    inline: { on: "0", off: "1" },
    dep: { local: "01" },
  });
  const {
    setResponseUser,
    classFilterSearch,
    setClassFilterSearch,
    filter,
    setFilter,
    setDivMessage,
    setUl,
  } = MyContext();

  const Auth = Cookies.get("auth");

  const submitSearch = (e) => {
    const env = import.meta.env;
    e.preventDefault();

    fetch(`http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/recherche`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => {
        setNumber(data.filter((elem) => elem.id != Auth).length);
        if (data.filter((elem) => elem.id != Auth).length > 0) {
          setResponseUser(data.filter((elem) => elem.id != Auth));
        }
      });
  };

  const changeForm = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <section className={classFilterSearch}>
      <form method="POST" onSubmit={submitSearch}>
        <div className="div-input-checkbox">
          <h4 className="h4-search">Je recherche</h4>
          <label htmlFor="inpt-checkbox-search-men" className="label-search">
            homme
          </label>
          <input
            type="radio"
            name="search"
            value="homme"
            id="inpt-checkbox-search-men"
            onChange={changeForm}
          />
          <label htmlFor="inpt-checkbox-search-woman" className="label-search">
            femme
          </label>
          <input
            type="radio"
            name="search"
            value="femme"
            id="inpt-checkbox-search-woman"
            onChange={changeForm}
          />
        </div>
        <div className="div-input-checkbox">
          <div className="result-age">
            <p>{form.min} ans</p>
            <p>{form.max} ans</p>
          </div>
          <label htmlFor="inpt-range-min">de</label>
          <input
            type="range"
            name="min"
            id="inpt-range-min"
            min="18"
            value={form.min}
            onChange={changeForm}
          />
          <label htmlFor="inpt-range-max">à</label>
          <input
            type="range"
            name="max"
            id="inpt-range-max"
            min="18"
            value={form.max}
            onChange={changeForm}
          />
        </div>
        <div className="div-input-checkbox">
          <h4 className="h4-search">En ligne</h4>
          <label htmlFor="inpt-inline-yes" className="label-search">
            oui
          </label>
          <input
            type="radio"
            name="inline"
            value="1"
            id="inpt-inline-yes"
            onChange={changeForm}
          />
          <label htmlFor="inpt-inline-no" className="label-search">
            non
          </label>
          <input
            type="radio"
            name="inline"
            value="0"
            id="inpt-inline-no"
            onChange={changeForm}
          />
        </div>

        <div className="div-input-checkbox-dep">
          <h4 className="h4-search">Département</h4>
          <select
            name="dep"
            className="select-dep-search"
            onChange={changeForm}
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
        </div>
        <p className="number-result">
          {number !== "" && `${number} résultats`}
        </p>
        <button
          type="submit"
          value="rechercher"
          className="submit-search"
          onClick={() => {
            if (window.innerWidth < 1024) {
              setTimeout(() => {
                setClassFilterSearch("filter-search-off");
                setDivMessage(false);
                setUl(true);
              }, 1000);

              setTimeout(() => {
                setFilter(!filter);

                setClassFilterSearch("filter-search");
              }, 1200);
            }
          }}
        >
          rechercher
        </button>
      </form>
    </section>
  );
}

export default FilterSearch;
