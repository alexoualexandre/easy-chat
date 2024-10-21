import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

function Ajax() {
  if (!Cookies.get("auth")) window.location.href = "/";
  const env = import.meta.env;
  const [data, setData] = useState(false);
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
    }, 300);
    return () => clearInterval(interval);
  }, []);
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
        {data && data.map((elem) => <p key={elem.id}>{elem.message}</p>)}
      </div>
    </>
  );
}

export default Ajax;
