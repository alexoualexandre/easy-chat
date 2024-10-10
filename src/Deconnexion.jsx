import Cookies from "js-cookie";

function Deconnexion() {
  const env = import.meta.env;
  fetch(
    `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/deconnexion/${Cookies.get("auth")}`
  );
  Cookies.remove("auth");
  window.location.href = "/";
}

export default Deconnexion;
