import { useEffect, useState } from "react";
import { MyContext } from "./Context";
import Cookies from "js-cookie";
import heic2any from "heic2any";
import { useLocation } from "react-router-dom";

function MyAlbum() {
  const { setMyAlbum, divMessage, setFilter } = MyContext();
  const [nvName, setNvName] = useState(false);
  const [dataUserPhoto, setDataUserPhoto] = useState(false);
  const [chargement, setChargement] = useState(false);

  const Auth = Cookies.get("auth");
  const env = import.meta.env;

  const location = useLocation();
  const getSearchParams = () => {
    return new URLSearchParams(location.search);
  };
  const params = getSearchParams();

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(
        `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/my-photos/${Cookies.get("auth")}`
      )
        .then((response) => response.json())
        .then((response) => {
          setDataUserPhoto(response);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    setChargement(true);
    const formData = new FormData();

    const file = e.target.files[0];

    if (
      (file && file.name.split(".")[1] === "heic") ||
      (file && file.name.split(".")[1] === "heif")
    ) {
      try {
        const convertedBlob = await heic2any({
          blob: file,
          toType: "image/jpeg",
        });
        const convertedFile = new File(
          [convertedBlob],
          file.name.replace(".heic", ".jpeg"),
          {
            type: "image/jpeg",
          }
        );
        console.log("Fichier converti :", convertedFile);
        formData.append("add_img", convertedFile);
      } catch (error) {
        console.error("Erreur lors de la conversion HEIC :", error);
      }
    } else {
      console.log("Fichier pris en charge :", file);
      formData.append("add_img", file);
    }

    if (dataUserPhoto && dataUserPhoto.length < 9) {
      const env = import.meta.env;
      fetch(
        `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/add-upload-file`,
        { method: "POST", body: formData }
      )
        .then((resp) => resp.json())
        .then((r) => {
          setChargement(false);
          setNvName(r.nvName);
        });
    } else {
      alert(
        "Vous avez atteint la limite de 9 photos , veuillez en supprimer pour pouvoir en ajouter"
      );
      setChargement(false);
    }
  };

  useEffect(() => {
    if (nvName && dataUserPhoto && dataUserPhoto.length < 9) {
      const env = import.meta.env;

      fetch(
        `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/add-img-album`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nvName: nvName, user: Auth }),
        }
      ).then((response) => response.json());
    }
  }, [nvName]);

  const del = (p) => {
    fetch(
      `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/remove-img-album`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ img: p }),
      }
    );
  };

  return (
    <div className="div-my-album">
      {!dataUserPhoto && (
        <div className="chargement">
          <div className="cercle"></div>
        </div>
      )}
      {chargement && (
        <div className="chargement">
          <div className="cercle"></div>
        </div>
      )}

      <button
        type="button"
        className="button-div-my-album"
        onClick={() => {
          setMyAlbum(false);

          if (window.innerWidth >= 1024) {
            fetch(
              `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/update-present`,

              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  user: params.get("dest"),
                  m: Cookies.get("auth"),
                }),
              }
            ).then((response) => response.json());
            if (!divMessage) {
              setFilter(true);
            }
          }
        }}
      >
        ×
      </button>
      <div className="div-album-photo">
        <form method="post" encType="multipart/form-data">
          <button className="input_add">
            <img src="addimg.png" className="add_img_png" />
            <input
              type="file"
              name="add_img"
              className="input_add_img"
              accept="image/*,.heic,.heif"
              onChange={handleSubmit}
            />
          </button>
        </form>
        <ul
          className="div-my-photo"
          style={chargement ? { opacity: 0.2 } : { opacity: 1 }}
        >
          {dataUserPhoto &&
            dataUserPhoto.map((elem) => (
              <li className="li-my-photo" key={elem.id}>
                <button
                  type="button"
                  className="button-li-my-photo"
                  onClick={() => {
                    del(elem.photo);
                  }}
                >
                  ×
                </button>
                <img
                  src={`${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/upload/${elem.photo}`}
                  alt="no-picture"
                  className="bcl-my-photo"
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default MyAlbum;
