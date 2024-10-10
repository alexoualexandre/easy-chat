import Cookies from "js-cookie";
import { useEffect } from "react";
// import { Link } from "react-router-dom";
import HeaderMember from "./HeaderMember.jsx";
import MenuMember from "./MenuMember.jsx";
import { MyContext } from "./Context.jsx";
import FilterSearch from "./FilterSearch.jsx";

function Home() {
  const Auth = Cookies.get("auth");
  const env = import.meta.env;
  const { burgerMember, filter, setFilter, responseUser, setResponseUser } =
    MyContext();

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
              }}
            >
              voir filtres <span className="chevron"> &#x27A7; </span>
            </button>
            <div className="the-users">
              {filter && <FilterSearch />}

              <ul className="ul-article">
                {responseUser &&
                  responseUser.map((user, index) => (
                    <li key={index} className="li-article">
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
                  ))}
              </ul>
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
