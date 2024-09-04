// import { useEffect, useState } from "react";
import Header from './Header.jsx';
import BurgerHome from './BurgerHome.jsx';
import {MyContext} from './Context.jsx';

function App() {

//	fonction de MAJ auto bdd
//  const [data, setData] = useState();
    const {burgerHome} = MyContext();
//  useEffect(() => {

// const interval=setInterval(

// function(){
//    fetch("http://77.37.51.45:3311/user")
//      .then((response) => response)
//      .then((resp) => resp.json())
//      .then((rep) => {
//	console.log(rep);
//        setData(rep[0]);
//      }
//  )
// },
// 10000);
// return ()=>clearInterval(interval)
// }, []);

  return (
	<body className="body-home-page">
		<Header />
	{burgerHome && <BurgerHome />}
	</body>
	)
}

export default App;
