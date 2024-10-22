import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const Context = createContext();

export function Provider({ children }) {
  const [burgerHome, setBurgerHome] = useState(false);
  const [burgerMember, setBurgerMember] = useState(false);
  const [filter, setFilter] = useState(false);
  const [responseUser, setResponseUser] = useState();
  const [classFilterSearch, setClassFilterSearch] = useState("filter-search");
  const [ul, setUl] = useState(true);
  const [divMessage, setDivMessage] = useState(false);
  const [userMessage, setUserMessage] = useState();
  const [animationUserSelected, setAnimationUserSelected] = useState(false);
  const [animationTxtUserSelected, setAnimationTxtUserSelected] =
    useState(false);
  const [form, setForm] = useState({
    search: { homme: "homme", femme: "femme" },
    min: "18",
    max: "100",
    inline: { on: "0", off: "1" },
    dep: { local: "01" },
  });
  const [memorySearch, setMemorySearch] = useState({
    search: { homme: "homme", femme: "femme" },
    min: "18",
    max: "100",
    inline: { on: "0", off: "1" },
    dep: { local: "01" },
  });
  const [blockNewMessage, setBlockNewMessage] = useState(false);

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
        classFilterSearch,
        setClassFilterSearch,
        ul,
        setUl,
        divMessage,
        setDivMessage,
        userMessage,
        setUserMessage,
        animationUserSelected,
        setAnimationUserSelected,
        animationTxtUserSelected,
        setAnimationTxtUserSelected,
        form,
        setForm,
        memorySearch,
        setMemorySearch,
        blockNewMessage,
        setBlockNewMessage,
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
