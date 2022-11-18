import React, { useEffect, useState } from "react";
import { todosProductos } from '../funciones'
import '../../estilos/estilosPedidos.css';
import { useAuth } from "../../context/authContext";

const ListaPedidos = ({usuario}) => {

    const { user } = useAuth();
    
            if(usuario!=user.uid){
                return <Navigate to ="/"/>
            }

    const [productos, setProductos] = useState(null)
    useEffect(() => {
        todosProductos(setProductos)
    }, [])

    const fechaActual = new Date()
    const pr = productos || []

    const listaP = pr.filter(producto => 
        {   
            const fechaPr = new Date(producto.Fecha + 'T' + producto.Hora) 
            return  fechaPr > fechaActual && producto.Precio !== '';
        }
    )   
        
    return (

        <>
            <div className=" containerL">
            <h1 className="titulo text-center m-4" > Pedidos </h1>
                <div className="PedidosP">
            
                    {listaP != null ? (
                        listaP.map(pedidos => (
                            <div  className="row row-col" key={pedidos.id}>
                                <div class="card card-Pedido  bg-sucessP">
                                    <div class="card-body card-letra text-capitalize">
                                        <h5 class="card-tituloNombre text-center " >{pedidos.Nombre}</h5>
                                        <p className="">
                                            <span > Precio: {pedidos.Precio} bs.</span>
                                            <span className="d-block"> Hora Límite:{pedidos.Hora} </span>
                                            <span className="d-block">Fecha Límite: {pedidos.Fecha} </span>
                                        </p>
                                    </div>
                                </div>

                            </div>
                        )
                        )
                    ) : ('no hay productos')}
                </div>
            </div>

        </>
    )
}

export default ListaPedidos