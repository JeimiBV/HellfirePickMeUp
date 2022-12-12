import React from "react";
import "../estilos/Modals.css"
import '../estilos/Ofertar.css'
import axios from "axios";
import { useState } from "react";
import Modals from "./Modals";


function Pedido({ estado, nombre, precioFijo, precioTotalP, mostrarCancPedido, mostrarRealPedido, oferta }) {

    const [modalRealPedido, setModalRealPedido] = useState(false);
    const [modalCancPedido, setModalCancPedido] = useState(false);
    const [contador, setContador] = useState(1);
    const [notas, setNotas] = useState({ valor: "", estado: false });
    const [precioTotal, setPrecioTotal] = useState(oferta.Precio);
    const [valida, setValida] = useState(true);

    const sumar = () => {
        setContador(contador + 1);
        setPrecioTotal((contador + 1) * precioFijo);
        console.log(precioTotal)
    };

    const disminuir = () => {
        if (contador > 1) {
            setContador(contador - 1);
            setPrecioTotal(precioFijo * (contador - 1));
        }
    };

    const validar = (ev) => {
        setNotas((prevState) => ({ ...prevState, valor: ev.target.value }));
        if (ev.target.value.length > 100) {
            setNotas((prevState) => ({ ...prevState, estado: true }));
            setValida(false);
        } else {
            setNotas((prevState) => ({ ...prevState, estado: false }));
            setValida(true);
        }
    };

    return (
        <>
            {estado &&
                <div className="over-complete ">
                    <div class="cont">
                        <div class="form sign-in">
                            <h2 className="h2NombrePedido">{nombre}</h2>
                            <label className="labelPedidoJ">
                                <div className="notasProducto">Notas para este producto</div>
                                <div className="contenedor-input-pedido">
                                    <textarea className="textareaPedido" onChange={(ev) => validar(ev)} />
                                    <h3 className={notas.estado ? "validar" : "invisible"}>
                                        Se acepta un máximo de 100 caracteres
                                    </h3>
                                </div>
                                <label className="notasProducto">Agregar</label>
                                <div className=" contenedor-agregar">
                                    <span className="  agregador ">
                                        <div className="boton-controlar-pedido" onClick={disminuir}>
                                            -
                                        </div>
                                        <div className="boton-controlar-pedido">{contador}</div>
                                        <div className="boton-controlar-pedido" onClick={sumar}>
                                            +
                                        </div>
                                    </span>
                                    <div className="sumador-precio p-2">Bs : {precioTotal}</div>
                                </div>

                                <div className="botones-pedido">
                                    <button className="boton-conf submitPedido" onClick={mostrarRealPedido}>
                                        {" "}
                                        Realizar pedido
                                    </button>
                                    <button className="boton-conf submitPedido" onClick={mostrarCancPedido}>
                                        {" "}
                                        Cancelar pedido
                                    </button>
                                </div>
                            </label>

                        </div>
                        <div class="sub-cont">
                            <div class="imgPedido">
                                <div class="img__text m--up">
                                    <h2>Realice su pedido</h2>
                                    <p>No necesitas un tenedor de plata para comer bien</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
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
export default Pedido