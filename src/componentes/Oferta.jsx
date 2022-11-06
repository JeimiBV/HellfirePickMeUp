import React,{useState, useEffect}from "react";
import "../estilos/ofertaM.css"
import { useParams} from "react-router-dom";
import {filtrarOfertas} from './funciones'
import { Navigate } from "react-router-dom";
import { useAuth } from '../context/authContext';
function Mostraroferta({usuario}){
    const { user } = useAuth();
     
    if(usuario!=user.uid){
        return <Navigate to ="/"/>
    }
    const [ofertas, setOfertas]=useState(null)
    const params = useParams()
    useEffect(() => {  
        filtrarOfertas(params.id,setOfertas)
    },[] )
    console.log(ofertas)

return(
    <div className="container89">
       <div class="default-hero-banner">
                <h1 className="gt">
                    Ofertas
                </h1>
        </div>
        
            <div class="list-section">
                <div class="left-section">
                    <section class="column-1">
                        <h1>Categorias</h1>
                            <a href="/Oferta/0">Busca tu almuerzo o cena</a>
                            <a href="/Oferta/1">Estas con antojos</a>
                            <a href="/Oferta/2">Escoge tu cafe y postre</a>
                            <a href="/Oferta/3">Escoge tu bebida</a>
                            <a href="/Oferta/4">No olvides lo escencial</a>
                            <a href="/Oferta/5">Snack</a>
                    </section>
                </div>
                <div class="right-section">
                    <div class="list-cards">
                    {ofertas != null? (

                        ofertas.map(oferta => (
                                <div class="list-card">
                                    
                                        <section>
                                            <h1>{oferta.Nombre}</h1>
                                            <span class="price">Precio: {oferta.Precio}</span><br/>
                                            
                                            <span>Hora limite: {oferta.Hora} </span>
                                           
                                        </section>
                                        <section className="seccion1">
                                            <img src={oferta.Imagen} alt=""/>
                                            <span class="list-category">
                                            <p>{oferta.Descripcion} </p>
                                            </span>
                                        </section>
                                    </div>
                              )
                        )
                    ):('No hay ofertas')}
                    </div>
                </div>
            </div>
    </div>

)

}
export default Mostraroferta;