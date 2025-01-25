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
      fetch(`${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/select-user-id/${Auth}`)
        .then((response) => response.json())
        .then((response) => {
          if (response[0].inline === 0) {
            alert(
              "Vous avez été déconnecté pour inactivité de plus d'une heure , veuillez vous reconnecter."
            );

            window.location.href = "/deconnexion";
          }
        });
  }, 1500);
  return () => clearInterval(interval);
}
maj();

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
