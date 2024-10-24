import { useEffect, useState } from "react";
import { MyContext } from "./Context";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

function NewMessage() {
  const Auth = Cookies.get("auth");
  const {
    setBlockNewMessage,
    setUl,
    setDivMessage,
    setUserMessage,
    setAnimationUserSelected,
    setAnimationTxtUserSelected,
    setFilter,
  } = MyContext();
  const env = import.meta.env;
  const [dataNewMessage, setDataNewMessage] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(
        `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/get-new-message/${Auth}`
      )
        .then((response) => response.json())
        .then((response) => {
          const tableauUnique = response.reduce((acc, objet) => {
            if (!acc.some((item) => item.exp === objet.exp)) {
              acc.push(objet);
            }
            return acc;
          }, []);
          setDataNewMessage(tableauUnique);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, [dataNewMessage, Auth, env.VITE_API_URL, env.VITE_API_SERVER_PORT]);

  const request = (exp) => {
    fetch(
      `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/update-count-message/${exp}`
    );
  };

  const update = (u)=>{
    fetch(
      `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/update-present/${u}/${Auth}`
    );
  }

  return (
    <section className="new-message">
      <button
        type="button"
        className="button-x-new-message"
        onClick={() => {
          setBlockNewMessage(false);
        }}
      >
        ×
      </button>
      <ul className="ul-new-message">
        {dataNewMessage &&
          dataNewMessage.map((elem, index) => (
            <li key={index} className="li-new-message">
              <article className="article-new-message">
                <Link to={`/home?dest=${elem.exp}`}>
                  <button
                    type="button"
                    className="button-new-message-user-selected"
                    onClick={() => {
                      setBlockNewMessage(false);
                      if (window.innerWidth < 1024) {
                        setUl(false);
                        setDivMessage(true);
                        setUserMessage(elem.exp);
                        setAnimationUserSelected(true);
                        setAnimationTxtUserSelected(true);
                        setBlockNewMessage(false);
                        request(elem.exp);
                        update(elem.exp);
                      } else {
                        setFilter(false);
                        setDivMessage(true);
                        setUserMessage(elem.exp);
                        setAnimationUserSelected(true);
                        setAnimationTxtUserSelected(true);
                        setBlockNewMessage(false);
                        request;
                        update(elem.exp);
                      }
                    }}
                  ></button>
                </Link>
                <img
                  src={
                    elem.img === "logo.png"
                      ? "logo.png"
                      : `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/upload/${elem.img}`
                  }
                  alt="img user"
                  className="img-article-new-message"
                />
                <div className="info-user-new-message">
                  <p className="p-user-new-message">
                    &nbsp;{elem.pseudo}
                    <br />
                    &nbsp;{`${elem.age} ans`}
                    <br />
                    &nbsp;
                    {elem.dep < 10
                      ? `Département : 0${elem.dep}`
                      : `Département : ${elem.dep}`}
                    <br />
                    &nbsp;
                    {elem.inline === 1 ? (
                      <span style={{ color: "green" }}>En ligne</span>
                    ) : (
                      <span style={{ color: "red" }}>Hors ligne</span>
                    )}
                    <br />
                    &nbsp;<p className="text-overflow">&nbsp;{elem.message}</p>
                  </p>
                </div>
              </article>
            </li>
          ))}
      </ul>
    </section>
  );
}

export default NewMessage;
