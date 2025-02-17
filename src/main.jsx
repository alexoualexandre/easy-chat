import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Registration from "./Registration";
import Home from "./Home.jsx";
import { Provider } from "./Context.jsx";
import "./index.css";
import Deconnexion from "./Deconnexion.jsx";
import Connexion from "./Connexion.jsx";
import MyProfil from "./MyProfil.jsx";
import NotFound from "./NotFound.jsx";
import Ajax from "./Ajax.jsx";
import Message from "./Message.jsx";
import Cookies from "js-cookie";

function maj() {
  const interval = setInterval(() => {
    const Auth = Cookies.get("auth");
    const env = import.meta.env;
    if (Auth)
      fetch(
        `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/select-user-id/${Auth}`
      )
        .then((response) => response.json())
        .then((response) => {
          if (response[0].inline === 0) {
            alert(
              "Vous êtes déconnecté, veuillez patienter 60 secondes pour vous reconnecter."
            );

            window.location.href = "/deconnexion";
          }
        });
  }, 1500);
  return () => clearInterval(interval);
}
maj();

navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;

    fetch("https://easy-chat.org:3311/location", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ latitude, longitude }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Réponse du serveur :", data))
      .catch((error) => console.error("Erreur :", error));
  },
  (error) => {
    console.error("Erreur de géolocalisation :", error);
  }
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/deconnexion",
    element: <Deconnexion />,
  },
  {
    path: "/connexion",
    element: <Connexion />,
  },
  {
    path: "/profil",
    element: <MyProfil />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/ajax",
    element: <Ajax />,
  },
  {
    path: "/message",
    element: <Message />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
