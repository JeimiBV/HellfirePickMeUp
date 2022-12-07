import React from "react";
import "../estilos/Modals.css"
import '../estilos/Pedido.css'

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