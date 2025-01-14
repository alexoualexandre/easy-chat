/* eslint-disable no-undef */
// pm2 start 6(vps) , pm2 start 0(local)
const nodemailer = require("nodemailer");
const { app } = require("../index.js");
const fs = require("fs");

const {
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
  userSelected,
  updatePresent,
  autoDeco,
  selectTotalMessage,
  updateTotalMessage,
} = require("../controler/userControler.js");

const {
  addMessage,
  getMessage,
  countMessage,
  getNewMessage,
  updateCountMessage,
  removeMessage,
} = require("../controler/messageControler.js");

const {
  AddImgAlbum,
  myPhotos,
  deleteImgAlbum,
  sonAlbum,
} = require("../controler/AddImgAlbumController.js");

const {
  addCalendar,
  selectDate,
} = require("../controler/CalendarController.js");

const {
  alertMail,
  addAlert,
  dropAlert,
} = require("../controler/AlertMailController.js");

const { argon } = require("../service/argon2.js");

const path = require("path");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../upload");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.put("/update-count-message", updateCountMessage);

app.post("/upload-file", upload.single("file"), function (req, res) {
  res.json({ nvName: req.file.filename });
});

app.post("/add-upload-file", upload.single("add_img"), function (req, res) {
  res.json({ nvName: req.file.filename });
});

app.delete(
  "/remove-img-album",
  (req, res, next) => {
    const { img } = req.body;
    const currentPath = path.join(__dirname, `${img}`);
    const newPath = currentPath.replace(
      path.join("api", `${img}`),
      path.join("upload", `${img}`)
    );
    fs.unlink(newPath, (err) => {
      if (err) {
        console.error("Erreur lors de la suppression du fichier :", err);
        return;
      }
    });
    next();
  },
  deleteImgAlbum
);

app.get("/update-inline/:id", updateInline);

app.get("/deconnexion/:id", disconnect);

app.put("/update", argon, modifyProfil);

app.get("/change-img-profil/:nv/:id", modifyImgProfile);

app.get("/select-user-id/:id", selectUserId);

app.get("/select-all-user", selectAllUser);

app.post("/connexion", getUserConnexion);

app.get("/get-user/:pseudo", getUser);

app.post("/insert-user", argon, insertUser);

app.post("/recherche", recherche);

app.get("/user-selected/:id", userSelected);

app.post("/add-message", addMessage);

app.get("/get-message/:id/:auth", getMessage);

app.get("/count-message/:auth", countMessage);

app.get("/get-new-message/:auth", getNewMessage);

app.post("/add-img-album", AddImgAlbum);

app.get("/my-photos/:id", myPhotos);

app.put("/update-present", updatePresent);

app.get("/son-album/:id", sonAlbum);

app.put("/auto-deco", autoDeco);

app.get("/select-total-message/:user", selectTotalMessage);

app.put("/update-total-message", updateTotalMessage);

app.get("/select-date/:dest", selectDate);

app.post("/add-calendar", addCalendar);

app.delete("/remove-message", removeMessage);

app.post("/mail-desinscription", (req, res, next) => {
  try {
    const { pseudo, mail } = req.body;

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
<h2>Votre désinscription a bien était pris en compte ${pseudo}</h2>
</body>
</html>


`;

    const mailOptions = {
      from: pseudo,
      to: mail,
      subject: `Easy-chat désinscription`,
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
});

app.post("/add-alert", addAlert);

app.get("/get-alert/:id/:dest", alertMail);

app.delete("/drop-alert", dropAlert);
