import React, { useState, useEffect } from "react";
import "../estilos/ofertaM.css"
import { useParams } from "react-router-dom";
import { filtrarOfertas } from './funciones'
import { Navigate } from "react-router-dom";
import { useAuth } from '../context/authContext';
import { todosCategorias, unicoProducto } from "./funciones";
import Pedido from "./Pedido"
import Modals from "./Modals";
import axios from "axios";


function Mostraroferta({ usuario }) {
    const { user } = useAuth();

    if (usuario != user.uid) {
        return <Navigate to="/" />
    }
    const [categorias, setCategorias] = useState(null);
    const [ofertas, setOfertas] = useState(null)
    const params = useParams()
    const [modalPedido, setModalPedido] = useState(false);
    const [contador, setContador] = useState(1);
    const [precio, setPrecio] = useState(1);
    const [precioFijo, setPrecioFijo] = useState(1);
    const [modalRealPedido, setModalRealPedido] = useState(false);
    const [modalCancPedido, setModalCancPedido] = useState(false);
    const [notas, setNotas] = useState({ valor: '', estado: false });
    const [valida, setValida] = useState(true);
    const [nombre, setNombre] = useState("");
    const [producto, setProducto] = useState(null);
    useEffect(() => {
        filtrarOfertas(params.id, setOfertas)
        todosCategorias(setCategorias)
    }, [])
    //console.log(ofertas)
    const fechaActual = new Date()
    const pr = ofertas || []
    //console.log(pr)
    const sumar = () => {
        setContador(contador + 1)
        setPrecio((contador + 1) * precioFijo)
    }
    const disminuir = () => {
        if (contador > 1) {
            setContador(contador - 1)
            setPrecio(precioFijo * (contador - 1))
        }
    }
    const validar = (ev) => {
        setNotas(prevState => ({ ...prevState, valor: ev.target.value }))
        if (ev.target.value.length > 100) {
            setNotas((prevState) => ({ ...prevState, estado: true }))
            setValida(false)
        }
        else {
            setNotas((prevState) => ({ ...prevState, estado: false }))
            setValida(true)
        }
    }

    const pasarDatos = (id, precioo, nombree) => {
        setModalPedido(true)
        setPrecioFijo(precioo);
        setPrecio(precioo)
        setNombre(nombree)
        console.log(precio)
        unicoProducto(id, setProducto)
        mostrarRealPedido
    }

    const mostrarDatos = () => {
        console.log(producto)
        console.log(producto.Hora)
    }

    const mostrarRealPedido = () => {
        if (valida) {
            axios({
                method: "POST",
                data: {
                    Imagen: producto.Imagen,
                    PrecioUnitario: precio,
                    PrecioTotal: producto.Precio,
                    Hora: producto.Hora,
                    FechaLimite: producto.Fecha,
                    Cantidad: contador,
                    Nota: notas.valor
                },
                url: "http://localhost:5000/base-de-datos-h/us-central1/app/api/pedido",
            }).then(response => {
                if (!response.data.error) {
                    console.log(response.data)
                } else {
                    console.log(response.data.error[0]);
                }
            })
                .catch(err => {
                    console.log(err)
                });
            setTimeout(() => {
                setModalRealPedido(false);
                setModalPedido(false);
            }, 3000);
            setModalRealPedido(true);
            setContador(1)
        }

    };
    const mostrarCancPedido = () => {
        setTimeout(() => {
            setModalCancPedido(false);
            setModalPedido(false);
        }, 3000);
        setModalCancPedido(true);
        setContador(1)
    };


    const ofertados = pr.filter(producto => {
        const fechaPr = new Date(producto.Fecha + 'T' + producto.Hora)
        return fechaPr > fechaActual && producto.Precio !== '';
    })

    const ListaOfertas = ofertados.map(oferta => (

        (<div class="list-card" key={oferta.id}>
            <section>
                <h1 className="nombreO">{oferta.Nombre}</h1>
                <span class="price">Precio: {oferta.Precio}   Bs</span><br />

                <span class="price">Hora límite: {oferta.Hora} </span>

                <button onClick={() => { pasarDatos(oferta.id, oferta.Precio, oferta.Nombre) }} className=" mt-5 p-1 ps-2 pe-2 ms-5 boton-pedido ">
                    Hacer pedido
                </button>

            </section>
            <section className="seccion1">
                <img src={oferta.Imagen} alt="" />
                <span class="list-category">
                    <p>{oferta.Descripcion} </p>
                </span>
            </section>

        </div>)

    ))

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
                    <h2 className="label-2">{nombre}</h2>
                    <form id="form-Pedido">
                        <label htmlFor="notas">Notas para este producto</label>
                        <div className="contenedor-input-pedido">
                            <textarea type="text" id="notas" onChange={ev => validar(ev)} />
                            <h3 className={notas.estado ? "validar" : "invisible"} >
                                Se acepta un máximo de 100 caracteres
                            </h3>
                        </div>
                        <label htmlFor="">
                            Agregar
                        </label>
                        <div className=" contenedor-agregar">

                            <div className="  agregador ">

                                <div className="boton-controlar-pedido" onClick={disminuir}>-</div>
                                <div className="boton-controlar-pedido"  >{contador}</div>
                                <div className="boton-controlar-pedido" onClick={sumar}>+</div>
                            </div>
                            <div className="sumador-precio p-2">
                                Bs : {precio}
                            </div>
                        </div>
                    </form>
                    <div className="botones-pedido" >
                        <button className="boton-conf" onClick={mostrarRealPedido}> Realizar pedido</button>
                        <button className="boton-conf" onClick={mostrarCancPedido}> Cancelar pedido</button>
                    </div>


                </div>

            </Pedido>
            <Modals
                estado={modalRealPedido}
                estadoPantalla={false}
                texto={"Realizando pedido ..."}
                buttons={false}
                icon={false}
            />
            <Modals
                estado={modalCancPedido}
                estadoPantalla={false}
                texto={"Cancelando pedido ... "}
                buttons={false}
                icon={true}
            />
        </div>

    )

}
export default Mostraroferta;