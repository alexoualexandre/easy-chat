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
    let result = false;
    const [userConnexion] = await new User().selectUserConnexion(req.body);
    if (userConnexion) {
      argon2
        .verify(userConnexion.password, req.body.password)
        .then((validate) => {
          result = validate;
          res.json({
            pseudo: userConnexion.pseudo,
            bool: result,
            id: userConnexion.id,
          });
        });
    } else {
      res.json({ pseudo: "introuvable", bool: result, id: "" });
    }
  } catch (err) {
    next({ error: `erreur:${err}` });
  }
};

const selectAllUser = async (req, res, next) => {
  try {
    const users = await new User().selectAllUser();
    res.json(users);
  } catch (err) {
    next({ error: `erreur:${err}` });
  }
};

const modifyImgProfile = async (req, res, next) => {
  const { nv, id } = req.params;
  try {
    await new User().modifyImgProfile(nv, id);
  } catch (err) {
    next({ error: `erreur:${err}` });
  }
};

const selectUserId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userId = await new User().selectUserId(id);
    res.json(userId);
  } catch (err) {
    next({ error: `erreur:${err}` });
  }
};

const modifyProfil = async (req, res, next) => {
  const data = req.body;
  const result = {
    password: data.password,
    dep: parseInt(data.dep, 10) ? data.dep : data.dep.split("-")[0],
    mail: data.mail,
    search: data.search,
    description: data.description,
    user: data.user,
  };
  try {
    await new User().modifyProfil(result);
  } catch (err) {
    next({ error: `erreur:${err}` });
  }
};

const disconnect = async (req, res, next) => {
  const { id } = req.params;
  try {
    await new User().disconnect(id);
  } catch (err) {
    next({ error: `erreur:${err}` });
  }
};

const updateInline = async (req, res, next) => {
  const { id } = req.params;
  try {
    await new User().updateInline(id);
  } catch (err) {
    next({ error: `erreur:${err}` });
  }
};

const recherche = async (req, res, next) => {
  const data = req.body;
  try {
    const user = await new User().recherche(data);
    res.json(user);
  } catch (err) {
    next({ error: `erreur:${err}` });
  }
};

module.exports = {
  getUser,
  insertUser,
  getUserConnexion,
  selectAllUser,
  modifyImgProfile,
  selectUserId,
  modifyProfil,
  disconnect,
  updateInline,
  recherche,
};
