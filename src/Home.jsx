import Cookies from "js-cookie";
import { Link } from "react-router-dom";

function Home() {
  const Auth = Cookies.get("auth");
  if (Auth) {
    return (
      <>
        Connexion {Auth}{" "}
        <Link to="/deconnexion">
          <button type="button">deco</button>
        </Link>
      </>
    );
  } else {
    window.location.href = "/";
  }
}

export default Home;
