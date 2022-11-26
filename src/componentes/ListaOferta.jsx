import React, { useEffect, useState } from "react";
import { todosProductos } from './funciones'
import '../estilos/Ofertas.css'
import { useAuth } from "../context/authContext";

const ListaOfertas = ({usuario}) => {

    const { user } = useAuth();
    
            if(usuario!=user.uid){
                return <Navigate to ="/"/>
            }

    const [productos, setProductos] = useState([])
    const [tablaProductos, setTablaProductos]= useState([]);
    const [busqueda, setBusqueda]= useState("");

    useEffect(() => {
        todosProductos(setProductos)
        todosProductos(setTablaProductos)
    }, [])

    const handleChange=e=>{

        
            setBusqueda(e.target.value);
            filtrar(e.target.value); 
        

    const fechaActual = new Date()  

    const ofertados = productos.filter(producto => 
        {   
            const fechaPr = new Date(producto.Fecha + 'T' + producto.Hora) 
            return  fechaPr > fechaActual && producto.Precio !== '';
        }
    ) 
  
    const filtrar=(terminoBusqueda)=>{
        var resultadosBusqueda= tablaProductos.filter((elemento)=>{
            const fechaPr = new Date(elemento.Fecha + 'T' + elemento.Hora)
          if(elemento.Nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
            return fechaPr > fechaActual && elemento.Precio !== '';
          }
        });
        setProductos(resultadosBusqueda);
      }  
        
    return (

        <>
            <div className=" containerL">
                <h1 className="text-center mt-3" > Lista de Ofertas </h1>
                <div className="buscador">
                    <form class="d-flex justify-content-center" value={busqueda}  role="search" onChange={handleChange}>
                        <input class="form-control inputBusc me-2" type="search" placeholder="Buscar" aria-label="Search"  />              
                    </form>
                </div>
                <div className="ofertasP">
                
                    {ofertados != null ? (
                        ofertados.map(oferta => (
                            <div  className="row row-col" key={oferta.id}>
                                <div class="card card-of border-success mb-2 bg-sucessP">

                                    <img src={oferta.Imagen} class="card-img-top imagenOf mt-2 mr-2" alt="..." />

                                    <div class="card-body card-letra text-capitalize">
                                        <h5 class="card-titleP text-center " >{oferta.Nombre}</h5>
                                        <p className="">
                                            <span > Precio: {oferta.Precio} bs.</span>
                                            <span className="d-block"> Hora Límite:{oferta.Hora} </span>
                                            <span className="d-block">Fecha Límite: {oferta.Fecha} </span>
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