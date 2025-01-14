import Cookies from "js-cookie";
import { useEffect } from "react";
import HeaderMember from "./HeaderMember.jsx";
import MenuMember from "./MenuMember.jsx";
import { MyContext } from "./Context.jsx";
import FilterSearch from "./FilterSearch.jsx";
import Message from "./Message.jsx";
import { Link, useLocation } from "react-router-dom";
import NewMessage from "./NewMessage.jsx";
import MyAlbum from "./MyAlbum.jsx";
import Frequence from "./Frequence.jsx";
import Option from "./Option.jsx";

function Home() {
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
    userMessage,
    setUserMessage,
    setAnimationUserSelected,
    setAnimationTxtUserSelected,
    memorySearch,
    blockNewMessage,
    setBlockNewMessage,
    voirFiltre,
    setVoirFiltre,
    myAlbum,
    setMyAlbum,
    frequence,
    setFrequence,
    option,
    setOption,
  } = MyContext();

  window.addEventListener("load", function () {
    history.pushState(null, null, location.href);
    window.onpopstate = function (e) {
      e.preventDefault();
      history.go(1);
    };
  });

  const location = useLocation();
  const getSearchParams = () => {
    return new URLSearchParams(location.search);
  };
  const params = getSearchParams();

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

  const updatePresent = (u) => {
    fetch(
      `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/update-present`,

      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: u, m: Cookies.get("auth") }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });
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
              className={voirFiltre}
              onClick={() => {
                // if (window.innerWidth >= 1024) {
                fetch(
                  `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/update-present`,

                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      user: !filter ? 0 : params.get("dest"),
                      m: Cookies.get("auth"),
                    }),
                  }
                ).then((response) => response.json());
                // }
                setFrequence(false);
                if (window.innerWidth >= 1024) {
                  if (myAlbum) {
                    setFilter(true);
                    setMyAlbum(false);
                  }
                  if (userMessage) {
                    setFilter(!filter);
                    setBlockNewMessage(false);
                  }
                } else {
                  setFilter(!filter);
                  setBlockNewMessage(false);
                }
                setOption(false);
              }}
            >
              voir filtres <span className="chevron"> &#x27A7; </span>
              <span className="number-result-search">
                {responseUser && responseUser.length} résultats
              </span>
            </button>
            <div className="your-album"></div>
            {!blockNewMessage && (
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
            )}

            <div className="the-users">
              {option && <Option />}

              {filter && <FilterSearch />}
              {frequence && <Frequence />}
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
                              setVoirFiltre("voir-filtres-none");
                            }

                            updatePresent(user.id);
                            setFilter(false);
                            setDivMessage(true);
                            setUserMessage(user.id);
                            setAnimationUserSelected(true);
                            setAnimationTxtUserSelected(true);
                            setBlockNewMessage(false);
                            setMyAlbum(false);
                            setFrequence(false);
                            setOption(false);
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
              {myAlbum ? <MyAlbum /> : ""}
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
