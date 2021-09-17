import './App.css';
import React, {Fragment, useState} from 'react';
// import { RestSearch } from './API/dynamoDB';
import axios from "axios";

var baseUri = "https://yz8l6z59zh.execute-api.us-east-1.amazonaws.com/prod?";//path de dynamo DB
var foundSearch;

function App() {
  
  return (
    <div className="App">
      <div className="App-header">
        <div className="buscadorCuadro">
          <h1 className="h1-Title">Ingresa Datos</h1>
          <Buscador />
          <hr/>
          <p className="parraf">Resultado...</p>          
        </div>
      </div>
    </div>
  );
}

const Buscador = () =>{

  const [datoSearch, setDatos] = useState({
    tienda: '',
    referencia: '',
  })

  const handleInputChange = (event) => {
    setDatos({
      ...datoSearch,
      [event.target.name] : event.target.value,
    })
    
    console.log(datoSearch)
  }

  const buscarDatos_axios = (event) => {
    event.preventDefault();

    axios.get(baseUri + 'tienda=' + datoSearch.tienda + '&referencia=' + datoSearch.referencia)
    .then(result => {
       
      let expReg = new RegExp(".pdf" || "files" || "pdf", "ig");
      let expReg2 = new RegExp("report" || "documento" || "document", "ig");

      if(expReg.test(result.data.url) != true){
        if(expReg2.test(result.data.url) != true){
          console.log('no hay conincidencias')
        }else if(expReg2.test(result.data.url) === true){
          foundSearch = result;
          console.log('concidencia en la url es un pdf opcion 2 ', foundSearch);
          ConditionalView(true);
        }
      }else if(expReg.test(result.data.url) === true){
        foundSearch = result;
        console.log('concidencia en la url es un pdf opcion 1 ', foundSearch);
        ConditionalView(true);
      }
    }).catch(console.log());
  }
  
  return (
    <Fragment>
      <form onSubmit={buscarDatos_axios}>

        <div className="form-container">
          <div className="form-group">
            <input className="form-control" type="text" name="tienda" placeholder="tienda" onChange={handleInputChange}/>
          </div>

          <div className="form-group">
            <input className="form-control" type="text" name="referencia" placeholder="Referencia" onChange={handleInputChange}/>
          </div>
        </div>

        <button className="btn-Buscar" type="submit">Buscar</button>

      </form>
    </Fragment>
  )
}

function ConditionalView (condicion) {
  
  if(condicion != null || undefined){
    return (
      <App />
    )
  }else if(condicion === true){
    return (
      <div>
        <h1>Se obtuvo una url valida</h1>
        <button className="btn-Buscar" type="submit" >Volver</button>
      </div>
    )
  }
}

export default ConditionalView;
