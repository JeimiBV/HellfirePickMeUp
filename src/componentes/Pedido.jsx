import React from "react";
import "../estilos/Modals.css"
import '../estilos/Ofertar.css'

function Pedido({ children, estado, cambiarEstado }) {
    return (
        <>
            {estado &&
                <div className="over-complete ">
                    {children}
                </div>
            }
        </>
        
    )
}
export default Pedido