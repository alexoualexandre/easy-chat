import { useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { MyContext } from "./Context";

function Ajax() {
  if (!Cookies.get("auth")) window.location.href = "/";
  const env = import.meta.env;
  const { data, setData, count } = MyContext();
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
                      border: "2px solid #4295cc",
                      padding: "0.5em",
                      position: "relative",
                      left: "13%",
                      marginTop: "0.5em",
                      borderRadius: "0.5em",
                    }
                  : {
                      width: "80%",
                      border: "2px solid #ff114f",
                      padding: "0.5em",
                      position: "relative",
                      left: "0%",
                      marginTop: "0.5em",
                      borderRadius: "0.5em",
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
