import React from "react";
import SidebarC from "./SideBarC";
import '../../estilos/Plantilla.css'
export function PlantillaC({children}){
    return <div className="contenedorP">
        <SidebarC/>
        <>{children}</>
    </div>
}

