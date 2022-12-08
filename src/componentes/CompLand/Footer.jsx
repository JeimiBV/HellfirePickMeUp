import React from 'react'
import './Footer.css'
import Image from "../../imagenes/logo-9.png";

const Footer = () => {
  return (
    <div>
        
        <footer class="footer">
            <div className='container-fluid'>
                <div class="row row-cols-1">
                    <div class="col d-flex justify-content-center">
                        <img class="logoF m-2 p-2" src={Image} />
                    </div> 

                    <div class="col d-flex justify-content-center">
                    <p>
                        El repositorio de la página se encuentra en    
                        <a href='https://github.com/JeimiBV/HellfirePickMeUp.git'>Pick-me-up</a>
                    </p>
                    </div> 
                    
                    <div class="col d-flex justify-content-center">
                        
                  
                        <p>© Copyright 2022 Hellfire Club.</p> 
                        
                    </div>   

                </div>
            </div>
            
        
        </footer>
    </div>
  )
}

export default Footer