import { MyContext } from "./Context.jsx";
import CountInterval from "./CountInterval.jsx";

function HeaderMember() {
  const { setBurgerMember, setBlockNewMessage, count, setMyAlbum } =
    MyContext();

  const nvMessage = () => {
    setBlockNewMessage(true);
    setMyAlbum(false);
  };

  return (
    <div className="header-member">
      <CountInterval />

      <h1 className="easy-chat">Easy-chat</h1>
      {count ? (
        <span className="alert-number-message">
          {" "}
          <img
            src="icons8-message-64.png"
            alt="message"
            className="icon-new-message"
          />{" "}
          {count}{" "}
          <button
            type="button"
            className="button-new-message"
            onClick={nvMessage}
          ></button>
        </span>
      ) : (
        ""
      )}
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
