import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Registration from './Registration';
import Home from './Home.jsx'
import { Provider } from "./Context.jsx";
import "./index.css";
import Deconnexion from "./Deconnexion.jsx";
import Connexion from "./Connexion.jsx";

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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
