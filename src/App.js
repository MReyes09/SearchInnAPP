import './App.css';
import React, {Fragment, useState} from 'react';
// import { RestSearch } from './API/dynamoDB';
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import swal from 'sweetalert';

var baseUri = "https://yz8l6z59zh.execute-api.us-east-1.amazonaws.com/prod?";//path de dynamo DB
var foundSearch;
var urlSearch;

function App (){

  const [datoSearch, setDatos] = useState({
    tienda: '',
    referencia: '',
    abierto: false,
    url: null,
    estado: true,
  })

  let exRegMovil = new RegExp('Android' || 'iPhone', "ig");
  const condicion = exRegMovil.test(navigator.userAgent);

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
          swal({
            title: "Peticion exitosa",
            text: "No se encontro una url o no existe un documento",
            icon: 'warning',
          });
        }else if(expReg2.test(result.data.url) === true){
          foundSearch = result;
          setDatos({
            ...datoSearch,
            url: result.data.url,
            estado: false,
          })

          if(condicion === false){
            setDatos({
              ...datoSearch,
              abierto: !datoSearch.abierto,
              url: result.data.url,
            })
            swal({
              title: "Peticion exitosa",
              text: "PDF encontrado!!",
              icon: 'success',
            });
          }else{
            swal({
              title: "Peticion exitosa",
              text: "Ya puedes descargar tu PDF!!",
              icon: 'success',
            });
          }
        }
      }else if(expReg.test(result.data.url) === true){
        foundSearch = result;
        setDatos({
          ...datoSearch,
          url: result.data.url,
          estado: false,
        })

        if(condicion === false){
          setDatos({
            ...datoSearch,
            abierto: !datoSearch.abierto,
            estado: false,
            url: result.data.url,
          })
          swal({
            title: "Peticion exitosa",
            text: "PDF encontrado!",
            icon: 'success',
          });
        }else{
          swal({
            title: "Peticion exitosa",
            text: "Ya puedes descargar tu PDF!!",
            icon: 'success',
          });
        }
      }else{
        setDatos({
          ...datoSearch,
          estado: true,
          url: null,
        })
      }
    }).catch(console.log());
  }

  const btnCerrar  = (event)  =>{
    setDatos({
      ...datoSearch,
      abierto: !datoSearch.abierto
    })
  }

  return (
    <>
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

          <button className="btn-Buscar" type="submit" >Buscar</button>
        </form>
        <hr/>
        { condicion ? <button className="button button3" disabled={datoSearch.estado}><a className="parraf" target="_self" href={datoSearch.url} download="pdf" > Descarga el PDF </a> </button>: 
                      <p className="parraf">Resultado...</p> }        
      </div>
    </div>
    
    <div>
      <Modal isOpen={datoSearch.abierto}>
          <ModalHeader>
            <button className="close" onClick={btnCerrar}>&times;</button>
            <h1>Resultados de la busqueda</h1>
          </ModalHeader>
          <ModalBody >
            <object className="pdfView" type="application/pdf" data={datoSearch.url} > </object>
          </ModalBody>
          <ModalFooter>
            <h3>tienda: {datoSearch.tienda} / referencia: {datoSearch.referencia}</h3>
          </ModalFooter>
      </Modal>
    </div>
    </>
  )
  
}

export default App;
