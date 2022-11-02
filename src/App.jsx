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

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Cabecera/>
    </AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthProvider> <Login /> </AuthProvider>} />
        <Route path="/formulario" element={
          <AuthProvider>
            <ProtectedRoute>
            <Plantilla >
            <Formulario/>
            </Plantilla>
            </ProtectedRoute>
          </AuthProvider>} />
        <Route path="/listaProductos" element={
          <AuthProvider>
            <ProtectedRoute>
            <Plantilla>
            <Productoslista />
            </Plantilla>
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
