import React from 'react'
import { Link } from 'react-router-dom'
import '../../estilos/Landing.css'

const NabvarIni = () => {
  return (
    <div className='contenedor-navbar'>
        <nav className="navbar fixed-top navbar-expand-lg bg-sucess border-bottom border-dark border-2 "> 
            <div className="container-lg">
                <div className="mr-auto">
                    <Link class="navbar-brand" as to='/'>
                    <img src="../../src/imagenes/logo.png" alt=" " width="40" height="34"/>
                    </Link>
                </div> 

                
                <div className="position-absolute top-0 start-50 translate-middle-x">
                    <li className="navbar-nav ">
                    <p class="fs-3">Pick me up</p>  
                    </li>
                </div>

                <button className=" navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav gap-5 ms-auto ">      
                        <li className="nav nav-pills flex-column flex-sm-row">
                            <Link className="flex-sm-fill text-sm-center nav-link active "  as to='/LoginNegocio'>
                            <i className="bi bi-shop "> </i> Negocio</Link>
                        </li>
                        <li className="nav nav-pills flex-column flex-sm-row ">
                            <Link className="flex-sm-fill text-sm-center nav-link active "  as to='/LoginConsumidor'> 
                            <i className="bi bi-person"></i> Consumidor</Link>
                        </li>
                    </ul>        
                </div> 
                
            </div>
            
        </nav>

        <div>

     </div>
    </div> 
  )
}

export default NabvarIni;