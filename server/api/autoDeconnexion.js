/* eslint-disable no-undef */
// const { DateTime } = require("luxon");

const { DateTime } = require("luxon");

// Obtenir l'heure actuelle
const now = DateTime.now();

// Soustraire une heure

// console.log(`Heure actuelle: ${now.toFormat('HH:mm:ss')}`);
// console.log(`Heure actuelle moins une heure: ${oneHourAgo.toFormat('HH:mm:ss')}`);

function cal() {
  const interval = setInterval(() => {
    fetch(`http://77.37.51.45:3311/select-all-user`)
      .then((response) => response.json())
      .then((response) => {
        for (let i = 0; i < response.length; i++) {
          // let splitH = parseInt(
          //   response[i].last_modified.split("T")[1].split(".")[0].split(":")[0],
          //   10
          // );
          // let heure = splitH;
          // let splitH = parseInt(
          //   response[i].last_modified.split("T")[1].split(".")[0].split(":")[0],
          //   10
          // );

          const oneMinuteAgo = now.minus({ minutes: 1 });
          const split = response[i].last_modified.split("T")[1].split(".")[0];

          // console.log(oneMinuteAgo.toFormat("HH:mm:ss"))
          // console.log(response[0].last_modified.split("T")[1].split(".")[0] === "15:57:57");

          // .split(".")[0].split(":")[1],

          // let heure = splitH;
          // let minute = splitM;
          // let now = DateTime.now();
          // let nowM = parseInt(now.minute, 10);

          if (parseInt(split.split(':')[1],10) === parseInt(oneMinuteAgo.toFormat("HH:mm:ss").split(':')[1],10)) {
            fetch(
              `http://77.37.51.45:3311/auto-deco`,

              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: response[i].id,
                }),
              }
            );
            fetch(
              `http://77.37.51.45:3311/update-present`,

              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  user: 0,
                  m: response[i].id,
                }),
              }
            );
          }
        }
      })
      .then((response) => response.json());
  }, 330);
  return () => clearInterval(interval);
}

cal();
