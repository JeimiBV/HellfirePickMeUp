/*import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';*/
import React from 'react';
import Modals from "./Modals";
import { useState } from "react";
import { useAuth } from '../context/authContext'
import { Navigate, useNavigate } from 'react-router-dom'
import "../estilos/formularioInicio.css"


function FormInicioSesion() {
    const [modalCorreo, setModalCorreo] = useState(false)
    const [modalContraseña, setModalContraseña] = useState(false)
    const [modalAmbos, setModalAmbos] = useState(false)
    const [ojo, setOjo] = useState(false);
    const [error, setError] = useState();
    const [modalInvalido, setModalInvalido] = useState(false);
    const [userf, setUser] = useState({
        correo: '',
        contraseña: ''
    });

    const { login } = useAuth();
    const navigate = useNavigate();

    const handlechange = ({ target: { name, value } }) => {
        setUser({ ...userf, [name]: value })

    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        validar()
        setError('');
        try {
            if (userf.correo == "user@gmail.com") {
                await login(userf.correo, userf.contraseña);
                navigate("/vistaConsumidor");
            }

        } catch (error) {
            console.log(error.code);
            if (error.code === "auth/userf-not-found" || error.code === "auth/wrong-password") {
                console.log("no hay usuario")
            }
        }
    }
    const verificarEspacio = (valor) => {
        if (valor == "" || valor == null || valor.includes(" ")) {
            return false
        }
        return true
    }
    const verContraseña = () => {
        setOjo(!ojo)
    }

    const mostrar = (cambiarEstado) => {
        setTimeout(() => {
            cambiarEstado(false)
        }, 2000);
        cambiarEstado(true)
    }

    const validar = () => {
        if (
            !verificarEspacio(userf.contraseña) &&
            !verificarEspacio(userf.correo)
        ) {
            mostrar(setModalAmbos);
        } else {
            if (!verificarEspacio(userf.correo)) {
                mostrar(setModalCorreo);
            } else {
                if (!verificarEspacio(userf.contraseña)) {
                    mostrar(setModalContraseña);
                    console.log("entra a aqui ");
                } else {
                    if (
                        userf.correo != "user@gmail.com" &&
                        verificarEspacio(userf.correo) || userf.contraseña != "1234567"
                    ) {
                        mostrar(setModalInvalido);
                        console.log("entra a aqui ");
                    }
                }
            }
        }
    };

    return (
        <div class="w-100 h-100 container">
            <div class="row ">
                <div class="col d-flex justify-content-center align-middle mt-5">
                    <label class="fs-1 pt-5 textoReflexion">
                        Detener la pérdida y <br />
                        el desperdicio de <br />
                        alimentos<br />
                        por las personas<br />
                        por el planeta
                    </label>

                </div>
                <div class="col p-5 align-middle contenedorInicio">
                    <form onSubmit={handleSubmit} className="contenedorInicio">
                        <div class="text-center fs-4 w-75 font-bold pt-5 mt-5">
                            <label> Inicio de sesión</label>
                            <div class="border border-dark"> </div>
                        </div>

                        <div class="mb-3 w-75 mt-3">
                            <label class="form-label ">Correo electrónico</label>
                            <input type="email" name='correo' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                onChange={handlechange} />
                        </div>

                        <div class="mb-3 w-75">
                            <label class="form-label">Contraseña</label>
                            <div class="input-group">
                                <input class="form-control " name='contraseña' type={ojo ? "text" : "password"} id="exampleInputPassword1"
                                    onChange={handlechange} />
                                <i class={ojo ? "position-relative border end-0 p-3  fa-solid fa-eye "
                                    : "fa-solid fa-eye-slash position-relative border end-0 p-3"}
                                    onClick={verContraseña}></i>
                            </div>
                        </div>


                    </form>
                    <div class="text-center w-75 botonInicio">
                        <button type="submit" class="btn btn-secondary" onClick={handleSubmit}>Acceder</button>
                    </div>

                    <Modals
                        estado={modalAmbos}
                        estadoPantalla={false}
                        texto={"Ingrese su correo y contraseña"}
                        buttons={false}
                        icon={true}
                    />
                    <Modals
                        estado={modalContraseña}
                        estadoPantalla={false}
                        texto={"Ingrese su contraseña "}
                        buttons={false}
                        icon={true}
                    />
                    <Modals
                        estado={modalCorreo}
                        estadoPantalla={false}
                        texto={"Ingrese su correo"}
                        buttons={false}
                        icon={true}
                    />
                    <Modals
                        estado={modalInvalido}
                        estadoPantalla={false}
                        texto={"Verifique el correo y la contraseña"}
                        buttons={false}
                        icon={true}
                    />

                </div>
            </div>
        </div>

    );
}
//ev => setCorreo(ev.target.value)106
//ev => setContraseña(ev.target.value)113
//onClick={validar} del acceder
export default FormInicioSesion