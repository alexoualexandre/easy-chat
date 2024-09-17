import Cookies from "js-cookie";
// import { Link } from "react-router-dom";
import HeaderMember from "./HeaderMember.jsx";
import MenuMember from "./MenuMember.jsx";
import { MyContext } from "./Context.jsx";

function Home() {
  const Auth = Cookies.get("auth");
  if (Auth) {
    const { burgerMember } = MyContext();
    return (
      <>
        <HeaderMember />
        {burgerMember && <MenuMember />}
      </>
    );
  } else {
    window.location.href = "/";
  }
}

export default Home;
