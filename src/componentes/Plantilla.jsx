import React from "react";
import Sidebar from "./Sidebar";
import '../estilos/Plantilla.css'
export function Plantilla({children}){
    return <div className="contenedorP">
        <Sidebar/>
        <>{children}</>
    </div>
}