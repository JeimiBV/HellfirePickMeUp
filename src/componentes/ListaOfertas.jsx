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

  return (
    <div>ListaOfertas</div>
  )
}

export default ListaOfertas