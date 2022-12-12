import React, { useEffect, useState } from "react";
import { todosProductos } from './funciones'
import '../estilos/Ofertas.css'
import { useAuth } from './../context/authContext';

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
        if (/[A-Za-z]/.test(e.target.value) || !/\s/.test(e.target.value)) {
           filtrar(e.target.value); 
        }                 
    }

    const fechaActual = new Date()  

    const ofertados = productos.filter(producto => 
        {   
            const fechaPr = new Date(producto.Fecha + 'T' + producto.Hora) 
            console.log("El Stock es: " + producto.Stock)
            return  fechaPr > fechaActual && producto.Precio !== '' ;
        }
    ) 
  
    const filtrar=(terminoBusqueda)=>{
        var resultadosBusqueda= tablaProductos.filter((elemento)=>{
            const fechaPr = new Date(elemento.Fecha + 'T' + elemento.Hora)
          if(elemento.Nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
            return fechaPr > fechaActual && elemento.Precio !== '' ;
          }
        });
        setProductos(resultadosBusqueda);
      }  
        
    return (

        <>
            <div className=" containerL">
                <h1 className="TituloListaO text-center mt-3" > Lista de ofertas </h1>
                <div className="buscador">
                    <form class="d-flex justify-content-center" value={busqueda}  role="search" onChange={handleChange}>
                           <i class="bi bi-search px-3"></i>
                        <input class="form-control inputBusc me-2 px-5" type="search" placeholder=" Ingrese el nombre del producto ofertado..." aria-label="Search"  />              
                    </form>
                </div>
                <div className="ofertasP">
                
                    {ofertados != null ? (
                        ofertados.map(oferta => (
                            <div  className="row row-col" key={oferta.id}>
                                <div class="cardSpace">
                                <div class="card cardOf">    
                                        <img src={oferta.Imagen} className="imagenCard" alt="..." />
                                        <div className="card__overlay"> 
                                            
                                            <div class="card__header">  
                                            <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
                                            <img class="card__thumb" src={oferta.Imagen} alt="" />
                                                    <div class=" card__header-text">
                                                            <h5 class=" text-center text-capitalize card__title" >{oferta.Nombre}</h5>
                                                            </div>
                                                            </div>
                                                                <div className="card__description">
                                                                    <span className="d-block" > Precio: {oferta.Precio} bs.</span>
                                                                    <span className="d-block"> Hora límite:{oferta.Hora} </span>
                                                                    <span className="d-block">Fecha límite: {oferta.Fecha} </span>
                                                                
                                                    </div>             
                                            </div>           
                                       

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