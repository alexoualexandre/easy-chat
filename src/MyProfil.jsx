import { Link } from "react-router-dom";
import { MyContext } from "./Context";
import { useState } from 'react';

function MyProfil() {
  const { setBurgerMember } = MyContext();
const [f,setFile] = useState(null);
const formData = new FormData();
formData.append("file",f) 
const handleSubmit = (e)=>{
e.preventDefault();
const env = import.meta.env;
fetch(`http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/upload-file`,{method: "POST",body: formData,}).then(response=>response).then((resp)=>resp.json()).then((r)=>{console.info(r)});
}

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
<img src="/1727375316787.PNG" className="img-profil-mini"  alt="no-picture" />



    <form action="" method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
            <input type="file" name="file" onChange={(e)=>{setFile(e.target.files[0])}}/>
	<input type="submit" value="valider" />   
</form>



</section>

        <section className="section-my-profil-picture"></section>
      </div>
    </div>
  );
}

export default MyProfil;
