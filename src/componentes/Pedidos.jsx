import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from '../context/authContext';
import {todosPedidos} from './funciones'
import "../estilos/PedidosN.css"
import axios from "axios";

function MostrarPedidosN({ usuario }) {
   
    const { user } = useAuth();

    if (usuario != user.uid) {
        return <Navigate to="/" />
    }
    const [pedidos, setPedidos]=useState([])
    const [tablaPedi, setTablaPedi]= useState([]);
    const [busqueda, setBusqueda]= useState("");

    const url = "https://us-central1-base-de-datos-h.cloudfunctions.net/app/api/pedido";

    useEffect(() => {
        todosPedidos(setPedidos)
        todosPedidos(setTablaPedi)
    },[] )  
    
    function updatePedido(pedido) {
        console.log(`Id: ${pedido.id}`)
        axios
            .put(`${url}/${pedido.id}`, {
                
                Imagen: pedido.Imagen,
                PrecioUnitario: pedido.PrecioUnitario,
                PrecioTotal: pedido.PrecioTotal,
                Hora: pedido.Hora,
                FechaLimite: pedido.FechaLimite,
                Cantidad: pedido.Cantidad,
                Nota: pedido.Nota,
                FlagC: pedido.FlagC,
                FlagN: false,
                
            })
            .then((response) => {
                setPost(response.data);
                mostrarSi();
            });
        }

        const handleChange=e=>{
    
            if (/\s/.test(e.target.value)) {
                e.target.value = "";
                setBusqueda(e.target.value);
               
            }else{
                filtrar(e.target.value); 
            }                  
        }
         
    
    const pr1 = pedidos || []
    const pedidos1 = pr1.filter(pedido => {  
        return pedido.FlagN == true;
    }
    )
    const filtrar=(terminoBusqueda)=>{
        var resultadosBusqueda= tablaPedi.filter((elemento)=>{
          if(elemento.Nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
            return elemento.FlagN == true;
          }
        });
        setPedidos(resultadosBusqueda);
      } 

    const ListaPedidos = pedidos1.map(pedido => (
       
       
        <div class="col-9" key={pedido.id}>
             <div class="food_tile active">
                 <img src={pedido.Imagen} alt="" class="fda_product_img"/>
                 
                        <span class="food_name">{pedido.Nombre}</span>

                        <span class="food_detail">{pedido.Nota}</span>
                        <div className="listas">
                            <ul id="food_meta">
                                <li>
                                    Cantidad:
                                <span>{pedido.Cantidad}</span>
                                </li>
                                <li>
                                    Precio total:
                                <span>Bs {pedido.PrecioUnitario}</span>
                                </li>
                            </ul> 
                        </div>   
                        <div class="botonN">
                            <button type="button" class="btn btn-sm btn-default" onClick={()=> {updatePedido(pedido)}}>Entregado</button>
                        </div>    
             </div>
         </div>
    )
    
    )
    return(
     <div className="containerG mt-3">
    
    <h1 className="titleL"> Lista de pedidos </h1> 
                <div class="container-fluid">

                <div className="buscador">
                    <form class="d-flex justify-content-center" value={busqueda}  role="search" onChange={handleChange}>
                    <i class="bi bi-search px-3"></i>
                        <input class="form-control inputBusc me-2 px-4" type="search" placeholder="Ingrese el nombre del pedido..." aria-label="Search"  />              
                    </form>
                </div>

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