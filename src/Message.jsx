import { Link, useLocation } from "react-router-dom";
import { MyContext } from "./Context";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function Message() {
  const {
    divMessage,
    setDivMessage,
    setUl,
    userMessage,
    animationUserSelected,
    setAnimationUserSelected,
    animationTxtUserSelected,
    setAnimationTxtUserSelected,
    responseServer,
    setResponseServer,
    setVoirFiltre,
    myAlbum,
    filter,
    blockNewMessage,
  } = MyContext();

  setTimeout(() => {
    setAnimationUserSelected(false);
    setAnimationTxtUserSelected(false);
  }, 1000);

  const location = useLocation();
  const getSearchParams = () => {
    return new URLSearchParams(location.search);
  };
  const params = getSearchParams();
  const env = import.meta.env;
  const Auth = Cookies.get("auth");

  const [changeTxt, setChangeTxt] = useState({
    exp: Auth,
    dest: params.get("dest"),
    message: "",
    addition: parseInt(Auth, 10) + parseInt(params.get("dest")),
  });

  useEffect(() => {
    setChangeTxt({
      exp: Auth,
      dest: params.get("dest"),
      message: "",
      addition: parseInt(Auth, 10) + parseInt(params.get("dest")),
    });
  }, [userMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChangeTxt((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fctStyle = () => {
    setDivMessage(!divMessage);
    setUl(true);
    setVoirFiltre("voir-filtres");

    fetch(
      `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/update-present`,

      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: 0, m: Cookies.get("auth") }),
      }
    ).then((response) => response.json());
  };
  useEffect(() => {
    fetch(
      `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/user-selected/${params.get("dest")}`
    )
      .then((response) => response.json())
      .then((response) => {
        setResponseServer(response);
      });
  }, [userMessage]);

  const subMessage = (e) => {
    e.preventDefault();

    fetch(
      `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/user-selected/${params.get("dest")}`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response[0]);
        if (changeTxt.message.length > 0 && changeTxt.message !== " ") {
          fetch(
            `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/add-message`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                changeTxt: changeTxt,
                connect: response[0].present,
                m: Cookies.get("auth"),
              }),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            });
          setChangeTxt({
            exp: Auth,
            dest: params.get("dest"),
            message: "",
            addition: parseInt(Auth, 10) + parseInt(params.get("dest")),
          });
        }
      });
  };

  return (
    <>
      <div className={divMessage ? "div-message" : "div-message-none"}>
        {!myAlbum && !filter && !blockNewMessage && (
          <div className="option-user-selected">
            <button type="button" className="button-option-user-selected">
              album
            </button>
            <button type="button" className="button-option-user-selected">
              fréquence
            </button>
          </div>
        )}

        <div className="resum-user">
          <img
            src={`${responseServer && responseServer[0].img === "logo.png" ? responseServer && responseServer[0].img : `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/upload/${responseServer && responseServer[0].img}`}`}
            alt="no-picture"
            className={
              animationUserSelected
                ? "img-user-selected-animation"
                : "img-user-selected"
            }
            onContextMenu={(e) => {
              e.preventDefault();
            }}
          />
          <p
            className={
              animationTxtUserSelected
                ? "info-user-selected-animation"
                : "info-user-selected"
            }
          >
            {responseServer && responseServer[0].pseudo}
            <br />
            {`${responseServer && responseServer[0].age} ans`}
            <br />
            {`Cherche : ${responseServer && responseServer[0].search}`}
            <br />
            {responseServer && responseServer[0].inline === 0 ? (
              <span style={{ color: "red" }}>Hors ligne</span>
            ) : (
              <span style={{ color: "green" }}>En ligne</span>
            )}
          </p>
          <h2 className="h2-description">Description :</h2>
          <p className="lorem-description">
            {responseServer && responseServer[0].description}
          </p>

          {window.innerWidth < 1024 && (
            <>
              <Link to="/home">
                <button
                  className="button-div-message"
                  type="button"
                  onClick={fctStyle}
                >
                  ×
                </button>
              </Link>
            </>
          )}
        </div>
        <section
          className={
            animationTxtUserSelected
              ? "container-message-animation"
              : "container-message"
          }
        >
          <iframe
            className="ajax"
            src={`/ajax?id=${params.get("dest")}`}
          ></iframe>
          <form method="post" className="form-message" onSubmit={subMessage}>
            <textarea
              name="message"
              className="area-message"
              onChange={handleChange}
              value={changeTxt.message}
              placeholder="écrivez votre message ..."
            />
            <button type="submit" className="submit-txt-message">
              <img src="send.png" alt="envoyé" className="img-send" />
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default Message;
