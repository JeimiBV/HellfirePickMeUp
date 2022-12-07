import React from "react";
import "../estilos/productos.css";
import { Link } from "react-router-dom";

const  MostrarProducto = (props) => {
   
        return(
            <div className="container">
            <h1 className="title"> Lista de productos </h1> 
                    <div className="productos">
                    <div className="producto" key={props.id}> 
                            
                            <div className="producto_imagen">
                                <Link to ={`/Informacion/${props.id}`}>
                                    <img className="imagen" src={props.Imagen} alt="" />
                                </Link>
                            </div>      
                
    
                        <div className="P_footer">
                                    <h1 className="nombre">{props.Nombre}</h1>       
                        </div>    
                    </div> 
                    </div>
                    </div> 
        )
       
}

export default MostrarProducto