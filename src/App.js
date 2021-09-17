import './App.css';
import React, {Fragment, useState} from 'react';
// import { RestSearch } from './API/dynamoDB';
import axios from "axios";
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

var baseUri = "https://yz8l6z59zh.execute-api.us-east-1.amazonaws.com/prod?";//path de dynamo DB
var foundSearch;
var urlSearch;

function App (){

  const [datoSearch, setDatos] = useState({
    tienda: '',
    referencia: '',
    abierto: false,
  })

  const handleInputChange = (event) => {
    setDatos({
      ...datoSearch,
      [event.target.name] : event.target.value,
    })
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
          urlSearch = result.data.url;
          setDatos({
            ...datoSearch,
            abierto: !datoSearch.abierto
          })
          console.log(foundSearch);
        }
      }else if(expReg.test(result.data.url) === true){
        foundSearch = result;
        urlSearch = result.data.url;
        setDatos({
          ...datoSearch,
          abierto: !datoSearch.abierto
        })
        console.log(foundSearch);
      }
    }).catch(console.log());
  }

  return (
    <div className="Body">
      <div className="buscadorCuadro">
        <h1 className="h1-Title">Ingresa Datos</h1>

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

        <hr/>
        <p className="parraf">Resultado...</p>          
      </div>
      
      <Modal className="Modal" isOpen={datoSearch.abierto}>
        <ModalHeader>
          <h1>Resultados de la busqueda</h1>
        </ModalHeader>
        <ModalBody>
          <object type="application/pdf" data={urlSearch}> </object>
        </ModalBody>
      </Modal>
    </div>
  )
  
}

export default App;
