import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const Context = createContext();

export function Provider({ children }) {
  const [burgerHome, setBurgerHome] = useState(false);
  const [burgerMember, setBurgerMember] = useState(false);
  const [filter, setFilter] = useState(false);
  const [responseUser, setResponseUser] = useState();

  return (
    <Context.Provider
      value={{
        burgerHome,
        setBurgerHome,
        burgerMember,
        setBurgerMember,
        filter,
        setFilter,
        responseUser,
        setResponseUser,
      }}
    >
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.object,
};
export const MyContext = () => useContext(Context);
