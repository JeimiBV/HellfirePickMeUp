import React from "react";
import "../estilos/Modals.css"


function Modals({ children, estado, estadoPantalla,texto }) {
    return (
        <>
            {estado &&
                <div className={estadoPantalla?"over":"over-complete"}>
                 <div className="card pt-5 pb-5 rounded-5" >
                <div className="card-body position-relative text-center">

                <i class="fa-solid fa-circle-exclamation fa-5x pb-3  "></i>
                    <h4>
                        {texto}
                    </h4>

                </div>
              </div>
                </div>
            }
        </>
    )

}
export default Modals