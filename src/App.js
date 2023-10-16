import './App.css';
import { useState, useEffect, useRef } from 'react';


function App() {
const apiRest = "http://localhost/api/students"
let datosApi = useRef([])
let [visibilityDatos, setVisibilityDatos] = useState(false)


useEffect(()=> {
  fetch(apiRest).
  then(res => res.json()).
  then(data => {
     datosApi.current = data
     console.log(datosApi.current)
  }).catch(error => {
    console.error('Error en la solicitud:', error);
  });
} ,[])

const functionVisibility = () => {
  setVisibilityDatos(!visibilityDatos)
}

const functionPrintData = (datos) => {
  return(
    <ul>
      {datos.map((dat, index) => {
        return(
       <li key={index}>{dat.name}, {dat.edad}</li>
       )})}
    </ul>
  )
}


return(
<div>
<button onClick={() => {
  functionVisibility()
}}>PINTAR DATOS</button>
<div>{visibilityDatos && functionPrintData(datosApi.current)}</div>

</div>

)}

export default App;
