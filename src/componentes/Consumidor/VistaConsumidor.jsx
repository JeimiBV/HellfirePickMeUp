import React, { useEffect, useState } from "react";
import '../../estilos/BusquedaOfertas.css'
import { useAuth } from '../../context/authContext';
import { Navigate } from "react-router-dom";
import {todosProductos} from '../funciones'


const VistaConsumidor = ({usuario}) => {

    const { user } = useAuth();
    
            if(usuario!=user.uid){
              return  <Navigate to = "/"/>
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
                    <div className=" containerLargo">
                        <h1 className="tituloProducto text-center mt-3" > ¡Busca un producto! </h1>
        
                        <div className="buscador">
                            <form class="d-flex justify-content-center" value={busqueda}  role="search" onChange={handleChange}>
                                  <i class="bi bi-search px-3"></i>
                                <input class="form-control inputBusc me-2 px-5" type="search" placeholder=" Ingrese el nombre del producto..." aria-label="Search"  />                    
                            </form>
                        </div>
        
                        <div className="ofertasDelosProductos"> 
                        
                            { 
                                ofertados.map(oferta => (
                                    <div  className="row row-col" key={oferta.id}>
                                        <div class="card card-ofP  mb-2 bg-sucessPedido">
                                        <span class="Banner">
                                        <span className="d-block1">Hora límite:{oferta.Hora} </span>
                                        <span className="d-block">Fecha límite: {oferta.Fecha} </span>   
                                        <h1 className="Descri">Descripción :</h1>

                                        <p className="DescripcionAd">{oferta.Descripcion} </p>
                                                                    </span>
                                                                    
                                            
                                            <img src={oferta.Imagen} class="card-img-top imagenOf mt-2 mr-2" alt="..." />
                                            
                                            
                                            <div className="DisenioCard ">
                                            <div class="card-body card-letra ">
                                                <h5 class="card-titleProducto text-center text-capitalize" >{oferta.Nombre}</h5>
                                                <p className="precioAd">
                                            
                                                    <span > Precio: {oferta.Precio} bs.</span>
                                                    
                                                    
                                                    
                                                </p>
                                              </div>
                                            </div>
                                        </div>
        
                                    </div>
                                )
                                )
                           }
                        </div>
                    </div>
        
                </>
            )
        }

export default VistaConsumidor