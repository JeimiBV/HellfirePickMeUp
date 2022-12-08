/*import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';*/
import React from "react";
import Modals from "./Modals";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Navigate, useNavigate } from "react-router-dom";
import "../estilos/formularioInicio.css";

function FormInicioSesion() {
  const [modalCorreo, setModalCorreo] = useState(false);
  const [modalContraseña, setModalContraseña] = useState(false);
  const [modalAmbos, setModalAmbos] = useState(false);
  const [ojo, setOjo] = useState(false);
  const [error, setError] = useState();
  const [modalInvalido, setModalInvalido] = useState(false);
  const [userf, setUser] = useState({
    correo: "",
    contraseña: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handlechange = ({ target: { name, value } }) => {
    setUser({ ...userf, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    validar();
    setError("");
    try {
      if (userf.correo == "user@gmail.com") {
        await login(userf.correo, userf.contraseña);
        navigate("/vistaConsumidor");
      }
    } catch (error) {
      console.log(error.code);
      if (
        error.code === "auth/userf-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        console.log("no hay usuario");
      }
    }
  };
  const verificarEspacio = (valor) => {
    if (valor == "" || valor == null || valor.includes(" ")) {
      return false;
    }
    return true;
  };
  const verContraseña = () => {
    setOjo(!ojo);
  };

  const mostrar = (cambiarEstado) => {
    setTimeout(() => {
      cambiarEstado(false);
    }, 2000);
    cambiarEstado(true);
  };

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
            (userf.correo != "user@gmail.com" &&
              verificarEspacio(userf.correo)) ||
            userf.contraseña != "1234567"
          ) {
            mostrar(setModalInvalido);
            console.log("entra a aqui ");
          }
        }
      }
    }
  };

  return (
    <div class="w-100 h-100">
      <div id="wrapper">
        <div id="right">
          <div id="showcase">
            <div class="showcase-content">
              <h1 class="showcase-text">
                Detener La Pérdida Y
                <br />
                El Desperdicio De
                <br />
                Alimentos
                <br />
                Por Las Personas
                <br />
                Por El Planeta
              </h1>
            </div>
          </div>
        </div>
        <div id="left">
          <div id="signin">
            <div class="logo">
              <h1> Inicio de sesión </h1>
              <hr />
              <h4 class="text-center"> Consumidor </h4>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Correo electrónico</label>
                <input type="text" class="text-input" onChange={handlechange} />
              </div>

              <div class="mb-3 w-75">
                <label>Contraseña</label>
                <div class="input-group contraseñaVisible">
                  <input
                    onChange={handlechange}
                    type={ojo ? "text" : "password"}
                    class="text-input form-label form-control espacioContraseña"
                  />
                  <i
                    id="ojito"
                    class={
                      ojo ? "    fa-solid fa-eye " : "fa-solid fa-eye-slash   "
                    }
                    onClick={verContraseña}
                  ></i>
                </div>
              </div>
            </form>
            <button type="submit" class="primary-btn" onClick={handleSubmit}>
              Acceder
            </button>
          </div>
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
  );
}
//ev => setCorreo(ev.target.value)106
//ev => setContraseña(ev.target.value)113
//onClick={validar} del acceder
export default FormInicioSesion;
