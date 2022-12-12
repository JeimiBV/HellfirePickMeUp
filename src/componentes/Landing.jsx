import React from 'react'

import Informacion from './CompLand/Informacion'
import Carrusel from './CompLand/CarruselInicio'
import MensajesP from './CompLand/mensajes'
import Footer from './CompLand/Footer'

const Landing = () => {
  return (
    <div className='bg-white'> 
        <Carrusel/>
        <Informacion/>
        <MensajesP/>
        <Footer/>
    </div> 

  )
}
export default Landing