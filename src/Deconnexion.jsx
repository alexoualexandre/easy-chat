import Cookies from "js-cookie";

function Deconnexion() {
  const env = import.meta.env;
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
  fetch(
    `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/deconnexion/${Cookies.get("auth")}`
  );
  Cookies.remove("auth");
  window.location.href = "/";
}

export default Deconnexion;
