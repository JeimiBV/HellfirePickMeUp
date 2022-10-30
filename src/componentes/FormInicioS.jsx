/*import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';*/
import React from 'react';
import Modals from "./Modals";
import { useState } from "react";

function FormInicioSesion() {
    const [ modalCorreo, setModalCorreo]=useState(false)
    const [ correo, setCorreo]= useState("")
    const [ modalContraseña, setModalContraseña] =useState(false)
    const [ contraseña, setContraseña]=useState("")
    const [ modalAmbos,setModalAmbos]=useState(false)
    const [ojo,setOjo]=useState(false)
    
    const verificarEspacio =(valor)=>{
        if(valor==""|| valor==null || valor.includes(" ")){
            return false
        }
        return true
     }
     const verContraseña=()=>{
        setOjo(!ojo)
     }

    const mostrar=(cambiarEstado)=>{
        setTimeout(()=>{
            cambiarEstado(false)
        },2000);
        cambiarEstado(true)
    }
     const validar=()=>{
        if(verificarEspacio(correo) && verificarEspacio(contraseña)){
            console.log("espacios con contenido")
        }
        else{
            if(!verificarEspacio(correo)&& !verificarEspacio(contraseña) ){
                console.log("contraseña y correo estan vacíos")
                mostrar(setModalAmbos)
            }
            else{
                if(!verificarEspacio(correo)){
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
        <div class="w-100 h-100 container ">
            <div class="row ">
                <div class="col d-flex justify-content-center align-middle mt-5">
                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
    <label class="fs-1 pt-5">
            Detener la <br />  pérdida y el <br /> desperdicio de <br /> alimentos<br /> por las personas<br /> por el planeta
        </label>
    </div>
    <div class="carousel-item">
    <label class="fs-1 pt-5">
         Detener la <br />  pérdida y el <br /> desperdicio de <br /> alimentos<br /> por las personas<br /> por el planeta
        </label>
    </div>
    <div class="carousel-item">
    <label class="fs-1 pt-5">
            Detener la <br />  pérdida y el <br /> desperdicio de <br /> alimentos<br /> por las personas<br /> por el planeta
     </label>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

                </div>
                <div class="col p-5 align-middle">
                    <form>
                        <div class="text-center fs-4 w-75 font-bold pt-5 mt-5">
                            <label> Inicio de Sesión</label>
                            <div class="border border-dark"> </div>
                        </div>

                        <div class="mb-3 w-75 mt-3">
                            <label class="form-label ">Correo electrónico</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                            onChange={ev => setCorreo(ev.target.value)} />
                        </div>

                        <div class="mb-3 w-75">
                            <label class="form-label">Contraseña</label>
                            <div class="input-group">
                                <input class="form-control " type={ojo?"text":"password"} id="exampleInputPassword1"
                                onChange={ev => setContraseña(ev.target.value)} />
                                <i class={ojo?"position-relative border end-0 p-3  fa-solid fa-eye "
                                        :"fa-solid fa-eye-slash position-relative border end-0 p-3"}
                                 onClick={verContraseña}></i>
                            </div>
                        </div>


                    </form>
                    <div class="text-center w-75">
                            <button type="submit" class="btn btn-secondary "onClick={validar}>Acceder</button>
                        </div>

                    <Modals
                      estado={modalAmbos}
                      cambiarEstado={setModalAmbos}
                      estadoPantalla={false}
                      texto={"No se aceptan espacios vacíos"}/>
                    <Modals
                      estado={modalContraseña}
                      cambiarEstado={setModalContraseña}
                      estadoPantalla={false}
                      texto={"Ingrese su contraseña "}/>
                    <Modals
                      estado={modalCorreo}
                      cambiarEstado={setModalCorreo}
                      estadoPantalla={false}
                      texto={"Ingrese su correo"}/>
              
                </div>

            </div>
        </div>

    );
}
export default FormInicioSesion;