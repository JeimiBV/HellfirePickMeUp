import React from 'react'
import "./Info.css"


const Informacion = () => { 
  return (
    <div>
        <div>
        <div className="contenedor">

            <img src="https://images.pexels.com/photos/1634062/pexels-photo-1634062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="img-fluid " />
            
        </div>
    </div>

        <div className='contenedor-2 text-center body'>
                <div className="row " >
                    <div class="col-sm p-5 pt-5 pb-5 mt-5"> 
                        <h1 className='color-titulo'>
                            ¿Quiénes Somos? <hr class="border bordeA border-dark border-1" />
                        </h1>                      
                        <p >
                        Somos una página web que hace de intermediario entre restaurantes, 
                        reposterías o supermercados que ponen a la venta productos
                        o alimentos que no han sido vendidos al servicio de los consumidores
                        para no malgastar la comida. 
        
                        </p>             
                    </div>
                    <div className="col-sm p-5 mt-5">
                       <img className='imagen-quienes' src='https://d1ih8jugeo2m5m.cloudfront.net/2020/04/Qui%C3%A9nes-somos.jpg' />

                    </div>
                    
                </div>


                <div className="row " >
                    <div class="col-sm  p-5 pt-5 mt-5"> 
                        <img className='imagen-objetivo' src='https://www.elplural.com/uploads/s1/62/51/46/dieta-huella-agua.jpeg' />
                    </div>
                    <div className="col-sm p-5 pb-5 mt-5">
                        <h1 className='color-titulo2' >
                            Nuestro objetivo
                        </h1>
                        <hr class="border border-dark border" />
                        
                        <p>
                        Es ser un movimiento que lucha contra la pérdida y el desperdicio de alimentos
                        reduciendo considerablemente las cifras de desperdicio.
                    
                        </p>

                    </div>
                    
                </div>
            </div>
        </div>
  )
}

export default Informacion