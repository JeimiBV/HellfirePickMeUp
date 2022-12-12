import React from 'react'

import Informacion from './CompLand/Informacion'
import Carrusel from './CompLand/CarruselInicio'
import Slider from './CompLand/Slider'
import MensajesP from './CompLand/mensajes'
import Footer from './CompLand/Footer'

const Landing = () => {
  return (
    <div class="bg-light" > 
        <Carrusel/>
        <Informacion/>
        <MensajesP/>
        <Footer/>
    </div> 

  )
}
export default Landing