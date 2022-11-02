
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
import {useAuth}from './context/authContext'
import { ProtectedRoute } from './componentes/ProtectedRoute';
import LandingPage from './componentes/LandingPage';

const App = () =>{


    return(
          <BrowserRouter>
              <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/listaProductos" element={  
              <AuthProvider> <ProtectedRoute >
                <Productoslista/>
                </ProtectedRoute></AuthProvider> }/>

              <Route path="/formulario" element={  
              <AuthProvider>  <ProtectedRoute >
                <Formulario />
                </ProtectedRoute></AuthProvider> }/>
              
              <Route path="/Informacion/:id" element={  <AuthProvider> <Informacion/>   </AuthProvider> }/>
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
