/* eslint-disable no-undef */
// pm2 start 6(vps) , pm2 start 0(local)
const { app } = require("../index.js");

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
} = require("../controler/userControler.js");

const {
  addMessage,
  getMessage,
  countMessage,
  getNewMessage,
  updateCountMessage,
} = require("../controler/messageControler.js");

const { AddImgAlbum } = require("../controler/AddImgAlbumController.js");

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
