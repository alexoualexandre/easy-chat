// import { Link } from "react-router-dom";
import { MyContext } from "./Context.jsx";

function HeaderMember() {
  const { setBurgerMember } = MyContext();
  return (
    <div className="header-member">
      <h1 className="easy-chat">Easy-chat</h1>

      <div className="menu">
        <div className="burger"></div>
        <div className="burger"></div>
        <div className="burger"></div>

        <button
          className="click-burger"
          onClick={() => {
            setBurgerMember(true);
          }}
        >
          .
        </button>
      </div>
    </div>
  );
}

export default HeaderMember;
