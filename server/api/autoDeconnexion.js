/* eslint-disable no-undef */
const { DateTime } = require("luxon");

function cal() {
  const interval = setInterval(() => {
    fetch(`http://77.37.51.45:3311/select-all-user`)
      .then((response) => response.json())
      .then((response) => {
        for (let i = 0; i < response.length; i++) {
          let splitH = parseInt(
            response[i].last_modified.split("T")[1].split(".")[0].split(":")[0],
            10
          );

          let heure = splitH;

          let splitM = parseInt(
            response[i].last_modified.split("T")[1].split(".")[0].split(":")[1],
            10
          );
          let min = splitM;

          let now = DateTime.now();
          let nowH = parseInt(now.hour, 10) < 1 ? 24 : parseInt(now.hour, 10);
          let nowM = parseInt(now.minute, 10);

          if (nowH >= heure + 1 && nowM >= min) {
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
  }, 1000);
  return () => clearInterval(interval);
}

cal();
