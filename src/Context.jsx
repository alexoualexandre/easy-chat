import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const Context = createContext();

export function Provider({ children }) {
  const [texte, setTexte] = useState("bonjour");

  return (
    <Context.Provider value={{ texte, setTexte }}>{children}</Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.object,
};
export const MyContext = () => useContext(Context);
