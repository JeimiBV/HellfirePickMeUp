import React,{useState, useEffect}from "react";
import "../estilos/ofertaM.css"
import { useParams} from "react-router-dom";
import {filtrarOfertas} from './funciones'
import { Navigate } from "react-router-dom";
import { useAuth } from '../context/authContext';
import {todosCategorias} from "./funciones";
function Mostraroferta({usuario}){
    const { user } = useAuth();
     
    if(usuario!=user.uid){
        return <Navigate to ="/"/>
    }
    const [categorias , setCategorias] = useState(null);
    const [ofertas, setOfertas]=useState(null)
    const params = useParams()
    useEffect(() => {  
        filtrarOfertas(params.id,setOfertas)
        todosCategorias(setCategorias)
    },[] )
    console.log(ofertas)

    const pr = ofertas || []
    console.log(pr)

    const ofertados = pr.filter( ofert => 
        ofert.Hora !== ''
    )
    
    const ListaOfertas = ofertados.map(oferta => (
        <div class="list-card" key={oferta.id}>
            
                <section>
                    <h1 className="nombreO">{oferta.Nombre}</h1>
                    <span class="price">Precio: {oferta.Precio}   Bs</span><br/>
                    
                    <span class="price">Hora límite: {oferta.Hora} </span>
                   
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
const pr1 = categorias || []
const ListaCategorias = pr1.map(categoria => (

          <a href={`/Oferta/${categoria.id}`}>{categoria.Name}</a>
    
        )
)
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
                        <h1>Categorías</h1>
                          {ListaCategorias} 
                    </section>
                </div>
                <div class="right-section">
                    <div class="list-cards">
                            {ListaOfertas}
                    </div>
                </div>
            </div>
    </div>

)

}
export default Mostraroferta;