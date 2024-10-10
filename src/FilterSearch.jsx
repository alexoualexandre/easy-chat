import { useState } from "react";

function FilterSearch() {
  // const [min,setMin] = useState(50);
  // const [max,setMax] = useState(50);
  const [form, setForm] = useState({
    search: "",
    min: 18,
    max: 100,
  });
  const changeForm = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log(form);
  return (
    <section className="filter-search">
      <div className="div-input-checkbox">
        <h4 className="h4-search">Je recherche</h4>
        <label htmlFor="inpt-checkbox-search-men">homme</label>
        <input
          type="radio"
          name="search"
          value="homme"
          id="inpt-checkbox-search-men"
          onChange={changeForm}
        />
        <label htmlFor="inpt-checkbox-search-woman">femme</label>
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
    </section>
  );
}

export default FilterSearch;
