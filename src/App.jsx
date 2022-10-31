import './App.css'
import Cabecera from './componentes/Cabecera'
//import Sidebar from './componentes/Sidebar'
import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import FormIn from './componentes/FormInicioS'
import { AuthProvider } from './context/authContext'
//import Navpage from "./componentes/Navpage"
/*<Sidebar/>
  <Navpage/>*/


function App() {

  //const [valido, setValido] = useState( {estado1: false, estado2: false, estado3: false, estado4: false});


  return (
    <Router>
      <div className='App'>
        <AuthProvider>
          <Cabecera />
          <div className='contenedor-form'>
            <FormIn />
          </div>
        </AuthProvider>
      </div>
    </Router>
  )
}

export default App
