import React, { useEffect, useState, setState } from "react";
import { todosPedidos } from "../funciones";
import '../../estilos/estilosPedidos.css';
import { useAuth } from "../../context/authContext";
import { getDownloadURL } from "firebase/storage";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
const ListaPedidos = ({ usuario }) => {

    const { user } = useAuth();

    if (usuario != user.uid) {
        return <Navigate to="/" />
    }

    const [pedidos, setPedidos] = useState(null)
    const [post, setPost] = useState(null);
    const url = "https://us-central1-base-de-datos-h.cloudfunctions.net/app/api/pedido";
    //const [productos, setProductos] = useState(null)
    //const [pedido, setPedidos] = useState(null)
    const params = useParams()
    useEffect(() => {
        todosPedidos(setPedidos)
        if (post !== null) {
            axios.get(`${url}/1`).then((response) => {
                setPost(response.data);
            });
        }
    }, [post])
    function updatePedido(pedidosC) {
        axios
            .put(`${url}/${pedidosC.id}`, {
                Imagen: pedidosC.Imagen,
                PrecioUnitario: pedidosC.PrecioUnitario,
                PrecioTotal: pedidosC.PrecioTotal,
                Hora: pedidosC.Hora,
                FechaLimite: pedidosC.FechaLimite,
                Cantidad: pedidosC.Cantidad,
                Nota: pedidosC.Nota,
                FlagC: false,
                FlagN: pedidosC.FlagN
            })
            .then((response) => {
                setPost(response.data);
            });
    }

    const fechaActual = new Date()
    const pr = pedidos || []

    const listaP = pr.filter(pedido => {
        const fechaPr = new Date(pedido.FechaLimite + 'T' + pedido.Hora)
        return pedido.FlagC == true;
    }
    )

    /*const deleteTask = (id) => {
        const filteredTasks = pr.filter(pedido => pedido.id !== id)
        setPedidos(filteredTasks)
        
    }*/

    return (

        <>
            <div className=" containerPed">
                <h1 className="titulo text-center m-4" > Pedidos </h1>
                
                <div className="buscador">
                    <form class="d-flex justify-content-center" value={busqueda}  role="search" onChange={handleChange}>
                           <i class="bi bi-search px-3"></i>
                        <input class="form-control inputBusc me-2" type="search" placeholder="Buscar" aria-label="Search"  />              
                    </form>
                </div>

                <div className="PedidosP">

                    {listaP != null ? (
                        listaP.map(pedidosC => (
                            <div className="row row-col"  key={pedidosC.id}>
                                <div class="cards" >
                                    <div class="link">
                                        <h5 class="card-tituloNombre text-center ">{pedidosC.Nombre}</h5>
                                    </div>
                                    <div class="face front">
                                    <img className="imgn" src={pedidosC.Imagen} alt=" " />
                                    </div>
                                    <div className=" face back" >
                                        <p className="" >
                                            <span > Precio: {pedidosC.PrecioUnitario} bs.</span>
                                            <span className="d-block"> Hora límite:{pedidosC.Hora} </span>
                                            <span className="d-block">Fecha límite: {pedidosC.FechaLimite} </span>
                                            <span className="d-block">Cantidad: {pedidosC.Cantidad} </span>
                                        </p>
                                    </div>
                                    <button className="botonEliminar" color="danger" onClick={()=>{updatePedido(pedidosC)}} >
                                    <i class="fa-regular fa-trash-can"></i></button>
                                </div>
                            
                                {/* <div class="card card-Pedido  bg-sucessP">
                                    <div class="card-body card-letra text-capitalize">
                                        <h5 class="card-tituloNombre text-center " >{pedidos.Nombre}</h5>
                                        <p className="">
                                            <span > Precio: {pedidos.Precio} bs.</span>
                                            <span className="d-block"> Hora Límite:{pedidos.Hora} </span>
                                            <span className="d-block">Fecha Límite: {pedidos.Fecha} </span>
                                            BsTrash
                                        </p>
                                    </div>
                                </div> */}

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