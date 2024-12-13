/* eslint-disable no-undef */
const { DateTime } = require("luxon");

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
          let splitH = parseInt(
            response[i].last_modified.split("T")[1].split(".")[0].split(":")[0],
            10
          );
          let splitM = parseInt(
            response[i].last_modified.split("T")[1].split(".")[0].split(":")[1],
            10
          );
          let heure = splitH;
          let minute = splitM;
          let now = DateTime.now();
          let nowM = parseInt(now.minute, 10);
          if (
            heure === parseInt(now.minus({ hours: 1 }).hour) &&
            nowM === minute
          ) {
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
