// eslint-disable-next-line no-undef
const { connection } = require("./index.js");

class AddImgAlbumRepository {
  async AddImgAlbum(data) {
    await connection.query(
      "INSERT INTO users_photos (user_id,photo) VALUES (?,?) ",
      [parseInt(data.user, 10), data.nvName]
    );
  }

  async myPhotos(id) {
    const [photo] = await connection.query(
      "SELECT * FROM users_photos WHERE user_id = ?",
      [id]
    );
    return photo;
  }

  async deleteImgAlbum(p) {
    await connection.query("DELETE FROM users_photos WHERE photo = ?", [p]);
  }

  async sonAlbum(id) {
    const [photo] = await connection.query(
      "SELECT photo FROM users_photos WHERE user_id = ?",
      [id]
    );
    return photo;
  }
}

// eslint-disable-next-line no-undef
module.exports = { AddImgAlbumRepository };
