import React, { useState, useEffect } from "react";
import "../estilos/ofertaM.css"
import { useParams } from "react-router-dom";
import { filtrarOfertas } from './funciones'
import { Navigate } from "react-router-dom";
import { useAuth } from '../context/authContext';
import { todosCategorias } from "./funciones";
import Pedido from "./Pedido"
function Mostraroferta({ usuario }) {
    const { user } = useAuth();

    if (usuario != user.uid) {
        return <Navigate to="/" />
    }
    const [categorias, setCategorias] = useState(null);
    const [ofertas, setOfertas] = useState(null)
    const params = useParams()
    const [modalPedido, setModalPedido]=useState(false);
    const [contador, setContador]=useState(1);
    const [precio, setPrecio]=useState(10);
    useEffect(() => {
        filtrarOfertas(params.id, setOfertas)
        todosCategorias(setCategorias)
    }, [])
    console.log(ofertas)

    const fechaActual = new Date()
    const pr = ofertas || []
    console.log(pr)
    const sumar=()=>{
        setContador(contador+1)
        setPrecio(precio+10)
    }
    const disminuir=()=>{
        if(contador>1){
            setContador(contador-1)
            setPrecio(precio-10)
        }
        
    }
    const ofertados = pr.filter(producto => {
        const fechaPr = new Date(producto.Fecha + 'T' + producto.Hora)
        return fechaPr > fechaActual && producto.Precio !== '';
    }
    )

    const ListaOfertas = ofertados.map(oferta => (
        <div class="list-card" key={oferta.id}>

            <section>
                <h1 className="nombreO">{oferta.Nombre}</h1>
                <span class="price">Precio: {oferta.Precio}   Bs</span><br />

                <span class="price">Hora límite: {oferta.Hora} </span>

                <button onClick={()=>{setModalPedido(true)}} className="mt-5 p-1 ps-2 pe-2 ms-5 btn btn-outline-dark ">
                    Hacer pedido
                 </button>

            </section>
            <section className="seccion1">
                <img src={oferta.Imagen} alt="" />
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
    return (
        <div className="container89">
            <div class="default-hero-banner">
                <h1 className="gt pt-4">
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
            <Pedido estado={modalPedido}>

                <div className="contenedor-pedidos ">  
                 <h2 className="label-2">Producto 1</h2>
                 <form id="form-Pedido">
                     <label htmlFor="notas">Notas para este producto</label>
                    <input type="text" id="notas" />
                    <label htmlFor="">
                            Agregar
                        </label>
                    <div className=" contenedor-agregar">
                        
                    <div className="  agregador ">

                        <div className="boton-controlar-pedido"  onClick={disminuir}>-</div>
                        <div className="boton-controlar-pedido"  >{contador}</div>
                        <div className="boton-controlar-pedido" onClick={sumar}>+</div>
                    </div>
                    <div className="sumador-precio p-2">
                        Bs : {precio}
                    </div>
                    </div>
                 </form>
                 <div className="botones-pedido" >
                        <button className="boton-conf"> Realizar pedido</button>
                        <button className="boton-conf" onClick={()=>{setModalPedido(false)}}> Cancelar pedido</button>
                 </div>
                
                
                </div>

            </Pedido>
        </div>

    )

}
export default Mostraroferta;