import React from 'react'
import "./Info.css"


const Informacion = () => { 
  return (
    <div>
        
        <div className="contenedor">

            <img src="https://images.pexels.com/photos/1634062/pexels-photo-1634062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="img-fluid " />
            
        </div>
   
        <section className="p-top-5 mb-5 lg-0 p-5">
        <div className="container">
          <div className="row justify-content-center">
            <h2 className="mb-5 m-auto colorT">
              ¿Quiénes Somos?
              <hr class="border bordeA border-dark border-2 " />
            </h2>

            
          </div>
        </div>
      </section>
        
    </div>
  )
}

export default Informacion