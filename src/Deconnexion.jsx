import Cookies from "js-cookie";

function Deconnexion() {
  const env = import.meta.env;

  fetch(
    `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/modify-process-alert-mail-prevent`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: Cookies.get("auth"),
      }),
    }
  ).then((rep) => rep.json());

  fetch(
    `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/update-present`,

    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: 0, m: Cookies.get("auth") }),
    }
  )
    .then((response) => response.json())
    .then(() => {
      fetch(
        `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/deconnexion/${Cookies.get("auth")}`
      ).then((response) => {
        response.json();
        Cookies.remove("auth");
        window.location.href = "/";
      });
    });
}

export default Deconnexion;
