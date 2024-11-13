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

// eslint-disable-next-line no-undef
module.exports = {
  AddImgAlbum,
  myPhotos,
};
