import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function Registration() {
  const [form, setForm] = useState({
    sex: "",
    search: "",
    age: "18",
    pseudo: "",
  });
  const formData = (e) => {
    const { name, value } = e.target;

    setForm((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };
  const [selected, setSelected] = useState("");
  const [selectedSearch, setSelectedSearch] = useState("");
  const [next, setNext] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
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
      form.age.length > 0 &&
      form.pseudo.length >= 4
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
  console.info(form);
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
              <h3 className="pseudo">Pseudo</h3>
              <input
                type="text"
                name="pseudo"
                className="input-pseudo"
                onChange={formData}
              />
              <button
                type="button"
                className={
                  form.sex.length > 0 &&
                  form.search.length > 0 &&
                  form.age.length > 0 &&
                  form.pseudo.length >= 4
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

            <li className="li-carrousel-registration"></li>
          </ul>
        </div>
      </form>
    </section>
  );
}

export default Registration;
