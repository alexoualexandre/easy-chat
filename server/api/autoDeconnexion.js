/* eslint-disable no-undef */

const { DateTime } = require("luxon");

function cal() {
  const interval = setInterval(() => {
    fetch(`https://easy-chat.org:3311/select-all-user`)
      .then((response) => response.json())
      .then((response) => {
        for (let i = 0; i < response.length; i++) {
          if (response[i].id !== 13) {
            const now = DateTime.now();

            const minute = parseInt(
              response[i].last_modified
                .split("T")[1]
                .split(".")[0]
                .split(":")[1],
              10
            );
            const second = parseInt(
              response[i].last_modified
                .split("T")[1]
                .split(".")[0]
                .split(":")[2],
              10
            );

            const oneMinuteAgo = now.minus({ minutes: 59 });

            if (
              parseInt(oneMinuteAgo.minute, 10) == minute &&
              parseInt(oneMinuteAgo.second, 10) == second
            ) {
              fetch(
                `https://easy-chat.org:3311/auto-deco`,

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
                `https://easy-chat.org:3311/update-present`,

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
        }
      })
      .then((response) => response.json());
  }, 500);
  return () => clearInterval(interval);
}

cal();
