import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './componentes/Landingpage'
import Login from './componentes/FormInicioS'
import Navpage from './componentes/Navpage'
import Productoslista from './componentes/ListaProductos'
import Informacion from './componentes/Informacion'
import Cabecera from './componentes/Cabecera'
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./componentes/ProtectedRoute";
import Sidebar from "./componentes/Sidebar";
import Formulario from './componentes/Formulario'
import { Plantilla } from "./componentes/Plantilla";
import { useState } from "react";

function App() {
const [user,setUser]= useState ("QwXZyaODI9bQPoepSI1XyTYTeej1");

  return (
    <BrowserRouter>
    <AuthProvider>
      <Cabecera/>
    </AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthProvider> <Login usuario={user} /> </AuthProvider>} />
        <Route path="/formulario" element={
          <AuthProvider>
            <ProtectedRoute>
               <Plantilla >
                  <Formulario usuario={user}/>
                </Plantilla>
            </ProtectedRoute>
          </AuthProvider>} />
        <Route path="/listaProductos" element={
          <AuthProvider>
            <ProtectedRoute>
            <Plantilla>
            <Productoslista usuario={user} />
            </Plantilla>
            </ProtectedRoute>
          </AuthProvider>} />
        <Route path="/informacion/:id" element={
          <AuthProvider>
            <ProtectedRoute>
              <Informacion usuario={user} />
            </ProtectedRoute>
          </AuthProvider>} />
      </Routes>

      </BrowserRouter>
  )
}
export default App;
