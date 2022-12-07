import React, {useEffect, useState} from "react";
import "../estilos/productos.css";
import {todosProductos} from './funciones'
import { Navigate } from "react-router-dom";
import { useAuth } from '../context/authContext'



function Productoslista({usuario}) {
     //codigo para bloquear la ida hacia atras
     window.location.hash="no-back-button";
     window.location.hash="Again-No-back-button";//esta linea es necesaria para chrome
     window.onhashchange=function(){window.location.hash="no-back-button";}
    const { user } = useAuth();
    
    if(usuario!=user.uid){
        return <Navigate to ="/"/>
    }
  

    const [productos, setProductos]=useState([])
    const [tablaProductos, setTablaProductos]= useState([]);
    const [busqueda, setBusqueda]= useState("");

    useEffect(() => {
        todosProductos(setProductos)
        todosProductos(setTablaProductos)
    },[] )
    
    const handleChange=e=>{
        setBusqueda(e.target.value);
        if (/[A-Za-z]/.test(e.target.value) || !/\s/.test(e.target.value)) {
           filtrar(e.target.value); 
        }                  
    }

    const filtrar=(terminoBusqueda)=>{
        var resultadosBusqueda=tablaProductos.filter((elemento)=>{
          if( elemento.Nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
            return elemento;
          }
        });
        setProductos(resultadosBusqueda);
      }
    const pr = productos || []
    const listaProductos= pr.map(producto => (
        <div class="image">
        <img class="image__img" src={producto.Imagen} alt="Bricks"/>
        <span className="image_div1"> {producto.Nombre}</span>
        <div class="image__overlay image__overlay--primary">
            <div class="image__title">{producto.Nombre}</div>
            <p class="image__description">
                {producto.Descripcion}
            </p>
            <div className="boton">
            <button class="button button--tamaya button--round-l button--text-thick button--border-medium button--text-upper button--size-s button--inverted" data-text="Ofertar"><span>Ofertar</span></button>
            </div>
        </div>
        
        </div>
                
               
        
        ) )
    return(   
   
     
<div className="containerGHU1 mt-3">
    
    <h1 className="titleL"> Lista de productos </h1> 
    <div className="buscador">
        <form class="d-flex justify-content-center" value={busqueda}  role="search" onChange={handleChange}>
            <i class="bi bi-search px-3"></i>
            <input class="form-control inputBusc me-2 px-4" type="search" placeholder=" Ingrese el nombre del producto..." aria-label="Search"  />              
        </form>
    </div>

        <div className="productos">
             {listaProductos}
             
            
        </div>
      
      </div>
      
    
 
    )
}

export default Productoslista

/*<div className="productos">

<div className="producto" key={producto.id}>

    <a href={`/informacion/${producto.id}`}>
        <img className="imagen" src={producto.image} alt="" />
        </a>
       <h1 className="nombre">{producto.name}</h1>                               

</div>
</div>*/

/*<div className="container">

         <h1 className="title"> Lista de productos </h1> 
         
                <div className="productos">  
                    <div className="producto"> 
                    <Link to = "/Informacion">           
                            <div className="producto_imagen">
                                <img src={producto.image} alt="" />
                            </div>      
                            </Link>         

                        <div className="P_footer">
                                    <h1 className="nombre"> pique</h1>       
                        </div>    
                    </div>
                </div>  
             
    </div>*/