import './App.css';
import React, {Fragment, useState} from 'react';

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
  }

  const buscarDatos = (event) => {
    event.preventDefault();

    
  }
  
  return (
    <Fragment>
      <form onSubmit={buscarDatos}>

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

export default App;
