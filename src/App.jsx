
import './App.css'
import Cabecera from './componentes/Cabecera'
//import Sidebar from './componentes/Sidebar'
import React, { useState } from 'react'
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import FormIn from './componentes/FormInicioS'
import { AuthProvider } from './context/authContext'

import { Routes, Route} from "react-router-dom";
import Formulario from "./componentes/Formulario"
import Informacion from "./componentes/Informacion";
import Productoslista from "./componentes/ListaProductos";
import Login from "./componentes/FormInicioS"

const App = () =>{
    return(
          <BrowserRouter>
              <Routes>
              <Route path="/listaProductos" element={<Productoslista/>}/>
              <Route path="/formulario" element={<Formulario />}/>
              <Route path="/Informacion/:id" element={<Informacion/>}/>
              <Route path="/Login" element={  <AuthProvider> <Login/> </AuthProvider> }/>
              </Routes>
          </BrowserRouter>

    )
}

//import Navpage from "./componentes/Navpage"
/*<Sidebar/>
  <Navpage/>*/


//function App() {

  //const [valido, setValido] = useState( {estado1: false, estado2: false, estado3: false, estado4: false});
/*

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
*/
export default App
