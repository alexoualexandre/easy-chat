import Cookies from "js-cookie";
import {useState} from 'react';
// import { Link } from "react-router-dom";
import HeaderMember from "./HeaderMember.jsx";
import MenuMember from "./MenuMember.jsx";
import { MyContext } from "./Context.jsx";

function Home() {

  const Auth = Cookies.get("auth");
  const [responseUser,setResponseUser] = useState();
  if (Auth) {
const env = import.meta.env;
fetch(`http://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/select-all-user`).then(response=>response).then((resp)=>resp.json()).then((r)=>{setResponseUser(r)}); 
   const { burgerMember } = MyContext();
    return (
      <>
        <HeaderMember />
        {burgerMember && <MenuMember />}
{!burgerMember && <><button type="button" className="voir-filtres">
voir filtres <span className="chevron"> &#x27A7; </span></button>
<div className="the-users">

<ul className="ul-article">

{responseUser && responseUser.map(
(user)=>
<li className="li-article">
<article className="article-user">
<img src="/image.png" className="img-article-user" alt="no-picture" />
{user.pseudo}
</article>
</li>
)}


</ul>
</div></>}
      </>
    );
  } else {
    window.location.href = "/";
  }
}

export default Home;
