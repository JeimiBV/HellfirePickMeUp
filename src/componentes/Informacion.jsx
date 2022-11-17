import React, { useState, useEffect } from "react";
import "../estilos/Informacion.css";
import imagen from "../imagenes/pique.png";
import { Link, useParams } from "react-router-dom";
import { unicoProducto } from "./funciones";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Ofertar from "./Ofertar";
import Modals from "./Modals";

import axios from "axios";
function Informacion() {
    const [modalOf, setModalOf] = useState(false);
    const [modalSi, setModalSi] = useState(false);
    const [modalNo, setModalNo] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [Precio, setPrecio] = useState({ estado: false, valor: "" }); // tarea 9
    const [Fecha, setFecha] = useState({ estado: false, valor: "AAAA-MM-DD" }); // tarea 10
    const [Hora, setHora] = useState({ estado: false, valor: "--:--" }); // tarea 11
    const [Stock, setStock] = useState({ estado: false, valor: "" }); 
    const [modalConf, setModalConf] = useState(false);
    const [producto, setProductos] = useState(null);
    const [oferta, setOfertas] = useState(null);
    const params = useParams();

    const [post, setPost] = useState(null);
    const url =
        "https://us-central1-base-de-datos-h.cloudfunctions.net/app/api/products";
    useEffect(() => {
        unicoProducto(params.id, setProductos);

        if (post !== null) {
            axios.get(`${url}/1`).then((response) => {
                setPost(response.data);
            });
        }
    }, [post]);

    function updatePost() {
        axios
            .put(`${url}/${params.id}`, {
                Nombre: producto.Nombre,
                Descripcion: producto.Descripcion,
                Tipo: producto.Tipo,
                Imagen: producto.Imagen,
                Precio: document.getElementById("numero").value,
                Fecha: document.getElementById("fecha").value,
                Hora: document.getElementById("hora").value,
            })
            .then((response) => {
                setPost(response.data);
                mostrarSi();
            });
    }

    const Validar = () => {
      
        const aux = formatoFecha('yyyy-mm-dd',0) == Fecha.valor && Hora.valor <= formatoHora();
        const aux2 = Fecha.valor <= formatoFecha('yyyy-mm-dd',5);
        if ((Precio.valor > 0) && 
        (Precio.valor < 99999)&&
        (Fecha.valor !== 'AAAA-MM-DD' && (Fecha.valor >= formatoFecha('yyyy-mm-dd',0))) &&
         (Hora.valor !== '--:--') && !aux && aux2) {
            setPrecio(prevState => ({ ...prevState, estado: false }))
            setFecha(prevState => ({ ...prevState, estado: false }));
            setHora(prevState => ({ ...prevState, estado: false }));
            setStock(prevState =>({...prevState, estado:false}));
            setIsLoading(false)
            setModalConf(true);

        } else {
            setIsLoading(true);

            if (Precio.valor > 0 && Precio.valor < 99999) {
                setPrecio(prevState => ({ ...prevState, estado: false }));
            } else {
                setPrecio(prevState => ({ ...prevState, estado: true }));
            }
            if (Fecha.valor !== 'AAAA-MM-DD' && Fecha.valor >= formatoFecha('yyyy-mm-dd',0) && aux2) {
                setFecha(prevState => ({ ...prevState, estado: false }));
            } else {
                setFecha(prevState => ({ ...prevState, estado: true }));
            }
            if (Hora.valor !== '--:--') {
                if (aux) {
                    setHora(prevState => ({ ...prevState, estado: true }));
                } else {
                    setHora(prevState => ({ ...prevState, estado: false }));
                }

            } else {
                setHora(prevState => ({ ...prevState, estado: true }));
            }
            if(Stock.valor<=0){
                setStock(prevState => ({ ...prevState, estado: true }));
            }
            else{
                setStock(prevState => ({ ...prevState, estado: false }));
            }
        }

    }

    const mostrarSi = () => {
        setTimeout(() => {
            setModalNo(false);
            setModalSi(false);
        }, 3000);

        document.getElementById("form").reset();
        setModalConf(false);
        setModalSi(true);
        setPrecio((prevState) => ({ ...prevState, estado: false }));
        setFecha((prevState) => ({ ...prevState, estado: false }));
        setHora((prevState) => ({ ...prevState, estado: false }));
        setStock((prevState) => ({ ...prevState, estado: false }));
        window.location.pathname = "/listaOfertas";
    };

    const guardarOferta = () => { };

    const mostrarNo = () => {
        setTimeout(() => {
            setModalNo(false);
            setModalSi(false);
        }, 3000);
        setPrecio(prevState => ({ ...prevState, valor: '' }));
        setFecha(prevState => ({ ...prevState, valor: 'AAAA-MM-DD' }));
        setHora(prevState => ({ ...prevState, valor: '--:--' }));
        setHora(prevState => ({ ...prevState, valor: '1' }));
        document.getElementById("form").reset();
        setModalConf(false);
        setModalNo(true);
    };

    function formatoFecha(formato,year) {
        const date = new Date();
        const map = {
            dd: date.getDate(),
            mm: date.getMonth() + 1,
            yyyy: date.getFullYear() + year
        }

        if (date.getDate() < 10) {
            map.dd = '0' + date.getDate()
        }

        return (formato.replace(/dd|mm|yyyy/gi, matched => map[matched]))
    }
    function formatoHora() {
        const tiempoT = new Date();
        const hoy = tiempoT.getHours() + ':' + tiempoT.getMinutes();
        return (hoy);
    }

    const [show, setShow] = useState(false);
    const mostrar = (cambiarEstado) => {
        setTimeout(() => {
            cambiarEstado(false);
        }, 2000);
        cambiarEstado(true);
    };

    const mostrarModal = () => {
        mostrar(setShow);
    };

    const mostrarModalOf = () => {
        setModalOf(true);
    };
    const ocultarModalOf = () => {
        setModalOf(false);
        setPrecio(prevState => ({ ...prevState, estado: false }));
        setFecha(prevState => ({ ...prevState, estado: false }));
        setHora(prevState => ({ ...prevState, estado: false }));
        setStock(prevState => ({ ...prevState, estado: false }));
    };
    

    if (producto != null) {
        return (
            <>
                <div className="todo">
                    <h1 className="t"> {producto.Nombre}</h1>

                    <div className="Informacion">
                        <div className="desytip">
                            <h2 className="encabezado">Descripción:</h2>
                            <p className="Parrafo">{producto.Descripcion}</p>
                            <h2 className="encabezado">
                                Tipo de producto:
                            </h2>{" "}
                            <p className="Parrafo">{producto.Tipo}</p>
                            <div className="a12">
                                <img
                                    width="100px"
                                    heigth="100px"
                                    className="imagen_1"
                                    src={producto.Imagen}
                                    alt=""
                                />
                            </div>
                            <button className="b13" onClick={mostrarModalOf}>
                                {" "}
                                Ofertar
                            </button>
                            <Link to="/listaProductos">
                                <button className="b12">Cerrar</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Ofertar estado={modalOf}>
                    <div className="elementos-form-1">
                        <div className="label-2">Registrar Oferta</div>
                        <form
                            className="fo"
                            id="form"
                            action="https://us-central1-base-de-datos-h.cloudfunctions.net/app/api/products/${id}"
                            method="PUT"
                        >
                            <label className="label-1">
                                <div className="contenedor-input-1">
                                    Precio:
                                    <input
                                        className="entrada-1"
                                        id="numero"
                                        type="number"
                                        required
                                        placeholder="Bs."
                                        min="1"
                                        max="99999"
                                        onChange={(e) =>
                                            setPrecio((prevState) => ({
                                                ...prevState,
                                                valor: e.target.value,
                                            }))
                                        }
                                    />
                                    Bs.
                                    <h3
                                        className={
                                            Precio.estado
                                                ? "validacion-1"
                                                : "invisible"
                                        }
                                    >
                                        Ingrese un número positivo y menor a 99999
                                    </h3>
                                </div>
                            </label>
                            <label className="label-1">
                                <div className="contenedor-input-1">
                                    Fecha :
                                    <input
                                        className="entrada-3"
                                        id="fecha"
                                        type="date"
                                        min={formatoFecha('yyyy-mm-dd',0)}
                                        required
                                        onChange={(e) =>
                                            setFecha((prevState) => ({
                                                ...prevState,
                                                valor: e.target.value,
                                            }))
                                        }
                                    />
                                    <h3
                                        className={
                                            Fecha.estado
                                                ? "validacion-1"
                                                : "invisible"
                                        }
                                    >
                                        Ingrese una fecha
                                    </h3>
                                </div>
                            </label>
                            <label className="label-1">
                                <div className="contenedor-input-1">
                                    Hora:
                                    <input
                                        className="entrada-2"
                                        id="hora"
                                        type="time"
                                        required
                                        defaultValue={null}
                                        onChange={(e) =>
                                            setHora((prevState) => ({
                                                ...prevState,
                                                valor: e.target.value,
                                            }))
                                        }
                                    />
                                    <h3
                                        className={
                                            Hora.estado
                                                ? "validacion-1"
                                                : "invisible"
                                        }
                                    >
                                        Ingrese una hora
                                    </h3>

                                </div>
                                
                            </label>
                            <label className="label-1">
                                <div className="contenedor-input-1">
                                    Stock:
                                    <input
                                        className="entrada-2 entrada-stock"
                                        id="stock"
                                        type="number"
                                        required
                                        defaultValue={1}
                                        onChange={(e) =>
                                            setStock((prevState) => ({
                                                ...prevState,
                                                valor: e.target.value,
                                            }))
                                        }
                                    />
                                    <h3
                                        className={
                                            Stock.estado
                                                ? "validacion-1"
                                                : "invisible"
                                        }
                                    >
                                        Ingrese un valor valido en este campo
                                    </h3>

                                </div>
                                
                            </label>
                        </form>
                        <div className="contenedor-botones">
                            <button
                                className="botonL-1"
                                onClick={Validar}
                                onChange={updatePost}
                            >
                                Confirmar
                            </button>
                            <button
                                className="botonR-1"
                                onClick={ocultarModalOf}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>

                    <div className="mod">
                        <Modals
                            titulo={"Registro de oferta"}
                            mostrarSi={updatePost}
                            mostrarNo={mostrarNo}
                            buttons={true}
                            estado={modalConf}
                            cambiarEstado={setModalConf}
                            estadoPantalla={true}
                            texto={"Esta seguro de realizar su oferta?"}
                            icon={false}
                            
                        />

                        <Modals
                            titulo={""}
                            mostrarSi={mostrarSi}
                            buttons={false}
                            estado={modalSi}
                            cambiarEstado={setModalSi}
                            estadoPantalla={true}
                            texto={"Guardando registro ..."}
                            icon={false}
                            
                        />
                        <Modals
                            titulo={""}
                            mostrarNo={mostrarNo}
                            buttons={false}
                            estado={modalNo}
                            cambiarEstado={setModalNo}
                            estadoPantalla={true}
                            texto={"Cancelado"}
                            icon={false}
                            
                        />
                    </div>
                </Ofertar>
            </>
        );
    }
}

export default Informacion;
