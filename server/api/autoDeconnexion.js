/* eslint-disable no-undef */
const { DateTime } = require("luxon");

function cal() {
  const interval = setInterval(() => {
    const now = DateTime.now();

    fetch(`http://localhost:3311/select-all-user`)
      .then((response) => response.json())
      .then((response) => {
        for (let i = 0; i < response.length; i++) {
          let min = parseInt(
            response[i].last_modified.split("T")[1].split(".")[0].split(":")[1],
            10
          );
          let sec = parseInt(
            response[i].last_modified.split("T")[1].split(".")[0].split(":")[2],
            10
          );

          if (now.minute === min + 1 && now.second === sec) {
            fetch(
              `http://localhost:3311/auto-deco`,

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
              `http://localhost:3311/update-present`,

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
