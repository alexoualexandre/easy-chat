import {Link} from 'react-router-dom'; import 
{useState} from 'react';

function Connexion(){
const [change,setChange] = useState({
pseudo: "",
password: "",
});

const handleChange = (e)=>{
const {name,value} = e.target;
setChange((prevState)=>({
...prevState,
[name]:value,
}));
}

const handleSubmit = (event)=>{
  event.preventDefault();
if(change.pseudo !== "" && change.password !== ""){
alert("ok")
}
}
console.info(change)
    return (<div className="div-connexion">
<Link to="/">
        <button
          className="x">
          ×
        </button>
</Link>

<div className="block-connexion">


<form method="post" onSubmit={handleSubmit}>
<h3 className="pseudo-connexion">Pseudo</h3>
<input type="text" name="pseudo" className="input-pseudo-connexion" onChange={handleChange}/>

<h3 className="mdp-connexion">Mot de passe</h3>
<input type="password" name="password" className="input-password-connexion" onChange={handleChange}/>

<input type="submit" value="me connecter" className={change.pseudo !== "" && change.password !== "" ? "me-connecter-on" : "me-connecter-off"}/>
</form>
</div>
</div>)
}

export default Connexion;
