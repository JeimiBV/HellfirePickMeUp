import React from "react";
import { Routes, Route} from "react-router-dom";
import Formulario from "../componentes/Formulario"
import Informacion from "./Informacion";
import Productoslista from "./ListaProductos";
import MostrarProducto from "./Producto";


const NavPage = () =>{
    return(

             <Routes>
                    <Route path="/ListaProductos" element={<Productoslista/>}/>
                    <Route path="/formulario" element={<Formulario />}/>
                    <Route path="/Informacion/:id" element={<Informacion/>}/>
                    
                </Routes>
    )
}

export default NavPage; 