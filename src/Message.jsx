// import { useLocation } from "react-router-dom";
import { MyContext } from "./Context";
import { useEffect, useState } from "react";

function Message() {
  // const location = useLocation();
  // const getSearchParams = () => {
  //   return new URLSearchParams(location.search);
  // };
  const env = import.meta.env;
  // const params = getSearchParams();
  const [responseServer, setResponseServer] = useState();
  const {
    divMessage,
    setDivMessage,
    setUl,
    userMessage,
    animationUserSelected,
    setAnimationUserSelected,
    animationTxtUserSelected,
    setAnimationTxtUserSelected,
  } = MyContext();
  const fctStyle = () => {
    setDivMessage(!divMessage);
    setUl(true);
  };
  useEffect(() => {
    fetch(
      `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/user-selected/${userMessage}`
    )
      .then((response) => response.json())
      .then((response) => {
        setResponseServer(response);
      });
  }, [userMessage]);
  setTimeout(() => {
    setAnimationUserSelected(false);
    setAnimationTxtUserSelected(false);
  }, 1000);

  responseServer && console.log(responseServer);
  return (
    <>
      <div className={divMessage ? "div-message" : "div-message-none"}>
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
            <button
              className="button-div-message"
              type="button"
              onClick={fctStyle}
            >
              ×
            </button>
          )}
        </div>
        <section className="container-message"></section>
      </div>
    </>
  );
}

export default Message;
