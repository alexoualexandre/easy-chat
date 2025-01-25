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
    closeAlbum,
    setCloseAlbum,
    sonAlbum,
    setSonAlbum,
    setFrequence,
    setOption,
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

  const [position, setPosition] = useState(1);
  const [next, setNext] = useState(0);

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
      `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/update-present`,

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
      `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/user-selected/${params.get("dest")}`
    )
      .then((response) => response.json())
      .then((response) => {
        setResponseServer(response);
      });
  }, [userMessage]);

  useEffect(() => {
    fetch(
      `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/son-album/${params.get("dest")}`
    )
      .then((response) => response.json())
      .then((response) => {
        setSonAlbum(response);
      });
  }, [params.get("dest")]);

  const subMessage = (e) => {
    e.preventDefault();

    fetch(
      `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/user-selected/${params.get("dest")}`
    )
      .then((response) => response.json())
      .then((response) => {
        if (changeTxt.message.length > 0 && changeTxt.message !== " ") {
          fetch(
            `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/add-message`,
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

          fetch(
            `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/select-total-message/${Auth}`
          )
            .then((response) => response.json())
            .then((response) => {
              fetch(
                `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/update-total-message`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    user: Auth,
                    maj: parseInt(response[0].total_message, 10),
                  }),
                }
              ).then((response) => response.json());
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
      {closeAlbum && (
        <div className="son-album">
          <button
            className="close-album"
            type="button"
            onClick={() => {
              setCloseAlbum(false);
              setNext(0);
              setPosition(1);
            }}
          >
            ×
          </button>

          <p className="nombre-de-photo">
            {sonAlbum &&
              `${sonAlbum.length > 0 ? position : 0} / ${sonAlbum.length}`}
          </p>
          <article className="article-son-album">
            <button
              className="prev-article-son-album"
              type="button"
              onClick={() => {
                if (next > 1) {
                  setNext(next - 99.99 / sonAlbum.length);
                  setPosition(position - 1);
                }
              }}
            >
              &#x3008;
            </button>
            <button
              className="next-article-son-album"
              type="button"
              onClick={() => {
                if (
                  Math.ceil(next + 100 / sonAlbum.length) < 99.99 &&
                  sonAlbum.length > 1
                ) {
                  setNext(next + 100 / sonAlbum.length);
                  setPosition(position + 1);
                }
              }}
            >
              &#x27E9;
            </button>
            <ul
              className="ul-article-son-album"
              style={{
                width: `${sonAlbum.length}00%`,
                transform: `translate(-${next}%)`,
                transition: "transform 0.5s",
              }}
            >
              {sonAlbum.map((elem, index) => (
                <li key={index} className="li-article-son-album">
                  <img
                    src={`${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/upload/${elem.photo}`}
                    alt="no-picture"
                    className="img-li-article-son-album"
                  />
                </li>
              ))}
            </ul>
          </article>
        </div>
      )}
      <div className={divMessage ? "div-message" : "div-message-none"}>
        {!myAlbum && !filter && !blockNewMessage && (
          <div className="option-user-selected">
            <button
              type="button"
              className="button-option-user-selected"
              onClick={() => {
                setCloseAlbum(true);
                setFrequence(false);
                setOption(false);
              }}
            >
              photos / {sonAlbum && sonAlbum.length}
            </button>
            <button
              type="button"
              className="button-option-user-selected"
              onClick={() => {
                setFrequence(true);
                setOption(false);
              }}
            >
              fréquences
            </button>
            <button
              type="button"
              className="button-option-user-selected"
              onClick={() => {
                setOption(true);
              }}
            >
              options
            </button>
          </div>
        )}

        <div className="resum-user">
          <img
            src={`${responseServer && responseServer[0].img === "logo.png" ? responseServer && responseServer[0].img : `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/upload/${responseServer && responseServer[0].img}`}`}
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
