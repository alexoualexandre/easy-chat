import Cookies from "js-cookie";

function Deconnexion() {
  Cookies.remove("auth");
  window.location.href = "/";
}

export default Deconnexion;
