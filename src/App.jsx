
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import LandingPage from './componentes/Landingpage'
import LoginC from "./componentes/FormInicioS";
import LoginN from "./componentes/InicioNegocio";
//import NavbarIni from './componentes/CompLand/Navbar'
import Productoslista from "./componentes/ListaProductos";
import Informacion from "./componentes/Informacion";
import Cabecera from "./componentes/Cabecera";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./componentes/ProtectedRoute";

import Formulario from "./componentes/Formulario";
import { Plantilla } from "./componentes/Plantilla";
import { useState } from "react";
//import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Landing from "./componentes/Landing";
import Mostrarmenu from "./componentes/Menu";
import Mostraroferta from "./componentes/Oferta";
import ListaOfertas from "./componentes/ListaOferta";
import { PlantillaC } from "./componentes/Consumidor/PlantillaConsu";
import ListaPedidos from "./componentes/Consumidor/ListaPedidos"


function App() {
  const [userN, setUserN] = useState("QwXZyaODI9bQPoepSI1XyTYTeej1");
  const [userC, setUserC] = useState("3JY7KuYaN9W5WOy5Jbz7U16KKuw2");

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
        <Cabecera />
      </AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/loginC"
          element={
            <AuthProvider>
              {" "}
              <LoginC />{" "}
            </AuthProvider>
          }
        />
        <Route
          path="/loginN"
          element={
            <AuthProvider>
              <LoginN />
            </AuthProvider>
          }
        />
        <Route
          path="/formulario"
          element={
            <AuthProvider>
              <ProtectedRoute>
                <Plantilla>
                  <Formulario usuario={userN} />
                </Plantilla>
              </ProtectedRoute>
            </AuthProvider>
          }
        />
        <Route
          path="/listaProductos"
          element={
            <AuthProvider>
              <ProtectedRoute>
                <Plantilla>
                  <Productoslista usuario={userN} />
                </Plantilla>
              </ProtectedRoute>
            </AuthProvider>
          }
        />
        <Route
          path="/informacion/:id"
          element={
            <AuthProvider>
              <ProtectedRoute>
                <Plantilla>
                  <Informacion usuario={userN} />
                </Plantilla>
              </ProtectedRoute>
            </AuthProvider>
          }
        />
        <Route
          path="/menu"
          element={
            <AuthProvider>
              <ProtectedRoute>
               <PlantillaC>
               <Mostrarmenu usuario={userC} />
               </PlantillaC>
              </ProtectedRoute>
             
            </AuthProvider>
          }
        />
        <Route
          path="/oferta/:id"
          element={
            <AuthProvider>
              <ProtectedRoute>
              <PlantillaC>
              <Mostraroferta usuario={userC} />
              </PlantillaC>
              </ProtectedRoute>
            </AuthProvider>
          }
        />
        
        <Route
          path="/categorias"
          element={
            <AuthProvider>
              <ProtectedRoute>
              <PlantillaC>
                <Mostrarmenu usuario={userC} />
                </PlantillaC>
              </ProtectedRoute>
            </AuthProvider>
          }
        />
        <Route
          path="/listaPedidos"
          element={
            <AuthProvider>
              <ProtectedRoute>
              <PlantillaC>
                <ListaPedidos usuario={userC} />
                </PlantillaC>
              </ProtectedRoute>
            </AuthProvider>
          }
        />
        <Route
          path="/listaOfertas"
          element={
            <AuthProvider>
              <ProtectedRoute>
                <Plantilla>
                  <ListaOfertas usuario={userN} />
                </Plantilla>
              </ProtectedRoute>
            </AuthProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;