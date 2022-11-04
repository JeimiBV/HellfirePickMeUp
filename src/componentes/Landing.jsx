import React from 'react'

import Inicio from './CompLand/Inicio'
import Informacion from './CompLand/Informacion'
import Carrusel from './CompLand/CarruselInicio'
import Slider from './CompLand/Slider'
import MensajesP from './CompLand/Mensajes'
import Footer from './CompLand/Footer'

const Landing = () => {
  return (
    <div className='todo'> 
        
        <Carrusel/>
        <Informacion/>
        <Slider/>
        <MensajesP/>
        <Footer/>
    </div> 

  )
}
export default Landing