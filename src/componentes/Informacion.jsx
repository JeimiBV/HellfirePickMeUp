import React,{useState, useEffect} from "react";
import "../estilos/Informacion.css";
import imagen from "../imagenes/pique.png";
import { Link , useParams} from "react-router-dom";
import {unicoProducto} from './funciones'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Navigate } from "react-router-dom";
import { useAuth } from '../context/authContext'
function Informacion({usuario}){

    const { user, logout } = useAuth();
    
    if(usuario!=user.uid){
        return <Navigate to ="/"/>
    }

    const [producto, setProductos]=useState(null)
    const params = useParams()
    useEffect(() => {
        
        unicoProducto(params.id,setProductos)
    },[] )
    
    if(producto != null){
        return (
    <>
                <div className="todo">
        
        <h1 className="t"> {producto.Nombre}</h1>  


               <div className="Informacion">
                   
                       <div  className="desytip">
                          

                               <h2 className="encabezado">Descripcion:</h2>

                               <p className="Parrafo">{producto.Descripcion}</p>
                              <h2 className="encabezado">Tipo de producto:</h2> <p className="Parrafo">{producto.Tipo}</p>  
                               
                              <div className="a12">
                              <img width="100px" heigth="100px" className= "imagen_1" src={producto.Imagen} alt="" />

                              </div>
                                       
                                
                              
                               <Link to="/listaProductos"><button className="b12">CERRAR</button>
                               </Link>
                               

                   </div>    
                       

                       
               </div>
           
   </div>
    
    </>
    )}

}

export default Informacion