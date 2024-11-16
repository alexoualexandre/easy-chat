import Cookies from "js-cookie";
import { useEffect } from "react";
import { MyContext } from "./Context";
import { useLocation } from "react-router-dom";

function CountInterval() {
  const { setCount } = MyContext();

  const location = useLocation();
  const getSearchParams = () => {
    return new URLSearchParams(location.search);
  };
  const params = getSearchParams();

  useEffect(() => {
    const Auth = Cookies.get("auth");
    const env = import.meta.env;
    const interval = setInterval(() => {
      fetch(
        `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/count-message/${Auth}`
      )
        .then((response) => response.json())
        .then((response) => {
          setCount(response["COUNT(*)"]);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, [params]);
}

export default CountInterval;
