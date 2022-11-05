import React from "react";
import { Routes, Route} from "react-router-dom";
import Formulario from "../componentes/Formulario"
import Informacion from "./Informacion";
import Productoslista from "./ListaProductos";
import ListaOfertas from "./ListaOfertas";

const NavPage = () =>{
    return(

             <Routes>
                    <Route path="/listaProductos" element={<Productoslista/>}/>
                    <Route path="/formulario" element={<Formulario />}/>
                    <Route path="/Informacion/:id" element={<Informacion/>}/>
                    <Route path="/ListaOfertas" element={<ListaOfertas/>}/>
                </Routes>
    )
}

export default NavPage; 