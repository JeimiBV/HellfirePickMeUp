
import React, { useEffect, useState } from "react";
import '../estilos/ofertaM.css'
import { useAuth } from "../context/authContext";
import { todosProductos } from './funciones'
import { Navigate } from "react-router-dom";

const ListaOfertas = ({usuario}) => {

    const { user } = useAuth();
    
            if(usuario!=user.uid){
                <Navigate to ="/"/>
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
        if (busqueda == " ") {
            alert("No puede ingresar espacios vacios");
        }else{
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

    const ListaOfertas = ofertados.map(oferta => (
        <div class="list-card" key={oferta.id}>

            <section>
                <h1 className="nombreO">{oferta.Nombre}</h1>
                <span class="price">Precio: {oferta.Precio}   Bs</span><br />

                <span class="price">Hora límite: {oferta.Hora} </span>

            </section>
            <section className="seccion1">
                <img src={oferta.Imagen} alt="" />
                <span class="list-category">
                    <p>{oferta.Descripcion} </p>
                </span>
            </section>
        </div>
    )
    )
    
    return (
        <div className="container89">
            <div class="default-hero-banner">
                <h1 className="gt pt-4">
                    Ofertas
                </h1>
                
            </div>
            <div className="buscador pt-2">
                <form class="d-flex justify-content-center" value={busqueda}  role="search" onChange={handleChange}>
                    <input class="form-control inputBusc me-2" type="search" placeholder="Buscar" aria-label="Search"  />              
                </form>
            </div>
            <div class="list-section">
                
                <div class="right-section">
                    <div class="list-cards">
                        {ListaOfertas}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ListaOfertas