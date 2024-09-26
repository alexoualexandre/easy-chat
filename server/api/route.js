/* eslint-disable no-undef */
// pm2 start 6(vps) , pm2 start 0(local)
const { app } = require("../index.js");

const {
  getUser,
  insertUser,
  getUserConnexion,
  selectAllUser,
} = require("../controler/userControler.js");

const { argon } = require("../service/argon2.js");

//const { uploadFile } = require("../service/uploadFile.js");

const path = require("path");

const multer = require("multer");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../../public"); // Dossier où les fichiers seront enregistrés
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renomme le fichier pour éviter les conflits
  },
});

const upload = multer({ storage: storage });

app.post("/upload-file", upload.single("file"), function (req, res) {
  res.json({ nouveauNom: req.file.filename });
});






app.get("/select-all-user", selectAllUser);

app.post("/connexion", getUserConnexion);

app.get("/get-user/:pseudo", getUser);

app.post("/insert-user", argon, insertUser);
