import React from 'react'
export const MensajesP = () => {
  return (

      <div className=' p-5 top-150 start-20 '>
        <div class="text-center body-1 ">
          <div class="row body">
            <div class="col-sm-8 p-5" top="50" size={20}  >
                <p>   
                  Nuestro sustento está íntimamente ligado a la comida que comemos 
                  y al agua que bebemos. 
                  Por eso tenemos que promover la responsabilidad y la conservación
                  cuando se trata de nuestros recursos naturales.
               </p>
                  <p> -Mark Udal.</p>

                  <p>  Cuando te levantes por la mañana, da gracias por la luz, por tu vida, por tu fuerza. 
                  Pero especialmente, da las gracias por tu comida, ya que 
                  es la que nos regala la alegría de vivir.</p>
                    <p> - Tecumseh.</p>

                </div> 

                 <div class="col-sm-4 p-5">

                    <img className="imagen2"  src="../../../src/imagenes/happy.jpg" alt="..." width="400" height="300" />
                 </div>
                </div>

            <div class="row body color-titulo">
                 <div class="col-sm p-5">
                   <img className=""  src="../../../src/imagenes/planet.jpg" width="90" height="90"/>
                   <h3>
                     Usando la aplicacion ayudas a reducir 
                     el desperdicio de comida
                   </h3>
                 </div>

                 <div class="col-sm p-5">
                     <img className=""  src="../../../src/imagenes/icono.jpg" width="90" height="90"/>
                    <h3>
                    ¡Ya son 1000 usuarios que tienen la App!
                    </h3>   
                    </div>
                    <div class="col-sm p-5">
                     <img className=""  src="../../../src/imagenes/ofertaa.webp" width="90" height="90"/>
                     <h3>
                    ¡Tenemos variedad de ofertas para ti!
                    </h3>   

                 </div> 

            </div>

        </div> 

    </div>
    

  )
}
export default MensajesP