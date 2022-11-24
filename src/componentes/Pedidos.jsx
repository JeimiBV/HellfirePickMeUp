import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from '../context/authContext';
import {todosProductos} from './funciones'

import "../estilos/PedidosN.css"
function MostrarPedidosN({ usuario }) {
    const { user } = useAuth();

    if (usuario != user.uid) {
        return <Navigate to="/" />
    }
    const [productos, setProductos]=useState(null)

    useEffect(() => {
        todosProductos(setProductos)
    },[] )  
    const pr = productos|| []

    const ListaOfertas = pr.map(producto => (
        <div class="col-9" key={producto.id}>
             <div class="food_tile active">
                 <img src={producto.Imagen} alt="" class="fda_product_img"/>
                 
                        <span class="food_name">{producto.Nombre}</span>

                        <span class="food_detail">{producto.Descripcion}</span>

                        <ul id="food_meta">
                        <li>
                            Cantidad:
                        <span>325 CAL</span>
                        </li>
                        <li>
                            Precio:
                        <span><i class="fa fa-inr"></i> 550</span>
                        </li>
                        </ul>    
                        <div class="botonN">
                        <button type="button" class="btn btn-sm btn-default">Entregado</button>
                        </div>

                        
                
                   
             </div>
         </div>
    )
    )
    return(
     <div className="containerG mt-3">
    
        <h1 className="titleL"> Lista de pedidos </h1> 
                <div class="container-fluid">

                    <div id="fda_app" class="row">
            
                            <section id="fda_product_tile" class="col-12">
                        
                                <div class="row fda_food_row">
                                    
                                   {ListaOfertas}
                                
                                
                                </div>

                            </section>
            
                    </div>
            </div>
  </div>


    )
    

}
export default MostrarPedidosN;