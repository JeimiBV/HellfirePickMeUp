import React from 'react'
import React, {useEffect, useState} from "react";
import {todosProductos} from './funciones'

const ListaOfertas = () => {
    const [producto, setProducto]=useState(null)
    useEffect(() => {
        todosProductos(setProducto)
    },[] )

    const pr = producto || []

    const ofertados = pr.filter( ofert => 
        ofert.Fecha!== ''
        
    )

    const lista = ofertados.map(oferta =>   
      <div key={oferta.id}>)




      
  return (
      <div className="container">     
          <div className="ofertas"> {lista}</div>
      </div>
  )
    

}

export default ListaOfertas