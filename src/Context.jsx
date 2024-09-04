import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const Context = createContext();

export function Provider({ children }) {

  const [burgerHome,setBurgerHome] = useState(false);
  return (
    <Context.Provider value={{burgerHome, setBurgerHome }}>{children}</Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.object,
};
export const MyContext = () => useContext(Context);
