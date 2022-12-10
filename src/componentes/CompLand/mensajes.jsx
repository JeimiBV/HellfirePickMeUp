import React from 'react'
import Slider from "./Slider"

export const MensajesP = () => {
  return (

      <div className=' p-5 top-150 start-20 '>
        <div class="text-center body-1 ">
          <div class="row body justify-content-center">
            <div class="col-sm-8 p-5" top="50" size={20}  >
                  <div class="MensajesLPage">
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
                </div>

                 <div class="col-sm-12 pt-4 mt-5 col-md-3">

                    <img className="imagen2 w-100"  src="https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2018/06/mesa-mucha-gente-comiendo.jpg" alt="..." />
                 </div>
                </div>

                <div>
                  <Slider/>
                </div>

            <div class="row body color-titulo">
                 <div class="col-sm p-5">
                   <img className=""  src="https://st2.depositphotos.com/3589081/7944/v/950/depositphotos_79445402-stock-illustration-brown-recycle-logo-vector.jpg" width="90" height="90"/>
                   <div class="MensajeLanding">
                   <h1>
                     Usando la aplicación ayudas a reducir 
                     el desperdicio de comida
                   </h1>
                 </div>
                 </div>
                 <div class="col-sm p-5">
                     <img className=""  src="https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-2-avatar-2754578_120514.png" width="90" height="90"/>
                    <div class="MensajeLanding">
                    <h1>
                    ¡Ya son 1000 usuarios que tienen la App!
                    </h1>   
                    </div>
                    </div>
                    <div class="col-sm p-5">
                     <img className=""  src="https://png.pngtree.com/png-clipart/20190924/original/pngtree-house-icon-in-trendy-style-isolated-background-png-image_4826447.jpg" width="90" height="90"/>
                     <div class="MensajeLanding">
                     <h1>
                    ¡Tenemos variedad de ofertas para ti!
                    </h1>   
                    </div>
                 </div> 

            </div>

        </div> 

    </div>
    

  )
}
export default MensajesP
