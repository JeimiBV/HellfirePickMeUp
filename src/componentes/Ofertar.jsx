import React from "react"; 
import { useState, useEffect } from 'react'
import { app } from "../fb"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../estilos/ofertar.css"
import Modals from "./Modals";
//import styled from 'styled-components';
//import {Modal} from "./Modal.js";
//import { ReactDOM } from "react-dom";
function Ofertar(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
            <div className="contenido">
                         
                <form className="fo"  method="POST" id="form">
                    <label className="ti">Registrar oferta</label>
                    <label className="la" >
                        Precio:
                        <input className="in"   type="number" required onChange={ev => checkPrecio(ev)} />
                    </label>
                    <label className="la">
                        Fecha:
                        <input className="in" type="date" required onChange={ev => checkFecha(ev)} />
                    </label>
                    <label>
                        Hora:
                        <input className="in" type="time" required onChange={ev => checkHora(ev)}/>
                    </label>
                    <button className="bu" onClick={handleShow}>Confirmar</button>
                    <button className="bo">Cancelar</button>
                            
                </form>
                <ModalLogin show={show} handleClose={handleClose}/>
             </div>
        </>
    );
};
export default Ofertar;
      /*{showModal && (
                        <Modal>
                            <div className="hola">
                                <p>
                                    esta seguro de su descripcion
                                    <div>
                                        <button className={"button"} onClick={handleClick}>
                                            cerrar
                                        </button>
                                    </div>
                                </p>
                            </div>
                        </Modal>
                    )}*/

/*<Modals
estado={modalConf}
cambiarEstado={setModalConf}
>
<div className="modals">
<h2>
Oferta de producto
</h2>
<h3 className="texto-confirmacion">¿Está seguro de ofertar el producto?</h3>
<div className="botones">
    <button type="submit" className="left" onClick={mostrarSi}>Si</button>
    <button className="right" onClick={mostrarNo}>No</button>
</div>
</div>
</Modals>

<Modals
estado={modalSi}
cambiarEstado={setModalSi}
>
<div className="modalSiNo">
<h3 className="tex">Guardando oferta ...</h3>
</div>
</Modals>
<Modals
estado={modalNo}
cambiarEstado={setModalNo}
>
<div className="modalSiNo">
<h3 className="texto-confirmacion">Cancelado</h3>
</div>
</Modals>*/