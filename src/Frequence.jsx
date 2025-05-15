import { DateTime } from "luxon";
import { useEffect } from "react";
import { MyContext } from "./Context";
import { useLocation } from "react-router-dom";

function Frequence() {
  const { setFrequence, dateFrequence, setDateFrequence } = MyContext();

  const location = useLocation();
  const getSearchParams = () => {
    return new URLSearchParams(location.search);
  };
  const params = getSearchParams();
  const env = import.meta.env;

  useEffect(() => {
    fetch(
      `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/select-date/${params.get("dest")}`
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

  const lundi =
    dateFrequence &&
    dateFrequence.filter(
      (elem) =>
        DateTime.fromISO(elem.event_time.split("T")[0]).setLocale("fr")
          .weekdayLong === "lundi"
    );

  const mardi =
    dateFrequence &&
    dateFrequence.filter(
      (elem) =>
        DateTime.fromISO(elem.event_time.split("T")[0]).setLocale("fr")
          .weekdayLong === "mardi"
    );

  const mercredi =
    dateFrequence &&
    dateFrequence.filter(
      (elem) =>
        DateTime.fromISO(elem.event_time.split("T")[0]).setLocale("fr")
          .weekdayLong === "mercredi"
    );

  const jeudi =
    dateFrequence &&
    dateFrequence.filter(
      (elem) =>
        DateTime.fromISO(elem.event_time.split("T")[0]).setLocale("fr")
          .weekdayLong === "jeudi"
    );

  const vendredi =
    dateFrequence &&
    dateFrequence.filter(
      (elem) =>
        DateTime.fromISO(elem.event_time.split("T")[0]).setLocale("fr")
          .weekdayLong === "vendredi"
    );

  const samedi =
    dateFrequence &&
    dateFrequence.filter(
      (elem) =>
        DateTime.fromISO(elem.event_time.split("T")[0]).setLocale("fr")
          .weekdayLong === "samedi"
    );

  const dimanche =
    dateFrequence &&
    dateFrequence.filter(
      (elem) =>
        DateTime.fromISO(elem.event_time.split("T")[0]).setLocale("fr")
          .weekdayLong === "dimanche"
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
          <td className="td">
            {lundi &&
              lundi.length !== 0 &&
              lundi[lundi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 0 &&
              lundi[lundi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 2 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {mardi &&
              mardi.length !== 0 &&
              mardi[mardi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] > 0 &&
              mardi[mardi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 2 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {mercredi &&
              mercredi.length !== 0 &&
              mercredi[mercredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] > 0 &&
              mercredi[mercredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 2 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {jeudi &&
              jeudi.length !== 0 &&
              jeudi[jeudi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] > 0 &&
              jeudi[jeudi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 2 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {vendredi &&
              vendredi.length !== 0 &&
              vendredi[vendredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] > 0 &&
              vendredi[vendredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 2 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {samedi &&
              samedi.length !== 0 &&
              samedi[samedi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] > 0 &&
              samedi[samedi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 2 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {dimanche &&
              dimanche.length !== 0 &&
              dimanche[dimanche.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] > 0 &&
              dimanche[dimanche.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 2 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
        </tr>
        <tr className="tr">
          <td className="td">02-04</td>
          <td className="td">
            {lundi &&
              lundi.length !== 0 &&
              lundi[lundi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 2 &&
              lundi[lundi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 4 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {mardi &&
              mardi.length !== 0 &&
              mardi[mardi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 2 &&
              mardi[mardi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 4 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {mercredi &&
              mercredi.length !== 0 &&
              mercredi[mercredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 2 &&
              mercredi[mercredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 4 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {jeudi &&
              jeudi.length !== 0 &&
              jeudi[jeudi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 2 &&
              jeudi[jeudi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 4 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {vendredi &&
              vendredi.length !== 0 &&
              vendredi[vendredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 2 &&
              vendredi[vendredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 4 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {samedi &&
              samedi.length !== 0 &&
              samedi[samedi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 2 &&
              samedi[samedi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 4 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {dimanche &&
              dimanche.length !== 0 &&
              dimanche[dimanche.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 2 &&
              dimanche[dimanche.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 4 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
        </tr>

        <tr className="tr">
          <td className="td">04-06</td>
          <td className="td">
            {lundi &&
              lundi.length !== 0 &&
              lundi[lundi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 4 &&
              lundi[lundi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 6 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {mardi &&
              mardi.length !== 0 &&
              mardi[mardi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 4 &&
              mardi[mardi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 6 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {mercredi &&
              mercredi.length !== 0 &&
              mercredi[mercredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 4 &&
              mercredi[mercredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 6 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {jeudi &&
              jeudi.length !== 0 &&
              jeudi[jeudi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 4 &&
              jeudi[jeudi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 6 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {vendredi &&
              vendredi.length !== 0 &&
              vendredi[vendredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 4 &&
              vendredi[vendredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 6 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {samedi &&
              samedi.length !== 0 &&
              samedi[samedi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 4 &&
              samedi[samedi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 6 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {dimanche &&
              dimanche.length !== 0 &&
              dimanche[dimanche.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 4 &&
              dimanche[dimanche.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 6 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
        </tr>

        <tr className="tr">
          <td className="td">06-08</td>
          <td className="td">
            {lundi &&
              lundi.length !== 0 &&
              lundi[lundi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 6 &&
              lundi[lundi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 8 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {mardi &&
              mardi.length !== 0 &&
              mardi[mardi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 6 &&
              mardi[mardi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 8 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {mercredi &&
              mercredi.length !== 0 &&
              mercredi[mercredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 6 &&
              mercredi[mercredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 8 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {jeudi &&
              jeudi.length !== 0 &&
              jeudi[jeudi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 6 &&
              jeudi[jeudi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 8 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {vendredi &&
              vendredi.length !== 0 &&
              vendredi[vendredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 6 &&
              vendredi[vendredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 8 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {samedi &&
              samedi.length !== 0 &&
              samedi[samedi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 6 &&
              samedi[samedi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 8 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {dimanche &&
              dimanche.length !== 0 &&
              dimanche[dimanche.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 6 &&
              dimanche[dimanche.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 8 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
        </tr>

        <tr className="tr">
          <td className="td">08-10</td>
          <td className="td">
            {lundi &&
              lundi.length !== 0 &&
              lundi[lundi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 8 &&
              lundi[lundi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 10 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {mardi &&
              mardi.length !== 0 &&
              mardi[mardi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 8 &&
              mardi[mardi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 10 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {mercredi &&
              mercredi.length !== 0 &&
              mercredi[mercredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 8 &&
              mercredi[mercredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 10 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {jeudi &&
              jeudi.length !== 0 &&
              jeudi[jeudi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 8 &&
              jeudi[jeudi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 10 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {vendredi &&
              vendredi.length !== 0 &&
              vendredi[vendredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 8 &&
              vendredi[vendredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 10 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {samedi &&
              samedi.length !== 0 &&
              samedi[samedi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 8 &&
              samedi[samedi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 10 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {dimanche &&
              dimanche.length !== 0 &&
              dimanche[dimanche.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 8 &&
              dimanche[dimanche.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 10 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
        </tr>

        <tr className="tr">
          <td className="td">10-12</td>
          <td className="td">
            {lundi &&
              lundi.length !== 0 &&
              lundi[lundi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 10 &&
              lundi[lundi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 12 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {mardi &&
              mardi.length !== 0 &&
              mardi[mardi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 10 &&
              mardi[mardi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 12 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {mercredi &&
              mercredi.length !== 0 &&
              mercredi[mercredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 10 &&
              mercredi[mercredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 12 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {jeudi &&
              jeudi.length !== 0 &&
              jeudi[jeudi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 10 &&
              jeudi[jeudi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 12 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {vendredi &&
              vendredi.length !== 0 &&
              vendredi[vendredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 10 &&
              vendredi[vendredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 12 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {samedi &&
              samedi.length !== 0 &&
              samedi[samedi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 10 &&
              samedi[samedi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 12 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {dimanche &&
              dimanche.length !== 0 &&
              dimanche[dimanche.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 10 &&
              dimanche[dimanche.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 12 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
        </tr>

        <tr className="tr">
          <td className="td">12-14</td>
          <td className="td">
            {lundi &&
              lundi.length !== 0 &&
              lundi[lundi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 12 &&
              lundi[lundi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 14 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {mardi &&
              mardi.length !== 0 &&
              mardi[mardi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 12 &&
              mardi[mardi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 14 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {mercredi &&
              mercredi.length !== 0 &&
              mercredi[mercredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 12 &&
              mercredi[mercredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 14 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {jeudi &&
              jeudi.length !== 0 &&
              jeudi[jeudi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 12 &&
              jeudi[jeudi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 14 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {vendredi &&
              vendredi.length !== 0 &&
              vendredi[vendredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 12 &&
              vendredi[vendredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 14 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {samedi &&
              samedi.length !== 0 &&
              samedi[samedi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 12 &&
              samedi[samedi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 14 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {dimanche &&
              dimanche.length !== 0 &&
              dimanche[dimanche.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 12 &&
              dimanche[dimanche.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 14 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
        </tr>

        <tr className="tr">
          <td className="td">14-16</td>
          <td className="td">
            {lundi &&
              lundi.length !== 0 &&
              lundi[lundi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 14 &&
              lundi[lundi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 16 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {mardi &&
              mardi.length !== 0 &&
              mardi[mardi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 14 &&
              mardi[mardi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 16 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {mercredi &&
              mercredi.length !== 0 &&
              mercredi[mercredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 14 &&
              mercredi[mercredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 16 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {jeudi &&
              jeudi.length !== 0 &&
              jeudi[jeudi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 14 &&
              jeudi[jeudi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 16 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {vendredi &&
              vendredi.length !== 0 &&
              vendredi[vendredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 14 &&
              vendredi[vendredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 16 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {samedi &&
              samedi.length !== 0 &&
              samedi[samedi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 14 &&
              samedi[samedi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 16 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {dimanche &&
              dimanche.length !== 0 &&
              dimanche[dimanche.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 14 &&
              dimanche[dimanche.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 16 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
        </tr>

        <tr className="tr">
          <td className="td">16-18</td>
          <td className="td">
            {lundi &&
              lundi.length !== 0 &&
              lundi[lundi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 16 &&
              lundi[lundi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 18 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {mardi &&
              mardi.length !== 0 &&
              mardi[mardi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 16 &&
              mardi[mardi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 18 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {mercredi &&
              mercredi.length !== 0 &&
              mercredi[mercredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 16 &&
              mercredi[mercredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 18 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {jeudi &&
              jeudi.length !== 0 &&
              jeudi[jeudi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 16 &&
              jeudi[jeudi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 18 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {vendredi &&
              vendredi.length !== 0 &&
              vendredi[vendredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 16 &&
              vendredi[vendredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 18 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {samedi &&
              samedi.length !== 0 &&
              samedi[samedi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 16 &&
              samedi[samedi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 18 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {dimanche &&
              dimanche.length !== 0 &&
              dimanche[dimanche.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 16 &&
              dimanche[dimanche.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 18 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
        </tr>

        <tr className="tr">
          <td className="td">18-20</td>
          <td className="td">
            {lundi &&
              lundi.length !== 0 &&
              lundi[lundi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 18 &&
              lundi[lundi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 20 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {mardi &&
              mardi.length !== 0 &&
              mardi[mardi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 18 &&
              mardi[mardi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 20 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {mercredi &&
              mercredi.length !== 0 &&
              mercredi[mercredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 18 &&
              mercredi[mercredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 20 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {jeudi &&
              jeudi.length !== 0 &&
              jeudi[jeudi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 18 &&
              jeudi[jeudi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 20 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {vendredi &&
              vendredi.length !== 0 &&
              vendredi[vendredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 18 &&
              vendredi[vendredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 20 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {samedi &&
              samedi.length !== 0 &&
              samedi[samedi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 18 &&
              samedi[samedi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 20 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {dimanche &&
              dimanche.length !== 0 &&
              dimanche[dimanche.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 18 &&
              dimanche[dimanche.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 20 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
        </tr>

        <tr className="tr">
          <td className="td">20-22</td>
          <td className="td">
            {lundi &&
              lundi.length !== 0 &&
              lundi[lundi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 20 &&
              lundi[lundi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 22 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {mardi &&
              mardi.length !== 0 &&
              mardi[mardi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 20 &&
              mardi[mardi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 22 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {mercredi &&
              mercredi.length !== 0 &&
              mercredi[mercredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 20 &&
              mercredi[mercredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 22 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {jeudi &&
              jeudi.length !== 0 &&
              jeudi[jeudi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 20 &&
              jeudi[jeudi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 22 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {vendredi &&
              vendredi.length !== 0 &&
              vendredi[vendredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 20 &&
              vendredi[vendredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 22 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {samedi &&
              samedi.length !== 0 &&
              samedi[samedi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 20 &&
              samedi[samedi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 22 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {dimanche &&
              dimanche.length !== 0 &&
              dimanche[dimanche.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 20 &&
              dimanche[dimanche.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 22 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
        </tr>

        <tr className="tr">
          <td className="td">22-00</td>
          <td className="td">
            {lundi &&
              lundi.length !== 0 &&
              lundi[lundi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 22 &&
              lundi[lundi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 24 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {mardi &&
              mardi.length !== 0 &&
              mardi[mardi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 22 &&
              mardi[mardi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 24 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {mercredi &&
              mercredi.length !== 0 &&
              mercredi[mercredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 22 &&
              mercredi[mercredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 24 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {jeudi &&
              jeudi.length !== 0 &&
              jeudi[jeudi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 22 &&
              jeudi[jeudi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 24 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {vendredi &&
              vendredi.length !== 0 &&
              vendredi[vendredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 22 &&
              vendredi[vendredi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 24 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {samedi &&
              samedi.length !== 0 &&
              samedi[samedi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 22 &&
              samedi[samedi.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 24 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
          <td className="td">
            {dimanche &&
              dimanche.length !== 0 &&
              dimanche[dimanche.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 22 &&
              dimanche[dimanche.length - 1].event_time
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] < 24 && (
                <p className="present-frequence">&#10003;</p>
              )}
          </td>
        </tr>
      </table>
    </div>
  );
}

export default Frequence;
