import React, {useEffect, useState} from "react";
import "../estilos/productos.css";
import IMG1 from "../imagenes/pique.png";
import { Link } from "react-router-dom";
import {todosProductos} from './funciones'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


function Productoslista() {
   
    const [productos, setProductos]=useState(null)

    useEffect(() => {

        todosProductos(setProductos)
    },[] )

    return(   
    <>
    
    <div className="container">
    <h1 className="title"> Lista de productos </h1> 
    <div className="productos">

        {productos != null ? (

            productos.map(producto => (
  
                    <div className="producto" key={producto.id}> 
                             
                            <div className="producto_imagen">
                                <a href={`/Informacion/${producto.id}`}>
                                    <img className="imagen" src={producto.Imagen} alt="" />
                                </a>
                            </div>      
                

                        <div className="P_footer">
                                    <h1 className="nombre">{producto.Nombre}</h1>       
                        </div>    
                    </div>
                
                
                
              
            )           
             )
        ):('no hay productos')}
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