import React from "react";
import "../estilos/Menu.css"
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {todosCategorias} from "./funciones";
import { Navigate } from "react-router-dom";
import { useAuth } from '../context/authContext';

function Mostrarmenu({usuario}){
    const { user } = useAuth();
    // console.log(`1: ${usuario}`)
    // console.log(user.uid)
    if(usuario!=user.uid){
        return <Navigate to ="/"/>
    }
   
  const [categorias , setCategorias] = useState(null);

  useEffect(()=>{
      todosCategorias(setCategorias)
  },[]
  )
  const pr = categorias || []
  const Cat =  pr.map(categoria => (
                <Link to ={`/Oferta/${categoria.id}`} >
                <><div class="card cardMajo " key={categoria.id}>    
                            
                            <img className="pos1" src={categoria.Imagen} alt="" />
                            <div className="nombre_titulo">{categoria.Name} </div>
                        
                </div></>
                </Link>

       )
  )
  return (

    <div className="container1">
        <h5 className="title15"> Categorías </h5> 
                <div className="item">            
                     {Cat}
                </div>
        </div>

  )
}
export default Mostrarmenu;