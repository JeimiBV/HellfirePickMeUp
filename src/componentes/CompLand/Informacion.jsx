import React from 'react'



const Informacion = () => { 
  return (
    <div>
        <div>
        <div className="contenedor">

            <img src="https://images.pexels.com/photos/1634062/pexels-photo-1634062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="img-fluid opacity-50" />
            
        </div>
    </div>

        <div className='contenedor-2 text-center body'>
                <div className="row " >
                    <div class="col-sm p-5 pt-5 pb-5 mt-5"> 
                        <h1 className='color-titulo'>
                            ¿Quiénes Somos?
                        </h1>
                        <hr class="border border-dark border-1 " />
                        
                        <p >
                        Somos una página web que hace de intermediario entre restaurantes, 
                        reposterías o supermercados que ponen a la venta productos
                        o alimentos que no han sido vendidos al servicio de los consumidores
                        para no malgastar la comida. 
        
                        </p>             
                    </div>
                    <div className="col-sm p-5 mt-5">
                        <h1 className='color-titulo' >
                            Nuestro objetivo
                        </h1>
                        <hr class="border border-dark border" />
                        
                        <p>
                        Es ser un movimiento que lucha contra la pérdida y el desperdicio de alimentos
                        reduciendo considerablemente las cifras de desperdicio
                    
                        </p>

                    </div>
                    
                </div>
            </div>
        </div>
  )
}

export default Informacion