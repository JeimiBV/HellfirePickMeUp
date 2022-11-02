import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './componentes/Landingpage'
import Login from './componentes/FormInicioS'
import Formulario from './componentes/Formulario'
import Productoslista from './componentes/ListaProductos'
import Informacion from './componentes/Informacion'
//import Cabecera from './componentes/Cabecera'
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./componentes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthProvider> <Login /> </AuthProvider>} />
        <Route path="/formulario" element={
          <AuthProvider>
            <ProtectedRoute>
              <Formulario />
            </ProtectedRoute>
          </AuthProvider>} />
        <Route path="/listaProductos" element={
          <AuthProvider>
            <ProtectedRoute>
              <Productoslista />
            </ProtectedRoute>
          </AuthProvider>} />
        <Route path="/informacion/:id" element={
          <AuthProvider>
            <ProtectedRoute>
              <Informacion />
            </ProtectedRoute>
          </AuthProvider>} />
      </Routes>
      </BrowserRouter>
  )
}
export default App;
