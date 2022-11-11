import React from "react";
import "../estilos/Modals.css"
import '../estilos/Ofertar.css'

function Modals({ children, estado, cambiarEstado }) {
    return (
        <>
            {estado &&
                <div className="over">
                    {children}
                </div>
            }
        </>
        
    )
}
export default Modals