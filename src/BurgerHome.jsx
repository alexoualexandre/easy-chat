import {MyContext} from './Context.jsx'

function BurgerHome(){
const {setBurgerHome} = MyContext();
return (<section className="burger-home">
<button className="x" onClick={()=>{setBurgerHome(false)}}>
×
</button>
</section>)
}

export default BurgerHome;
