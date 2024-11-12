// eslint-disable-next-line no-undef
const { connection } = require("./index.js");

class AddImgAlbumRepository {
  async AddImgAlbum(data) {
    await connection.query(
      "INSERT INTO users_photos (user_id,photo) VALUES (?,?) ",
      [parseInt(data.user, 10), data.nvName]
    );
  }
}

// eslint-disable-next-line no-undef
module.exports = { AddImgAlbumRepository };
