import React from "react";
import "../estilos/Modals.css"


function Modals({  estado, estadoPantalla,texto, titulo, mostrarSi, mostrarNo,buttons }) {
    return (
        <>
            {estado &&
                <div className={estadoPantalla?"over":"over-complete"}>
                 <div className="card pt-5 pb-5 rounded-5" >
                <div className="card-body position-relative text-center">
                <i class="fa-solid fa-circle-exclamation fa-5x pb-3  "></i>
                
                    <h2>
                    {titulo}
                    </h2>
                    <h4>
                        {texto}
                    </h4>

                </div>
                <div className={buttons?"botones":"transparent"}>
                    <button type="submit" className="left" onClick={mostrarSi}>Si</button>
                    <button className="right" onClick={mostrarNo}>No</button>
                </div>
              </div>
                </div>
                //////////////////////////////////////
               
            }
        </>
    )

}
export default Modals

//<i class="fa-solid fa-circle-exclamation fa-5x pb-3  "></i>