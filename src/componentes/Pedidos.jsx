import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from '../context/authContext';
import {todosPedidos} from './funciones'
import "../estilos/PedidosN.css"

function MostrarPedidosN({ usuario }) {
   
    const { user } = useAuth();

    if (usuario != user.uid) {
        return <Navigate to="/" />
    }
    const [pedidos, setPedidos]=useState(null)

    useEffect(() => {
        todosPedidos(setPedidos)
    },[] )  
    
    function updatePedido() {
        axios
            .put(`${url}/${params.id}`, {
                
                Imagen: pedidos.Imagen,
                PrecioUnitario: pedidos.PrecioUnitario,
                PrecioTotal: pedidos.PrecioTotal,
                Hora: pedidos.Hora,
                FechaLimite: pedidos.FechaLimite,
                Cantidad: pedidos.Cantidad,
                Nota: pedidos.Nota,
                FlagC: pedidos.FlagC,
                FlagN: false,
                
            })
            .then((response) => {
                setPost(response.data);
                mostrarSi();
            });
    }
    const pr1 = pedidos || []
    const pedidos1 = pr1.filter(pedido => {
        
        return pedido.FlagN == true;
    }
    )

    const ListaPedidos = pedidos1.map(pedido => (
       
       
        <div class="col-9" key={pedido.id}>
             <div class="food_tile active">
                 <img src={pedido.Imagen} alt="" class="fda_product_img"/>
                 
                        <span class="food_name">{pedido.Nombre}</span>

                        <span class="food_detail">{pedido.Nota}</span>

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
                        <button type="button" class="btn btn-sm btn-default" onChange={updatePedido}>Entregado</button>
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
                                    
                                   {ListaPedidos}
                                
                                </div>

                            </section>
            
                    </div>
            </div>
     </div>


    )
    

}
export default MostrarPedidosN;