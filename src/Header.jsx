import {MyContext} from './Context.jsx';

function Header(){
const {setBurgerHome} = MyContext();
	return(<header className="header">
	<div className="menu">
	<div className="burger"></div>
	 <div className="burger"></div>
	 <div className="burger"></div>
	<button className="click-burger"
onClick={()=>{setBurgerHome(true)}}
	>.</button>
	</div>
	<button className="button-inscription">
	S'inscrire
	</button>

</header>)
}

export default Header;
