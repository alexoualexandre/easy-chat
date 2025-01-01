import { useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { MyContext } from "./Context";

function Ajax() {
  if (!Cookies.get("auth")) window.location.href = "/";
  const { data, setData, count } = MyContext();
  // Ajouter un état initial pour éviter le premier `popstate`
  history.pushState(null, null, window.location.pathname);

  window.addEventListener("popstate", function (event) {
    event.preventDefault();

    // Remettre un nouvel état pour rester sur la même URL
    history.pushState(null, null, window.location.pathname);
  });

  const env = import.meta.env;

  const location = useLocation();
  const getSearchParams = () => {
    return new URLSearchParams(location.search);
  };
  const params = getSearchParams();

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(
        `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/get-message/${params.get("id")}/${Cookies.get("auth")}`
      )
        .then((response) => response.json())
        .then((response) => {
          setData(response);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);

  const bottomRef = useRef(null);
  const block = useRef();
  useEffect(() => {
    const enf = block.current.lastElementChild;
    bottomRef.current = enf;
  }, [data]);

  useEffect(() => {
    if (data) {
      try {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      } catch (err) {
        console.error(err.message);
      }
    }
  }, [data]);
  return (
    <>
      <div className="block-ajax" ref={block}>
        {data &&
          data.map((elem) => (
            <p
              key={elem.id}
              style={
                elem.sex === "homme"
                  ? {
                      width: "80%",
                      maxHeight: "8em",
                      border: "4px solid #4295cc",
                      padding: "0.5em",
                      position: "relative",
                      left: "13%",
                      marginTop: "0.5em",
                      borderRadius: "0.5em",
                      textOverflow: "hidden",
                      wordWrap: "break-word",
                      overflowY: "scroll",
                    }
                  : {
                      width: "80%",
                      maxHeight: "8em",
                      overflowY: "scroll",
                      border: "4px solid #ff114f",
                      padding: "0.5em",
                      position: "relative",
                      left: "0%",
                      marginTop: "0.5em",
                      borderRadius: "0.5em",
                      textOverflow: "hidden",
                      wordWrap: "break-word",
                    }
              }
            >
              {elem.message}
            </p>
          ))}
      </div>
    </>
  );
}

export default Ajax;
