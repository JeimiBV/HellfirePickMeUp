import React from 'react'



const informacion = () => { 
  return (
    <div>
        <div className="contenedor">

            <img src="../../../src/imagenes/comida19.png" class="img-fluid opacity-50" width='100%'/>
            
        </div>
        <div className='contenedor-2 text-center body'>
                <div className="row " >
                    <div class="col-sm p-5 m-5 text-center"> 
                        <h1 className='color-titulo'>
                            ¿Quienes Somos?
                        </h1>
                        <hr class="border border-dark border-1 opacity-75" />
                        
                        <p >
                        Somos una página web que hace de intermediario entre restaurantes, 
                        reposterias o supermercados que ponen a la venta productos
                        o alimentos que no han vendido al servicio de los consumidores
                        para no malgastar la comida. 
        
                        </p>

                                        
                    </div>

                    <div className="col-sm p-5 m-5">
                        <h1 className='color-titulo' >
                            Nuestro objetivo
                        </h1>
                        <hr class="border border-dark border-1 opacity-75" />
                        
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

export default informacion    