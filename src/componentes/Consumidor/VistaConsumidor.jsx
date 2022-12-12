import React, { useEffect, useState } from "react";
import '../../estilos/BusquedaOfertas.css'
import { useAuth } from '../../context/authContext';
import { Navigate } from "react-router-dom";
import { todosProductos } from '../funciones'
import Pedido from "../Pedido";
import Modals from "../Modals";
import axios from "axios";


const VistaConsumidor = ({ usuario }) => {
    const { user } = useAuth();

    if (usuario != user.uid) {
        return <Navigate to="/" />
    }

    const [precio, setPrecio] = useState(1);
    const [precioFijo, setPrecioFijo] = useState(1);
    const [nombre, setNombre] = useState("");
    const [modalPedido, setModalPedido] = useState(false);
    const [modalRealPedido, setModalRealPedido] = useState(false);
    const [modalCancPedido, setModalCancPedido] = useState(false);
    const [producto, setProducto] = useState(null);
    const [contador, setContador] = useState(1);
    const [valida, setValida] = useState(true);
    const [notas, setNotas] = useState({ valor: "", estado: false });
    const [productos, setProductos] = useState([])
    const [tablaProductos, setTablaProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        todosProductos(setProductos)
        todosProductos(setTablaProductos)
    }, [])

    const handleChange = e => {
        setBusqueda(e.target.value);
        if (/[A-Za-z]/.test(e.target.value) || !/\s/.test(e.target.value)) {
            filtrar(e.target.value);
        }
    }

    const fechaActual = new Date()

    const ofertados = productos.filter(producto => {
        const fechaPr = new Date(producto.Fecha + 'T' + producto.Hora)
        return fechaPr > fechaActual && producto.Precio !== '';
    }
    )

    const filtrar = (terminoBusqueda) => {
        var resultadosBusqueda = tablaProductos.filter((elemento) => {
            const fechaPr = new Date(elemento.Fecha + 'T' + elemento.Hora)
            if (elemento.Nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                return fechaPr > fechaActual && elemento.Precio !== '';
            }
        });
        setProductos(resultadosBusqueda);
    }
    //<h1 className="tituloProducto text-center mt-3" > ¡Busca un producto! </h1>

    const pasarDatos = (oferta) => {
        setNombre(oferta.Nombre);
        setPrecio(oferta.Precio);
        setModalPedido(true)
        setProducto(oferta)
        console.log("Este es la oferta que viene de vista consumidor", oferta)
        console.log(precio,"este es el precio que viene de oferta");
        console.log(oferta.Stock, "esteeeee")
    }
    

    const mostrarRealPedido = () => {
        if (valida) {
            axios({
                method: "POST",
                data: {
                    Nombre: nombre,
                    Imagen: producto.Imagen,
                    PrecioUnitario: precio,
                    PrecioTotal: producto.Precio,
                    Hora: producto.Hora,
                    FechaLimite: producto.Fecha,
                    Cantidad: contador,
                    Nota: notas.valor,
                    FlagC: true,
                    FlagN: true,
                    Stock: producto.Stock,
                },
                url: "https://us-central1-base-de-datos-h.cloudfunctions.net/app/api/pedido",
            })
                .then((response) => {
                    if (!response.data.error) {
                        console.log(response.data);
                    } else {
                        console.log(response.data.error[0]);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            setTimeout(() => {
                setModalPedido(false);
                setModalRealPedido(false);
            }, 3000);
            setModalRealPedido(true);
            setContador(1);
        }
    };

    const mostrarCancPedido = () => {

        setTimeout(() => {
            setModalCancPedido(false);
            setModalPedido(false);

        }, 3000);
        setModalCancPedido(true);
        setContador(1);
    };




    return (

        <>
            <div className=" containerLargo">
                <h5 className="title16"> ¡Busca un producto! </h5>

                <div className="buscador">
                    <form class="d-flex justify-content-center" value={busqueda} role="search" onChange={handleChange}>
                        <i class="bi bi-search px-3"></i>
                        <input class="form-control inputBusc me-2 px-5" type="search" placeholder=" Ingrese el nombre del producto..." aria-label="Search" />
                    </form>
                </div>

                <div className="ofertasDelosProductos">

                    {
                        ofertados.map(oferta => (
                            <div className="row row-col" onClick={() => { pasarDatos(oferta) }} key={oferta.id}>
                                <div class="card card-ofP  mb-2 bg-sucessPedido">
                                    <span class="Banner">
                                        <span className="d-block">Hora límite:{oferta.Hora} </span>
                                        <span className="d-block">Fecha límite: {oferta.Fecha} </span>
                                        <h1 className="Descri">Descripción :</h1>

                                        <p className="DescripcionAd">{oferta.Descripcion} </p>
                                    </span>


                                    <img src={oferta.Imagen} class="card-img-top imagenOf mt-2 mr-2" alt="..." />


                                    <div className="DisenioCard ">
                                        <div class="card-body card-letra ">
                                            <h5 class="card-titleProducto text-center text-capitalize" >{oferta.Nombre}</h5>
                                            <p className="precioAd">

                                                <span > Precio: {oferta.Precio} bs.</span>



                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                        )
                    }
                </div>
            </div>
            <Pedido
                estado={modalPedido}
                nombre={nombre}
                precioFijo={precio}
                precioTotalP={precio}
                mostrarCancPedido={mostrarCancPedido}
                mostrarRealPedido={mostrarRealPedido}
                oferta={producto}
            >
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

        </>
    )
}

export default VistaConsumidor