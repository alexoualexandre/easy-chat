const apiKey = "57924f44f788a7abfd8b2f5561cd8e7a";
const latitude = 50.6295038;
const longitude = 3.0021026;

const url = `http://api.positionstack.com/v1/reverse?access_key=${apiKey}&query=${latitude},${longitude}`;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log("Adresse : ", data.data[0].label);
  })
  .catch((error) => console.error("Erreur :", error));
