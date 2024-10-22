import Cookies from "js-cookie";
import { useEffect } from "react";
import HeaderMember from "./HeaderMember.jsx";
import MenuMember from "./MenuMember.jsx";
import { MyContext } from "./Context.jsx";
import FilterSearch from "./FilterSearch.jsx";
import Message from "./Message.jsx";
import { Link } from "react-router-dom";
import NewMessage from "./NewMessage.jsx";

function Home() {
  // const location = useLocation();
  // const getSearchParams = () => {
  //   return new URLSearchParams(location.search);
  // };
  // const params = getSearchParams();
  const env = import.meta.env;
  const Auth = Cookies.get("auth");
  const {
    burgerMember,
    filter,
    setFilter,
    responseUser,
    setResponseUser,
    ul,
    setUl,
    setDivMessage,
    divMessage,
    setUserMessage,
    setAnimationUserSelected,
    setAnimationTxtUserSelected,
    memorySearch,
    blockNewMessage,
    setBlockNewMessage,
  } = MyContext();

  useEffect(() => {
    fetch(
      `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/select-all-user`
    )
      .then((response) => response)
      .then((resp) => resp.json())
      .then((r) => {
        setResponseUser(r.filter((elem) => elem.id != Auth));
      });
  }, []);
  const refresh = () => {
    const search = typeof memorySearch.search;
    const inline = typeof memorySearch.inline;
    const dep = typeof memorySearch.dep;
    const min = memorySearch.min;
    const max = memorySearch.max;
    if (
      search !== "object" ||
      inline !== "object" ||
      dep !== "object" ||
      min !== "18" ||
      max !== "100"
    ) {
      fetch(
        `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/recherche`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(memorySearch),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.filter((elem) => elem.id != Auth).length > 0) {
            setResponseUser(data.filter((elem) => elem.id != Auth));
          }
        });
    } else {
      fetch(
        `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/select-all-user`
      )
        .then((response) => response)
        .then((resp) => resp.json())
        .then((r) => {
          setResponseUser(r.filter((elem) => elem.id != Auth));
        });
    }
  };

  if (Auth) {
    return (
      <>
        <HeaderMember />
        {burgerMember && <MenuMember />}
        {!burgerMember && (
          <>
            <button
              type="button"
              className="voir-filtres"
              onClick={() => {
                setFilter(!filter);
                setBlockNewMessage(false);
              }}
            >
              voir filtres <span className="chevron"> &#x27A7; </span>
            </button>
            <div className="refresh">
              <button
                type="button"
                className="button-refresh"
                onClick={refresh}
              >
                {""}
              </button>
              <img src="icons8-rafraîchir-32.png" alt="button refresh" />
            </div>
            <div className="the-users">
              {filter && <FilterSearch />}
              {blockNewMessage && <NewMessage />}
              <ul className={ul ? "ul-article" : "ul-article-none"}>
                {responseUser &&
                  responseUser.map((user, index) => (
                    <Link to={`/home?dest=${user.id}`} key={index}>
                      <li className="li-article" key={index}>
                        <button
                          type="button"
                          className="button-li-user"
                          onContextMenu={(e) => {
                            e.preventDefault();
                          }}
                          onClick={() => {
                            if (window.innerWidth < 1024) {
                              setUl(false);
                              setDivMessage(true);
                              setUserMessage(user.id);
                              setAnimationUserSelected(true);
                              setAnimationTxtUserSelected(true);
                            } else {
                              setFilter(false);
                              setDivMessage(true);
                              setUserMessage(user.id);
                              setAnimationUserSelected(true);
                              setAnimationTxtUserSelected(true);
                            }
                          }}
                        ></button>
                        <article className="article-user">
                          <img
                            src={`http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/upload/${user.img}`}
                            className="img-article-user"
                            alt="no-picture"
                          />
                          <p
                            className={
                              user.sex === "homme"
                                ? "article-pseudo-men"
                                : "article-pseudo-woman"
                            }
                          >
                            {user.pseudo.length >= 10
                              ? `${user.pseudo.substring(0, 10)}...`
                              : user.pseudo}{" "}
                            {user.dep < 10 ? `(0${user.dep})` : `(${user.dep})`}
                            <br />
                            {`${user.age} ans`}
                            <span
                              className={
                                user.inline === 1 ? "inline-on" : "inline-off"
                              }
                            >
                              {""}
                            </span>
                          </p>
                        </article>
                      </li>
                    </Link>
                  ))}
              </ul>
              {window.innerWidth < 1024 && !ul ? (
                <Message />
              ) : (
                divMessage && <Message />
              )}
            </div>
          </>
        )}
      </>
    );
  } else {
    window.location.href = "/";
  }
}

export default Home;
