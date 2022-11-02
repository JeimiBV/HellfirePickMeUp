/*import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';*/
import React from 'react';
import Modals from "./Modals";
import { useState } from "react";
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'


function FormInicioSesion() {
    const [modalCorreo, setModalCorreo] = useState(false)
    const [modalContraseña, setModalContraseña] = useState(false)
    const [modalAmbos, setModalAmbos] = useState(false)
    const [ojo, setOjo] = useState(false);
    const [error, setError] = useState();
    const [modalInvalido, setmodalInvalido]=useState(false);
    const [user, setUser] = useState({
        correo: '',
        contraseña: ''
    });

    const { login } = useAuth();
    const navigate = useNavigate();

    const handlechange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })

    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        validar()
        setError('');
        try {
            await login(user.correo, user.contraseña);
            navigate("/formulario")
            console.log(user)
        } catch (error) {
            console.log(error.code);
            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                console.log("no hay usuario")
                mostrar(setmodalInvalido)
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
        if (verificarEspacio(user.correo) && verificarEspacio(user.contraseña)) {
            console.log("espacios con contenido")
        }
        else {
            if (!verificarEspacio(user.correo) && !verificarEspacio(user.contraseña)) {
                console.log("contraseña y correo estan vacíos")
                mostrar(setModalAmbos)
            }
            else {
                if (!verificarEspacio(user.correo)) {
                    console.log("correo vacío")
                    mostrar(setModalCorreo)
                    return true
                }
                console.log("contraseña vacía")
                mostrar(setModalContraseña)
            }

        }
    }

    return (
        <div class="w-100 h-100 ">
            <div class="row ">
                <div class="col d-flex justify-content-center align-middle mt-5">
                <label class="fs-1 pt-5 ">
                                    Detener la <br />  
                                    pérdida y el <br />
                                    desperdicio de <br /> 
                                    alimentos<br /> 
                                    por las personas<br /> 
                                    por el planeta
                </label>

                </div>
                <div class="col p-5 align-middle">
                    <form onSubmit={handleSubmit}>
                        <div class="text-center fs-4 w-75 font-bold pt-5 mt-5">
                            <label> Inicio de Sesión</label>
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
                    <div class="text-center w-75">
                        <button type="submit" class="btn btn-secondary" onClick={handleSubmit}>Acceder</button>
                    </div>

                    <Modals
                        estado={modalAmbos}
                        cambiarEstado={setModalAmbos}
                        estadoPantalla={false}
                        texto={"No se aceptan espacios vacíos"} 
                        buttons={false}
                        />
                    <Modals
                        estado={modalContraseña}
                        cambiarEstado={setModalContraseña}
                        estadoPantalla={false}
                        texto={"Ingrese su contraseña "} 
                        buttons={false}
                        />
                    <Modals
                        estado={modalCorreo}
                        cambiarEstado={setModalCorreo}
                        estadoPantalla={false}
                        texto={"Ingrese su correo"} 
                        buttons={false}
                        />
                    <Modals
                        estado={modalInvalido}
                        cambiarEstado={setmodalInvalido}
                        estadoPantalla={false}
                        texto={"Verifique que su correo y contraseña sean correctas"}
                        buttons={false}
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