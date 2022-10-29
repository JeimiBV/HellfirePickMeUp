/*import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';*/
import React from 'react';

function FormInicioSesion() {
    return (
        <div class="w-100 h-100">
            <div class="row ">
                <div class="col d-flex justify-content-center align-middle">
                    <label class="fs-1 p-5">
                        Detener la <br />  pérdida y el <br /> desperdicio de <br /> alimentos<br /> por las personas<br /> por el planeta
                    </label>
                </div>
                <div class="col p-5 align-middle">
                    <form>
                        <div class="text-center fs-4 w-75 font-bold">
                            <label> Inicio de Sesión</label>
                            <div class="border border-dark"> </div>
                        </div>

                        <div class="mb-3 w-75 mt-3">
                            <label class="form-label ">Correo electrónico</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>

                        <div class="mb-3 w-75">
                            <label class="form-label">Contraseña</label>
                            <div class="input-group">
                                <input class="form-control" id="exampleInputPassword1" />
                                <i class="position-absolute d-block top-50 end-0 me-2 fa-solid fa-eye"></i>
                            </div>
                        </div>

                        <div class="text-center w-75">
                            <button type="submit" class="btn btn-secondary ">Acceder</button>
                        </div>

                    </form>
                </div>

            </div>
        </div>

    );
}
export default FormInicioSesion;