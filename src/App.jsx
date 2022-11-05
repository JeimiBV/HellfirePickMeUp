import { BrowserRouter, Routes, Route } from "react-router-dom";
//import LandingPage from './componentes/Landingpage'
import Login from './componentes/FormInicioS'
//import NavbarIni from './componentes/CompLand/Navbar'
import Productoslista from './componentes/ListaProductos'
import Informacion from './componentes/Informacion'
import Cabecera from './componentes/Cabecera'
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./componentes/ProtectedRoute";

import Formulario from './componentes/Formulario'
import { Plantilla } from "./componentes/Plantilla";
import { useState } from "react";
//import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Landing from './componentes/Landing'

function App() {
const [userN,setUserN]= useState ("QwXZyaODI9bQPoepSI1XyTYTeej1");
const [userC,setUserC]= useState ("3JY7KuYaN9W5WOy5Jbz7U16KKuw2");

/**<div className='App'>
     <Router>
        <NabvarIni/> 
          <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/loginConsumidor' element={<LoginConsumidor/>}/>
            <Route path='/loginNegocio' element={<LoginNegocio/>}/>
          </Routes>  
      </Router>
    </div> */

  return (
    <BrowserRouter>
    <AuthProvider>
    <Cabecera/> 
    </AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<AuthProvider> <Login/> </AuthProvider>} />
        <Route path="/formulario" element={
          <AuthProvider>
            <ProtectedRoute>
               <Plantilla >
                  <Formulario usuario={userN}/>
                </Plantilla>
            </ProtectedRoute>
          </AuthProvider>} />
        <Route path="/listaProductos" element={
          <AuthProvider>
            <ProtectedRoute>
            <Plantilla>
            <Productoslista usuario={userC} />
            </Plantilla>
            </ProtectedRoute>
          </AuthProvider>} />
        <Route path="/informacion/:id" element={
          <AuthProvider>
            <ProtectedRoute>
              <Informacion usuario={userN} />
            </ProtectedRoute>
          </AuthProvider>} />
      </Routes>

      </BrowserRouter>
    
   
  )
}
export default App;
