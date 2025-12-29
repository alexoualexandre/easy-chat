// eslint-disable-next-line no-undef
const { AddImgAlbumRepository } = require("../bdd/AddImgAlbumRepository.js");

const AddImgAlbum = async (req, res, next) => {
  const data = req.body;
  try {
    await new AddImgAlbumRepository().AddImgAlbum(data);
    res.json({ add: "ok" });
  } catch (err) {
    next({ error: `erreur:${err}` });
  }
};

const myPhotos = async (req, res, next) => {
  const { id } = req.params;
  try {
    const photos = await new AddImgAlbumRepository().myPhotos(id);
    res.json(photos);
  } catch (err) {
    next({ error: `erreur:${err}` });
  }
};

const deleteImgAlbum = async (req, res, next) => {
  const { img } = req.body;
  try {
    await new AddImgAlbumRepository().deleteImgAlbum(img);
    res.json({ del: "ok" });
  } catch (err) {
    next({ error: `erreur:${err}` });
  }
};

const sonAlbum = async (req, res, next) => {
  const { id } = req.params;
  try {
    const album = await new AddImgAlbumRepository().sonAlbum(id);
    res.json(album);
  } catch (err) {
    next({ error: `erreur:${err}` });
  }
};

// eslint-disable-next-line no-undef
module.exports = {
  AddImgAlbum,
  myPhotos,
  deleteImgAlbum,
  sonAlbum,
};
