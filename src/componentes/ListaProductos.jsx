import React, {useEffect, useState} from "react";
import "../estilos/productos.css";

import { Navigate } from "react-router-dom";
import { useAuth } from '../context/authContext'
import Axios from "axios";


function Productoslista({usuario}) {
     //codigo para bloquear la ida hacia atras
     window.location.hash="no-back-button";
     window.location.hash="Again-No-back-button";//esta linea es necesaria para chrome
     window.onhashchange=function(){window.location.hash="no-back-button";}
    const { user } = useAuth();
    
    if(usuario!=user.uid){
        return <Navigate to ="/"/>
    }
  
    const[productos, setProductos] = useState([])
    const [tablaProductos, setTablaProductos]= useState([]);
    const [busqueda, setBusqueda]= useState("");
     
    const todosProductos = async () =>{

        const peticion =  Axios({
            method: "GET",
            url: "https://us-central1-base-de-datos-h.cloudfunctions.net/app/api/products",
        }).then(response => {
            if (!response.data.error) {
                setProductos(response.data)
                setTablaProductos(response.data)
            } else {
                console.log(response.data.error[0]);
            }
        })
            .catch(err => {
                console.log(err)
            });
        console.log(peticion)
    }

    const handleChange=e=>{
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }

    const filtrar=(terminoBusqueda)=>{
        var resultadosBusqueda=tablaProductos.filter((elemento)=>{
          if(elemento.Nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
            return elemento;
          }
        });
        setProductos(resultadosBusqueda);
      } 
  
      useEffect(()=>{
        todosProductos();
        },[])
 
    return(   
    <>
     
    <div className="containerG mt-3">
    
    <h1 className="titleL"> Lista de productos </h1> 

        <div className="buscador">
             <form class="d-flex justify-content-center" value={busqueda}  role="search" onChange={handleChange}>
                <input class="form-control inputBusc me-2" type="search" placeholder="Buscar" aria-label="Search"  />                    <button class="btn btn-outline-success" type="submit">Buscar</button>
            </form>
        </div>

    <div className="productos">

    {productos && 
            
        productos.map(producto => (
  
            <div className="producto" key={producto.id}>                  
                <div className="producto_imagen">
                    <a href={`/Informacion/${producto.id}`}>
                        <img className="imagen" src={producto.Imagen} alt="" />
                    </a>
                </div> 

                <div className="P_footer">
                    <h1 className="nombreL">{producto.Nombre}</h1>       
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