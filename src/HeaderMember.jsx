import { useEffect, useState } from "react";
import { MyContext } from "./Context.jsx";
import Cookies from "js-cookie";

function HeaderMember() {
  const Auth = Cookies.get("auth");
  const env = import.meta.env;
  const { setBurgerMember, setBlockNewMessage } = MyContext();
  const [count, setCount] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(
        `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/count-message/${Auth}`
      )
        .then((response) => response.json())
        .then((response) => {
          const countValue = response[0]["COUNT(*)"];

          setCount(countValue);
        });
    }, 400);
    return () => clearInterval(interval);
  }, [Auth, env.VITE_API_URL, env.VITE_API_SERVER_PORT]);

  const nvMessage = () => {
    setBlockNewMessage(true);
  };

  return (
    <div className="header-member">
      <h1 className="easy-chat">Easy-chat</h1>
      {count ? (
        <span className="alert-number-message">
          {" "}
          <img
            src="icons8-message-64.png"
            alt="message"
            className="icon-new-message"
          />{" "}
          {count}{" "}
          <button
            type="button"
            className="button-new-message"
            onClick={nvMessage}
          ></button>
        </span>
      ) : (
        ""
      )}
      <div className="menu">
        <div className="burger"></div>
        <div className="burger"></div>
        <div className="burger"></div>

        <button
          className="click-burger"
          onClick={() => {
            setBurgerMember(true);
          }}
        >
          .
        </button>
      </div>
    </div>
  );
}

export default HeaderMember;
