import { useEffect, useState } from "react";
import { MyContext } from "./Context";
import Cookies from "js-cookie";

function MyAlbum() {
  const { setMyAlbum, divMessage, setFilter } = MyContext();
  const [nvName, setNvName] = useState(false);
  const [dataUserPhoto, setDataUserPhoto] = useState(false);

  const Auth = Cookies.get("auth");
  const env = import.meta.env;

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(
        `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/my-photos/${Cookies.get("auth")}`
      )
        .then((response) => response.json())
        .then((response) => {
          setDataUserPhoto(response);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    if (dataUserPhoto && dataUserPhoto.length < 9) {
      const formData = new FormData();
      formData.append("add_img", e.target.files[0]);
      const env = import.meta.env;
      fetch(
        `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/add-upload-file`,
        { method: "POST", body: formData }
      )
        .then((resp) => resp.json())
        .then((r) => {
          setNvName(r.nvName);
        });
    } else {
      alert(
        "Vous avez atteint la limite de 9 photos , veuillez en supprimer pour pouvoir en ajouter"
      );
    }
  };

  useEffect(() => {
    if (nvName && dataUserPhoto && dataUserPhoto.length < 9) {
      const env = import.meta.env;

      fetch(
        `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/add-img-album`,
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
      `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/remove-img-album`,
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
      <button
        type="button"
        className="button-div-my-album"
        onClick={() => {
          setMyAlbum(false);
          if (window.innerWidth >= 1024) {
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
              accept="image/*"
              capture="environment"
              onChange={handleSubmit}
            />
          </button>
        </form>
        <ul className="div-my-photo">
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
                  src={`http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/upload/${elem.photo}`}
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
