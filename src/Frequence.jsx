import { DateTime } from "luxon";
import { useEffect } from "react";
import { MyContext } from "./Context";
import { useLocation } from "react-router-dom";

function Frequence() {
  const { setFrequence, dateFrequence, setDateFrequence } = MyContext();
  // const [day, setDay] = useState();

  const location = useLocation();
  const getSearchParams = () => {
    return new URLSearchParams(location.search);
  };
  const params = getSearchParams();
  const env = import.meta.env;

  useEffect(() => {
    fetch(
      `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/select-date/${params.get("dest")}`
    )
      .then((response) => response.json())
      .then((response) => {
        setDateFrequence(
          response.reduce((acc, objet) => {
            if (!acc.some((item) => item.event_time === objet.event_time)) {
              acc.push(objet);
            }
            return acc;
          }, [])
        );
      });
  }, []);

  const mercredi =
    dateFrequence &&
    dateFrequence.filter(
      (elem) =>
        DateTime.fromISO(elem.event_time.split("T")[0]).setLocale("fr")
          .weekdayLong === "mercredi"
    );

  return (
    <div className="div-frequence">
      <button
        type="button"
        className="x-frequence"
        onClick={() => {
          setFrequence(false);
        }}
      >
        ×
      </button>
      <table className="table">
        <tr className="tr">
          <td className="td">&nbsp; &nbsp; &nbsp; &nbsp;</td>
          <td className="td">lun</td>
          <td className="td">mar</td>
          <td className="td">mer</td>
          <td className="td">jeu</td>
          <td className="td">ven</td>
          <td className="td">sam</td>
          <td className="td">dim</td>
        </tr>

        <tr className="tr">
          <td className="td">00-02</td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td">
            {mercredi &&
              dateFrequence[dateFrequence.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 3 && <p>ok</p>}
          </td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
        </tr>
        <tr className="tr">
          <td className="td">02-04</td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
        </tr>
        <tr className="tr">
          <td className="td">04-06</td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
        </tr>
        <tr className="tr">
          <td className="td">06-08</td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
        </tr>
        <tr className="tr">
          <td className="td">08-10</td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
        </tr>
        <tr className="tr">
          <td className="td">10-12</td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
        </tr>
        <tr className="tr">
          <td className="td">12-14</td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
        </tr>
        <tr className="tr">
          <td className="td">14-16</td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
        </tr>
        <tr className="tr">
          <td className="td">16-18</td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
        </tr>
        <tr className="tr">
          <td className="td">18-20</td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
        </tr>
        <tr className="tr">
          <td className="td">20-22</td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td">
            {mercredi &&
              parseInt(
                mercredi[mercredi.length - 1].event_time
                  .split("T")[1]
                  .split(".")[0]
                  .split(":")[0],
                10
              ) >= 20 &&
              parseInt(
                mercredi[mercredi.length - 1].event_time
                  .split("T")[1]
                  .split(".")[0]
                  .split(":")[0],
                10
              ) < 22 && <p>ok</p>}
          </td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
        </tr>
        <tr className="tr">
          <td className="td">22-00</td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td">
            {/* {mercredi &&
              dateFrequence[dateFrequence.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 20 && 
             <p>ok</p>} */}
          </td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
          <td className="td"></td>
        </tr>
      </table>
    </div>
  );
}

export default Frequence;
