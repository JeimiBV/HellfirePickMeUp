import React, { useEffect, useState } from "react";
import { todosProductos } from './funciones'
import '../estilos/Ofertas.css'
import { useAuth } from './../context/authContext';

const ListaOfertas = ({usuario}) => {

    const { user } = useAuth();
    
            if(usuario!=user.uid){
                return <Navigate to ="/"/>
            }

    const [productos, setProductos] = useState([])
    const [tablaProductos, setTablaProductos]= useState([]);
    const [busqueda, setBusqueda]= useState("");

    useEffect(() => {
        todosProductos(setProductos)
        todosProductos(setTablaProductos)
    }, [])

    const handleChange=e=>{
        setBusqueda(e.target.value);
        if (/[A-Za-z]/.test(e.target.value) || !/\s/.test(e.target.value)) {
           filtrar(e.target.value); 
        }                 
    }

    const fechaActual = new Date()  

    const ofertados = productos.filter(producto => 
        {   
            const fechaPr = new Date(producto.Fecha + 'T' + producto.Hora) 
            console.log("El Stock es: " + producto.Stock)
            return  fechaPr > fechaActual && producto.Precio !== '' ;
        }
    ) 
  
    const filtrar=(terminoBusqueda)=>{
        var resultadosBusqueda= tablaProductos.filter((elemento)=>{
            const fechaPr = new Date(elemento.Fecha + 'T' + elemento.Hora)
          if(elemento.Nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
            return fechaPr > fechaActual && elemento.Precio !== '' ;
          }
        });
        setProductos(resultadosBusqueda);
      }  
        
    return (

        <>

        <div className="container-fluid">
            <div className=" containerL p-2" >
                <div className="ofertasTitulo ">
                    <h1 className="TituloListaO text-center mt-3 p-1" > Lista de ofertas </h1>
                </div>
                
                <div className="buscador">
                    <form class="d-flex justify-content-center " value={busqueda}  role="search" onChange={handleChange}>
                           <i class="bi bi-search px-3"></i>
                        <input class="form-control inputBusc me-2 px-5" type="search" placeholder=" Ingrese el nombre del producto ofertado..." aria-label="Search"  />              
                    </form>
                </div>
                <div className="ofertasP">
                
                    {ofertados != null ? (
                        ofertados.map(oferta => (
                            <div  className="row row-col" key={oferta.id}>
                                <div class="cardSpace">
                                  <div class="cardBackground">
                                  </div>
                                   <div class="card cardOfertados">    
                                    <div class="cardInside">
                                        <div class="imgSpace">
                                                <div >
                                                    <img src={oferta.Imagen} className="cardOfertas " alt="..." />
                                                </div>
                                            </div>
                                            <div class="userInfo">
                                            <div class="card-body card-letra">
                                                    <h5 class="card-titleP text-center text-capitalize " >{oferta.Nombre}</h5>
                                                        <div className="letraCard">
                                                            <span className="" > Precio: {oferta.Precio} bs.</span>
                                                            <span className="px-"> Hora límite:{oferta.Hora} </span>
                                                            <span className="px-">Fecha límite: {oferta.Fecha} </span>
                                                        </div>
                                                    
                                                    </div>
                                            </div>
                                          </div>                                                                                                            
                                     </div>  
                                </div>

                               </div>


                            
                        )
                        )
                    ) : ('no hay productos')}
                </div>
            </div>

        </div>
        </>
    )
}

export default ListaOfertas