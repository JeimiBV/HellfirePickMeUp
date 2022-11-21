import React, { useEffect, useState, setState } from "react";
import { todosProductos } from '../funciones'
import '../../estilos/estilosPedidos.css';
import { useAuth } from "../../context/authContext";
import { getDownloadURL } from "firebase/storage";

const ListaPedidos = ({ usuario }) => {

    const { user } = useAuth();

    if (usuario != user.uid) {
        return <Navigate to="/" />
    }

    const [productos, setProductos] = useState(null)
    const [pedido, setPedidos] = useState(null)
    //const params = useParams()
    useEffect(() => {
        todosProductos(setProductos)
    }, [])

    const fechaActual = new Date()
    const pr = productos || []

    const listaP = pr.filter(producto => {
        const fechaPr = new Date(producto.Fecha + 'T' + producto.Hora)
        return fechaPr > fechaActual && producto.Precio !== '';
    }
    )


    const deleteTask = (id) => {
        const filteredTasks = pr.filter(producto => producto.id !== id)
        setProductos(filteredTasks)
        
    }

    return (

        <>
            <div className=" containerPed">
                <h1 className="titulo text-center m-4" > Pedidos </h1>
                <div className="PedidosP">

                    {listaP != null ? (
                        listaP.map(pedidos => (
                            <div className="row row-col"  key={pedidos.id}>
                                <div class="cards" >
                                    <div class="link">
                                        <h5 class="card-tituloNombre text-center ">{pedidos.Nombre}</h5>
                                    </div>
                                    <div class="face front">
                                        <img src={pedidos.Imagen} alt=" " />
                                    </div>
                                    <div className=" face back" >
                                        <p className="" >
                                            <span > Precio: {pedidos.Precio} bs.</span>
                                            <span className="d-block"> Hora Límite:{pedidos.Hora} </span>
                                            <span className="d-block">Fecha Límite: {pedidos.Fecha} </span>
                                            <span className="d-block">Cantidad: {pedidos.Precio} </span>
                                        </p>
                                    </div>
                                    <button className="botonEliminar" color="danger" onClick={() =>deleteTask(pedidos.id)} >
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