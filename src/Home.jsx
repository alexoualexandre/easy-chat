import Cookies from "js-cookie";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import HeaderMember from "./HeaderMember.jsx";
import MenuMember from "./MenuMember.jsx";
import { MyContext } from "./Context.jsx";

function Home() {
  const Auth = Cookies.get("auth");
  const [responseUser, setResponseUser] = useState();
  const env = import.meta.env;
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
    const { burgerMember } = MyContext();
    return (
      <>
        <HeaderMember />
        {burgerMember && <MenuMember />}
        {!burgerMember && (
          <>
            <button type="button" className="voir-filtres">
              voir filtres <span className="chevron"> &#x27A7; </span>
            </button>
            <div className="the-users">
              <ul className="ul-article">
                {responseUser &&
                  responseUser.map((user, index) => (
                    <li key={index} className="li-article">
                      <article className="article-user">
                        <img
                          src="/femme.webp"
                          className="img-article-user"
                          alt="no-picture"
                        />
                        <p className="article-pseudo">
                          {user.pseudo.length >= 10
                            ? `${user.pseudo.substring(0, 10)}...`
                            : user.pseudo}{" "}
                          {user.dep < 10 ? `(0${user.dep})` : `(${user.dep})`}
                          <br />
                          {`${user.age} ans`}
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
