 import {useState} from 'react';

function App() {
  
 const [data,setData] = useState();
fetch('http://77.37.51.45:3311/user').then(
response=>response).then((resp)=>resp.json()).then(
(rep)=>{console.info(rep);setData(rep.data)})
  return (
    <>
{data && data}	
    </>
  );
}

export default App;
