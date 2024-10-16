import { MyContext } from "./Context";

function Message() {
  const { divMessage, setDivMessage, setUl } = MyContext();
  const fctStyle = () => {
    setDivMessage(!divMessage);
    setUl(true);
  };

  return (
    <>
      <div className={divMessage ? "div-message" : "div-message-none"}>
        salut
      </div>
      <button className="button-div-message" type="button" onClick={fctStyle}>
        click
      </button>
    </>
  );
}

export default Message;
