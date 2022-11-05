import React from "react";
import "../estilos/Menu.css"
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {todosCategorias} from "./funciones";

function Mostrarmenu(){

  const [categorias , setCategorias] = useState(null);

  useEffect(()=>{
      todosCategorias(setCategorias)
  },[]
  )
  return (

    <div className="container1">
    <h5 className="title15"> Categorias </h5> 
    <div className="item">            
                {categorias != null? (

                   categorias.map(categoria => (
                          <Link to ={`/Oferta/${categoria.id}`} >
                            <><div class="card" key={categoria.id}>    
                                      
                                      <img className="pos1" src={categoria.Imagen} alt="" />
                                      <div className="nombre_titulo">{categoria.Name} </div>
                                  
                            </div></>
                          </Link>
                   
                         )
                  )

                ):('no hay categorias')}
                    
                   
                    
                  
                  </div>
        </div>


  )
}
export default Mostrarmenu;