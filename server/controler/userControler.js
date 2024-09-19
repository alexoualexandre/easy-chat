/* eslint-disable no-undef */

const nodemailer = require("nodemailer");
const argon2 = require("argon2");

const { User } = require("../bdd/userRepository.js");

const getUser = async (req, res, next) => {
  const { pseudo } = req.params;
  try {
    const user = await new User().selectUser(pseudo);
    res.json(user);
  } catch (err) {
    next({ error: `erreur:${err}` });
  }
};

const insertUser = async (req, res, next) => {
  try {
    const insert = await new User().addUser(req.body);
    res.json({ nb_user: insert });

    const { pseudo, mail } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "alexoualexandre1@gmail.com",
        pass: "sltp ziog btyq oxip",
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
background-color: #501720 !important;
width: 100% !important;
height: 100% !important;
}

h1 {
font-family: "Love Light", cursive !important;
color: pink !important;
text-align: center !important;
font-size: 2.5em !important;
}
    </style>
</head>
<body>
<h1>Easy-chat</h1><br/>    
<h2>Bienvenue ${pseudo}</h2>
</body>
</html>


`;

    const mailOptions = {
      from: pseudo,
      to: mail,
      subject: `Easy-chat inscription validé`,
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
    });
  } catch (err) {
    next(err);
  }
};

const getUserConnexion = async (req, res, next) => {
  try {
    const userConnexion = await new User().selectUserConnexion(req.body);
    if (userConnexion[0]) {
      const result = argon2.verify(
        req.body.password,
        userConnexion[0].password
      );
      if (result === true) {
        res.json({ message: "ok" });
      } else {
        res.json({ message: "mauvais mdp" });
      }
    } else {
      res.json({ message: "no utilisateur" });
    }
  } catch (err) {
    next({ error: `erreur:${err}` });
  }
};

module.exports = { getUser, insertUser, getUserConnexion };
