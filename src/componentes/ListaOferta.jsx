import React, { useEffect, useState } from "react";
import { todosProductos } from './funciones'
import '../estilos/Ofertas.css'
import { useAuth } from "../context/authContext";

const ListaOfertas = ({usuario}) => {

    const { user } = useAuth();
    
            if(usuario!=user.uid){
                return <Navigate to ="/"/>
            }

    const [producto, setProducto] = useState(null)
    useEffect(() => {
        todosProductos(setProducto)
    }, [])

    const pr = producto || []

    const ofertados = pr.filter(ofert =>
        ofert.Precio !== ''

    )

    return (

        <>
            <div className="container">
                <h1 className="text-center " > Lista de Ofertas </h1>
                <div className="ofertasP">
                    {ofertados != null ? (
                        ofertados.map(oferta => (
                            <div className="row row-col" key={oferta.id}>
                                <div class="card card-of border-success mb-2 bg-sucessP">

                                    <img src={oferta.Imagen} class="card-img-top imagenOf mt-2 mr-2" alt="..." />

                                    <div class="card-body card-letra text-capitalize">
                                        <h5 class="card-titleP text-center " >{oferta.Nombre}</h5>
                                        <p className="">
                                            <span > Precio: {oferta.Precio} </span>
                                            <span className="d-block"> Hora Limite:{oferta.Hora} </span>
                                            <span className="d-block">Fecha Limite: {oferta.Fecha} </span>
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

export default ListaOfertas