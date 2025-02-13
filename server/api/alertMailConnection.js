/* eslint-disable no-undef */
const nodemailer = require("nodemailer");

function AlertMailConnection() {
  const interval = setInterval(() => {
    fetch(`https://easy-chat.org:3311/process-alert-mail-prevent`)
      .then((rp) => rp.json())
      .then((rsp) => {
        fetch(`https://easy-chat.org:3311/process-alert-mail-to`)
          .then((r) => r.json())
          .then((response) => {
            for (let i = 0; i < rsp.length; i++) {
              if (response[i].inline === 1 && rsp[i].open === 1) {
                try {
                  const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                      user: "contact.easy.chat@gmail.com",
                      pass: "gjyv sfqw jbsq baed",
                    },
                  });

                  const message = `
              
              <!DOCTYPE html>
              <html>
              <head>
                  <style>
                      
                      @import url('https://fonts.googleapis.com/css2?family=Love+Light&display=swap'); 
                      
                      .love-light-regular {
                       font-family: "Love Light", cursive;
                       font-weight: 400;
                       font-style: normal;
                      }
              
              body{
              width: 100% !important;
              height: 100% !important;
              }
              
              h1 {
              font-family: "Love Light", cursive !important;
              color: pink !important;
              text-align: center !important;
              font-size: 2.5em !important;
              }
              h3 {
                    text-align: center !important;
                  }
                  </style>
              </head>
              <body>
              <h1>Easy-chat </h1><br/>   
              <h3>${response[i].pseudo} est connecté !</h3><br />
              <p>Ce mail vous sera envoyé chaque fois que ${response[i].pseudo} se connectera.<br />
              Vous pouvez à tout moment annuler cette action en vous positionnant sur cet utilisateur et en cliquant sur "options",<br />
              puis en décochant le champ approprié.<br /><br />
              Easy Chat vous souhaite de belles rencontres.</p>

              </body>
              </html>
              
              
              `;

                  const mailOptions = {
                    from: `${response[i].pseudo}`,
                    to: `${rsp[i].mail}`,
                    subject: `${response[i].pseudo} est connecté !`,
                    text: `${message}`,
                    html: `${message}`,
                  };

                  transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                      console.error("Erreur lors de l'envoi:", error);
                      res.status(500).send("Erreur lors de l'envoi de l'email");
                    } else {
                      console.log("Email envoyé:", info.response);
                      res.status(200).send("Email envoyé avec succès");
                    }
                    fetch(
                      `https://easy-chat.org:3311/modify-process-alert-mail-prevent`,
                      {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          prevent: rsp[i].from_id,
                          to: response[i].to_id,
                        }),
                      }
                    ).then((rep) => rep.json());
                  });
                } catch (err) {
                  next(err);
                }
              }
            }
          });
      });
  }, 5000);
  return () => clearInterval(interval);
}

AlertMailConnection();
