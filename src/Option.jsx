import { useEffect, useState } from "react";
import { MyContext } from "./Context";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

function Option() {
  const { setOption } = MyContext();
  const env = import.meta.env;
  const [check, setcheck] = useState(false);
  const [dataMail, setDataMail] = useState();
  const [click, setClick] = useState(false);

  const location = useLocation();
  const getSearchParams = () => {
    return new URLSearchParams(location.search);
  };
  const params = getSearchParams();

  useEffect(() => {
    fetch(
      `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/get-alert/${Cookies.get("auth")}/${params.get("dest")}`
    )
      .then((response) => response.json())
      .then((response) => {
        setDataMail(response);
        if (response[0]) {
          setcheck(true);
        }
      });
  }, [click]);

  const addAlert = () => {
    if (dataMail && dataMail.length === 0 && !check) {
      fetch(
        `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/add-alert`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_alerted: Cookies.get("auth"),
            user_selected: params.get("dest"),
            open: 1,
          }),
        }
      ).then((response) => response.json());
    } else {
      fetch(
        `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/drop-alert`,

        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_alerted: Cookies.get("auth"),
            user_selected: params.get("dest"),
          }),
        }
      ).then((response) => response.json());
    }
  };

  return (
    <>
      <div className="div-block-option">
        <button
          className="x-option"
          onClick={() => {
            setOption(false);
          }}
        >
          ×
        </button>
        <ul className="ul-option">
          <li className="li-option">
            <input
              type="checkbox"
              name="prevConnection"
              id="prevConnection"
              style={{
                width: "2em",
                height: "2em",
                position: "absolute",
                top: "1em",
                left: "1em",
              }}
              onChange={() => {
                setcheck(!check);
                addAlert();
              }}
              checked={check}
              onClick={() => {
                setClick(!click);
              }}
            />
            <label htmlFor="prevConnection" style={{ marginLeft: "2em" }}>
              Me tenir informée lorsque cet utilisateur se connecte.
            </label>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Option;
