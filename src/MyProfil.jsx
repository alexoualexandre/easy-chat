import { Link } from "react-router-dom";
import { MyContext } from "./Context";

function MyProfil() {
  const { setBurgerMember } = MyContext();
  return (
    <div className="profil-member">
      <Link to="/home">
        <button
          type="button"
          className="x"
          onClick={() => {
            setBurgerMember(false);
          }}
        >
          ×
        </button>
      </Link>
      <div className="my-profil">
        <section className="section-my-profil-picture"></section>

        <section className="section-my-profil-picture"></section>
      </div>
    </div>
  );
}

export default MyProfil;
