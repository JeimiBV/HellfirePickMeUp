import React from 'react'
import React, {useEffect, useState} from "react";
import {todosProductos} from './funciones'
import '../estilos/Ofertas.css'

const ListaOfertas = () => {
    const [producto, setProducto]=useState(null)
    useEffect(() => {
        todosProductos(setProducto)
    },[] )

    const pr = producto || []

    const ofertados = pr.filter( ofert => 
        ofert.Fecha !== ' '
        
    )

    const lista = ofertados.map(oferta =>   
      <div key={oferta.id}>
        <div className="row row-col" >  
                <div class="card border-success mb-2 bg-sucess">
                    <img src={oferta.Imagen} class="card-img-top mt-2 mr-2  " alt="..." width='50' height='150'/>         
                    <div class="card-body text-capitalize">
                            <h5 class="card-title text-center " >{oferta.Nombre}</h5>                                         
                              <p > 
                                <span > Precio: {oferta.Precio} </span> 
                                <span className="d-block"> Hora Limite:{oferta.Hora} </span>  
                                <span className="d-block">Fecha Limite: {oferta.Fecha} </span> 
                            </p>   
                        </div>                     
                </div>
            </div>
        </div>
    )
            
   return (
    
        <div className="container">                                                                                                                                             <h1 className=" text-center " > Lista de Ofertas </h1>      
            <div className="ofertas"> {lista}</div>
        </div>
    
    )
}

export default ListaOfertas