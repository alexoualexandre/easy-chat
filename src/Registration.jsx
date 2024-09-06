// import { MyContext } from './Context.jsx';
import { Link } from 'react-router-dom';

function Registration(){

return(
<section className="body-home-page">
<button className="x">
<Link to="/" style={{textDecoration: "none",color: "white"}}>
×
</Link>
</button>
<form method="post">
<div className="carrousel-registration">
<ul className="ul-carrousel-registration">
<li className="li-carrousel-registration">

<strong className="i-am">
Je suis
</strong>

<div className="li-sex">
<input type="radio" name="sex" value="homme"/>
<input type="radio" name="sex" value="femme"/>
</div>

</li>
<li className="li-carrousel-registration">

</li>
<li className="li-carrousel-registration">

</li>
</ul>
</div>
</form>
</section>)
}

export default Registration;
