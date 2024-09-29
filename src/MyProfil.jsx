import { Link } from "react-router-dom";
import { MyContext } from "./Context";
import { useState } from "react";

function MyProfil() {
  const { setBurgerMember } = MyContext();
  const [f, setFile] = useState(null);
  const formData = new FormData();
  formData.append("file", f);
  const handleSubmit = (e) => {
//    e.preventDefault();
    const env = import.meta.env;
    fetch(
      `http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/upload-file`,
      { method: "POST", body: formData }
    )
      .then((response) => response)
      .then((resp) => resp.json())
      .then((r) => {
        console.info(r);
      });
  };

  return (
    <div className="profil-member">
      <Link to="/home">
        <button
          type="button"
          className="x"
          onClick={() => {
            setBurgerMember(false);
          }}
        >
          ×
        </button>
      </Link>
      <div className="my-profil">
        <section className="section-my-profil-picture">
          <p className="h3-photo-profil">Ma photo de profil</p>
          <img
            src="/file-1727348415869-337239199.jpg"
            className="img-profil-mini"
            alt="no-picture"
          />

          <form
            action=""
            method="POST"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <input
              type="file"
              name="file"
              accept="image/*"
              id="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
	     <label htmlFor="file" id="label-file">
<img src="/1727599060349.png" alt="no-picture" className="app-photo" />
</label>
            <button type="submit" className={f !== null ? "" : "sub-file-none"} id="submit">
<img src="/1727609609978.png" className="submit-change" alt="soumettre" />
</button>
          </form>
        </section>

        <section className="section-my-profil-picture"></section>
      </div>
    </div>
  );
}

export default MyProfil;
