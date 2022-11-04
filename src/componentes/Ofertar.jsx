import React from "react";
import { useState, useEffect } from 'react'
import { app } from "../fb"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../estilos/ofertar.css"
import Modals from "./Modals";
import { setDate } from "date-fns";

function Ofertar() {
    const [fecha, setFecha] = useState("");
    const [show, setShow] = useState(false);
    const [Precio, setPrecio] = useState({ estado: false, valor: '' }); // tarea 9
    const [modalSi, setModalSi] = useState(false); // tarea 2
    const [modalNo, setModalNo] = useState(false); // tarea 3
    // const [modalConf, setModalConf] = useState(false) //tarea 1
    const [isLoading, setIsLoading] = useState(true);// todas las tareas
    // tarea 12


    const mostrar = (cambiarEstado) => {
        setTimeout(() => {
            cambiarEstado(false)
        }, 2000);
        cambiarEstado(true)
    }

    // const mostrarSi = () => { console.log("se presiono mostrar si") }
    //const mostrarNo = () => { console.log("se presiono mostrar no") }

    const mostrarSi = () => {
        setTimeout(() => {
            setModalNo(false)
            setModalSi(false)
        }, 3000);

        document.getElementById('form').reset();// tarea 8
        setShow(false);
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
        setShow(false);
        setModalNo(true);
    }

    const mostrarModal = () => {
        mostrar(setShow);
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

    /*var date = new Date();
    console.log(date.toLocaleDateString());*/
    //const asignarFecha =()=>{


    //return ((new Date).toLocaleDateString())
    //setFecha("4/11/2022")
    //console.log((new Date).getFullYear() + '-' + ( (new Date).getMonth() + 1 ) + '-' + (new Date).getDate())
    // return 
    // }



    /*const [date, setDate] = useState(new Date());
    const [fechaFormato, setFechaFormato] = useState('');
     
     
    const formatoFecha = fecha => {
       setDate(fecha);
       const dia = fecha.getDate();
       const mes = fecha.getMonth() + 1;
       const anio = fecha.getFullYear();
       const dato = date.getDate() + '-' + ( date.getMonth() + 1 ) + '-' + date.getFullYear();
       if(ev.target.value < fecha){
        document.getElementById("fecha").value=dato;
       }
     }*/




    //fecha.min= new Date().toISOString.split("T")[0];
    return (
        <>
            <div className="contenido">

                <form className="fo" id="form">
                    <label className="ti">Registrar oferta</label>
                    <label className="la" >
                        Precio:
                        <input className="in" id="numero" type="number" required placeholder="$" min="1" />
                    </label>
                    <label className="la">
                        Fecha:
                        <input className="in" type="date" name="fecha" id="fecha" min={formatoFecha('yyyy-mm-dd')} required />

                    </label>
                    <label className="la">
                        Hora:
                        <input className="in" type="time" required />
                    </label>


                </form>
                <div className="buiz"><button className="bu" type="submit" onClick={mostrarModal}>Confirmar</button></div>
                <div className="bode"><button className="bo">Cancelar</button></div>
                <div className="mod">
                    <Modals
                        titulo={"Registro de oferta"}
                        mostrarSi={mostrarSi}
                        mostrarNo={mostrarNo}
                        buttons={true}
                        estado={show}
                        cambiarEstado={setShow}
                        estadoPantalla={false}
                        texto={"Esta seguro de realizar su oferta?"} 
                        icon={true}
                        />

                    <Modals
                        titulo={""}
                        mostrarSi={mostrarSi}
                        mostrarNo={mostrarNo}
                        buttons={false}
                        estado={modalSi}
                        cambiarEstado={setModalSi}
                        estadoPantalla={false}
                        texto={"Guardando registro ..."} 
                        icon={false}
                        />
                        
                </div>
            </div>
        </>
    );
}
export default Ofertar;
