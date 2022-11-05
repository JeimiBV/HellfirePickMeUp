import { BrowserRouter, Routes, Route } from "react-router-dom";
//import LandingPage from './componentes/Landingpage'
import Login from './componentes/FormInicioS'
import Navpage from './componentes/Navpage'
import Productoslista from './componentes/ListaProductos'
import Informacion from './componentes/Informacion'
import Cabecera from './componentes/Cabecera'
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./componentes/ProtectedRoute";

import Formulario from './componentes/Formulario'
import { Plantilla } from "./componentes/Plantilla";
import { useState } from "react";
//import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import NabvarIni from './componentes/CompLand/Navbar';
import Landing from './componentes/Landing'
import LoginConsumidor from './paginas/LoginConsumidor';
import LoginNegocio from './paginas/LoginNegocio';

function App() {
const [usuario,setUsuario]= useState ("");

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
  console.log("id desde app es: " + usuario);
  return (
    <BrowserRouter>
    <AuthProvider>
    <Cabecera setUsuario={setUsuario}/> 
    </AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<AuthProvider> <Login usuario={usuario} /> </AuthProvider>} />
        <Route path="/formulario" element={
          <AuthProvider>
            <ProtectedRoute>
               <Plantilla >
                  <Formulario usuario={usuario}/>
                </Plantilla>
            </ProtectedRoute>
          </AuthProvider>} />
        <Route path="/listaProductos" element={
          <AuthProvider>
            <ProtectedRoute>
            <Plantilla>
            <Productoslista usuario={usuario} />
            </Plantilla>
            </ProtectedRoute>
          </AuthProvider>} />
        <Route path="/informacion/:id" element={
          <AuthProvider>
            <ProtectedRoute>
              <Informacion usuario={usuario} />
            </ProtectedRoute>
          </AuthProvider>} />
      </Routes>

      </BrowserRouter>
    
   
  )
}
export default App;
