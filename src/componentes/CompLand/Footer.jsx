import React from 'react'
import '../../estilos/Landing.css'

const Footer = () => {
  return (
    <footer className='border-top bg-sucess-2 border-dark border-1 '>
        <div className='contenedor-footer row'>
            <div className='col-sm'>
                <h6 className='text-center'>
                    Pick me up              
                </h6>
                <h6 className='text-center'>
                    Salva la comida
                </h6>
                <p className='text-center' >
                    
                    El repositorio de la pagina se encuentra en    
                    <a href='https://github.com/JeimiBV/HellfirePickMeUp.git'>Pick me up</a>
                </p>
            </div>
            
        </div>
    
        
    </footer>
  )
}

export default Footer