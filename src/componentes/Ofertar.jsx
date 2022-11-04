import React from "react";
import { useState, useEffect } from 'react'
import { app } from "../fb"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../estilos/ofertar.css"
import Modals from "./Modals";
import { setDate } from "date-fns";
import { Link, useParams } from "react-router-dom";
import { unicoProducto } from './funciones'

function Ofertar() {
    const [modalSi, setModalSi] = useState(false);
    const [modalNo, setModalNo] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [Precio, setPrecio] = useState({ estado: false, valor: '' }); // tarea 9
    const [Fecha, setFecha] = useState({ estado: false, valor: 'AAAA-MM-DD' }); // tarea 10
    const [Hora, setHora] = useState({ estado: false, valor: '--:--' }); // tarea 11
    const [modalConf, setModalConf] = useState(false)
    const [producto, setProductos] = useState(null)
    const params = useParams()


    useEffect(() => {

        unicoProducto(params.id, setProductos)
    }, [])

    const Validar = () => {
        if ((Precio.valor > 0) && (Fecha.valor !== 'AAAA-MM-DD') && (Hora.valor !== '--:--')) {
            setPrecio(prevState => ({ ...prevState, estado: false }))
            setFecha(prevState => ({ ...prevState, estado: false }));
            setHora(prevState => ({ ...prevState, estado: false }));
            setIsLoading(false)
            setModalConf(true);

        } else {
            setIsLoading(true);

            if (Precio.valor > 0) {
                setPrecio(prevState => ({ ...prevState, estado: false }));
            } else {
                setPrecio(prevState => ({ ...prevState, estado: true }));
            }
            if (Fecha.valor !== 'AAAA-MM-DD') {
                setFecha(prevState => ({ ...prevState, estado: false }));
            } else {
                setFecha(prevState => ({ ...prevState, estado: true }));
            }
            if (Hora.valor !== '--:--') {
                setHora(prevState => ({ ...prevState, estado: false }));
            } else {
                setHora(prevState => ({ ...prevState, estado: true }));
            }
        }

    }

    const mostrarSi = () => {
        setTimeout(() => {
            setModalNo(false)
            setModalSi(false)
        }, 3000);

        document.getElementById('form').reset();
        setModalConf(false);
        setModalSi(true);
        setPrecio(prevState => ({ ...prevState, estado: false }));
        setFecha(prevState => ({ ...prevState, estado: false }));
        setHora(prevState => ({ ...prevState, estado: false }));

    }
    const mostrarNo = () => {
        setTimeout(() => {
            setModalNo(false)
            setModalSi(false)
        }, 3000);
        document.getElementById('form').reset();
        setModalConf(false);
        setModalNo(true);
    }

    function formatoFecha(formato) {


        const date = new Date();
        const map = {
            dd: date.getDate(),
            mm: date.getMonth() + 1,
            yyyy: date.getFullYear()
        }

        if (date.getDate() < 10) {
            map.dd = '0' + date.getDate()
        }

        return (formato.replace(/dd|mm|yyyy/gi, matched => map[matched]))
    }
    if (producto != null) {
    return (
        <>
            <div className="contenido">
            <label className="titulo-1"> {producto.Nombre} </label>
                <form className="fo" id="form">
                    <label className="ti">Registrar oferta</label>
                    <label className="la" >
                        Precio:
                        <input className="in" id="numero" type="number" required placeholder="$" min="1" onChange={e => (setPrecio(prevState => ({ ...prevState, valor: e.target.value })))} />
                        <h3 className={Precio.estado ? "validacion-1" : "invisible"}>
                            Ingrese un numero positivo
                        </h3>
                    </label>
                    <label className="la">
                        Fecha:
                        <input className="in" type="date" name="fecha" id="fecha" min={formatoFecha('yyyy-mm-dd')} required onChange={e => (setFecha(prevState => ({ ...prevState, valor: e.target.value })))} />
                        <h3 className={Fecha.estado ? "validacion-1" : "invisible"}>
                            Ingrese una fecha
                        </h3>
                    </label>
                    <label className="la">
                        Hora:
                        <input className="in" type="time" required defaultValue={null} onChange={e => (setHora(prevState => ({ ...prevState, valor: e.target.value })))} />
                        <h3 className={Hora.estado ? "validacion-1" : "invisible"}>
                            Ingrese una hora
                        </h3>
                    </label>


                </form>
                <div className="buiz"><button className="bu" type="submit" onClick={Validar}>Confirmar</button></div>
                <div className="bode"><button className="bo" onClick={() => { window.location.pathname = 'listaProductos'; }}>Cancelar</button></div>
               
                <div className="mod">
                    <Modals
                        titulo={"Registro de oferta"}
                        mostrarSi={mostrarSi}
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
            </div>
        </>
    );
}
}
export default Ofertar;
