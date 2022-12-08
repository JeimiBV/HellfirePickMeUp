import React from "react";
import { app } from "../fb";
import Modals from "./Modals";
import "../estilos/formulario.css";
import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import axios from "axios";

function Form({ usuario }) {
  //codigo para bloquear la ida hacia atras
  window.location.hash = "no-back-button";
  window.location.hash = "Again-No-back-button"; //esta linea es necesaria para chrome
  window.onhashchange = function () {
    window.location.hash = "no-back-button";
  };
  const { user } = useAuth();

  if (usuario != user.uid) {
    return <Navigate to="/" />;
  }

  const [nombre, setNombre] = useState({
    valor: "",
    estado: false,
    check: false,
  });
  const [descripcion, setDescripcion] = useState({
    valor: "",
    estado: false,
    check: false,
  });
  const [archivo, setArchivo] = useState(false);
  const [modalConf, setModalConf] = useState(false);
  const [modalSi, setModalSi] = useState(false);
  const [modalNo, setModalNo] = useState(false);
  const [imagen, setImagen] = useState({ estado: false });
  const [modalError, setModalError] = useState(false);
  const opciones = [
    "Alimentos enlatados",
    "Bebidas calientes",
    "Bebidas frías",
    "Carnes y pescado",
    "Cereales",
    "Comidas",
    "Ensalada",
    "Frutas y verduras",
    "Lácteos y huevos",
    "Panadería y pastelería",
    "Postres",
    "Snacks",
  ];
  const [producto, setProducto] = useState({
    valor: "seleccione el tipo",
    estado: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [urlImagen, setUrlImagen] = useState("");

  const cargarFoto = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const storage = getStorage();
    console.log(file.name);
    const storageRef = await ref(storage, `/${file.name}`);

    setIsLoading(true);
    await uploadBytes(storageRef, file).then((snapshot) => {
      setIsLoading(false);
    });

    const laUrl = await getDownloadURL(storageRef);
    let test = laUrl.toString();
    console.log(test);
    setUrlImagen(test);

    validarImagen(event);
    validarTamImagen(event);
  };

  const validarImagen = (ev) => {
    const file = ev.target.files[0],
      pattern = /^image/;

    if (!pattern.test(file.type)) {
      mostrarError();
      ev.target.value = null;
    }
  };

  const validarTamImagen = (ev) => {
    const file = ev.target.files[0];
    var height = file.height;
    var width = file.width;
    if (height < 200 || width < 200) {
      setArchivo(true);
    } else {
      setArchivo(false);
    }
  };

  const checkNombre = (ev) => {
    setNombre((prevState) => ({ ...prevState, valor: ev.target.value }));

    if (
      ev.target.value.length >= 2 &&
      ev.target.value.length <= 30 &&
      ev.target.value !== null &&
      validacionEspacios(nombre.valor)
    ) {
      setNombre((prevState) => ({ ...prevState, check: true }));
      console.log(nombre.check);
    } else {
      setNombre((prevState) => ({ ...prevState, check: false }));
    }
  };
  const checkDescripcion = (ev) => {
    setDescripcion((prevState) => ({ ...prevState, valor: ev.target.value }));
    if (
      ev.target.value.length >= 10 &&
      ev.target.value.length <= 100 &&
      ev.target.value !== null &&
      validacionEspacios(descripcion.valor)
    ) {
      setDescripcion((prevState) => ({ ...prevState, check: true }));
    } else {
      setDescripcion((prevState) => ({ ...prevState, check: false }));
    }
  };
  const checkProducto = () => {
    if (producto.valor !== "seleccione el tipo") {
      setProducto((prevState) => ({ ...prevState, check: true }));
    } else {
      setProducto((prevState) => ({ ...prevState, check: false }));
    }
  };

  const validacion = () => {
    if (
      nombre.valor.length >= 2 &&
      nombre.valor.length <= 30 &&
      descripcion.valor.length >= 10 &&
      descripcion.valor.length <= 100 &&
      producto.valor !== "seleccione el tipo" &&
      urlImagen != "" &&
      validacionEspacios(nombre.valor) &&
      validacionEspacios(descripcion.valor)
    ) {
      setNombre((prevState) => ({ ...prevState, estado: false }));
      setDescripcion((prevState) => ({ ...prevState, estado: false }));
      setProducto((prevState) => ({ ...prevState, estado: false }));
      setImagen((prevState) => ({ ...prevState, estado: false }));

      setModalConf(true);
    } else {
      if (
        nombre.valor.length >= 2 &&
        nombre.valor.length <= 30 &&
        validacionEspacios(nombre.valor)
      ) {
        setNombre((prevState) => ({ ...prevState, estado: false }));
      } else {
        setNombre((prevState) => ({ ...prevState, estado: true }));
      }
      if (
        descripcion.valor.length >= 10 &&
        descripcion.valor.length <= 100 &&
        validacionEspacios(descripcion.valor)
      ) {
        setDescripcion((prevState) => ({ ...prevState, estado: false }));
      } else {
        setDescripcion((prevState) => ({ ...prevState, estado: true }));
      }
      if (producto.valor !== "seleccione el tipo") {
        setProducto((prevState) => ({ ...prevState, estado: false }));
      } else {
        setProducto((prevState) => ({ ...prevState, estado: true }));
      }
      if (urlImagen != "") {
        setImagen((prevState) => ({ ...prevState, estado: false }));
      } else {
        setImagen((prevState) => ({ ...prevState, estado: true }));
      }
    }
  };

  const validacionEspacios = (parametro) => {
    var patron = /^\s+$/;
    if (patron.test(parametro)) {
      return false;
    } else {
      return true;
    }
  };

  const mostrarError = () => {
    setTimeout(() => {
      setModalNo(false);
      setModalSi(false);
      setModalError(false);
    }, 3000);
    setModalConf(false);
    setModalError(true);
  };

  const mostrarSi = () => {
    axios({
      method: "POST",
      data: {
        Nombre: nombre.valor,
        Descripcion: descripcion.valor,
        Tipo: producto.valor,
        Imagen: urlImagen,
      },
      url: "https://us-central1-base-de-datos-h.cloudfunctions.net/app/api/products",
    })
      .then((response) => {
        if (!response.data.error) {
          console.log(response.data);
        } else {
          console.log(response.data.error[0]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    setTimeout(() => {
      setModalNo(false);
      setModalSi(false);
    }, 3000);
    setModalConf(false);
    setModalSi(true);
    console.log("datos enviados");

    document.getElementById("formProducto").reset();
    setModalConf(false);
    setModalSi(true);
    setNombre((prevState) => ({ ...prevState, valor: "", check: false }));
    setDescripcion((prevState) => ({ ...prevState, valor: "", check: false }));
    setProducto((prevState) => ({
      ...prevState,
      valor: "seleccione el tipo",
      check: false,
    }));
  };
  const mostrarNo = () => {
    setTimeout(() => {
      setModalNo(false);
      setModalSi(false);
    }, 3000);
    setModalConf(false);
    setModalNo(true);
  };

  //http://localhost:5000/fir-crud-c44e7/us-central1/app/api/products

  return (
    <div className="contenedorF">
      <div className="containerForm">
        <h1 id="title">Registrar Producto</h1>
        <div className="contenedorDeContenedor">
          <form id="survey-form" enctype="multipart/form-data">
            <div class="form-option">
              <label for="name" id="name-label">
                Nombre del producto
              </label>
              <div className="contenedor-input">
                <div className="icono">
                  <input
                    className="entrada"
                    name="Nombre"
                    placeholder="Ingrese el nombre"
                    onChange={(ev) => checkNombre(ev)}
                  ></input>
                  <i
                    class={
                      nombre.check
                        ? "fa-regular fa-circle-check fa-2x"
                        : "transparent"
                    }
                  ></i>
                </div>
                <h3 className={nombre.estado ? "validacion" : "invisible"}>
                  El nombre debe contener de 2 a 30 caracteres
                </h3>
              </div>
            </div>
            <div class="form-option">
              <label for="name" id="name-label">
                Descripción del producto
                <div className="contenedor-input">
                  <div className="icono">
                    <input
                      className="entrada"
                      name="Descripcion"
                      placeholder="Ingrese la descripción"
                      onChange={(ev) => checkDescripcion(ev)}
                    ></input>
                    <i
                      class={
                        descripcion.check
                          ? "fa-regular fa-circle-check fa-2x"
                          : "transparent"
                      }
                    ></i>
                  </div>
                  <h3
                    className={descripcion.estado ? "validacion" : "invisible"}
                  >
                    La descripción debe contener de 10 a 100 caracteres
                  </h3>
                </div>
              </label>
            </div>

            <div class="form-option">
              <label for="name" id="name-label">
                Tipo de producto
                <div className="contenedor-input">
                  <div className="icono">
                    <select
                      name="want to be chef"
                      id="dropdown"
                      className="selectProducto"
                      onClick={checkProducto}
                      onChange={(e) =>
                        setProducto((prevState) => ({
                          ...prevState,
                          valor: e.target.value,
                        }))
                      }
                    >
                      <option disabled selected value class="porDefecto">
                        Seleccione el tipo
                      </option>
                      {opciones.map((value) => (
                        <option value={value} key={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                    <i
                      class={
                        producto.check
                          ? "fa-regular fa-circle-check fa-2x"
                          : "transparent"
                      }
                    ></i>
                  </div>
                  <h3 className={producto.estado ? "validacion" : "invisible"}>
                    Se debe seleccionar una opción
                  </h3>
                </div>
              </label>
            </div>

            <div class="form-option">
              <label for="name" id="name-label">
                Insertar imagen
              </label>
              <div className="icono">
                <input
                  id="img"
                  type="file"
                  className="botonA"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={cargarFoto}
                />
                <input type="hidden" name="Imagen" value={urlImagen} />
              </div>
              <h3 className={imagen.estado ? "validacion" : "invisible"}>
                Se debe seleccionar una imagen
              </h3>
              <h3 className={isLoading ? "validacion" : "invisible"}>
                Cargando imagen ...
              </h3>
              <h3 className={archivo ? "validacion" : "invisible"}>
                Solo se permite imágenes superiores a 200 x 200
              </h3>
            </div>
          </form>
          <div class="form-option">
            <input
              type="submit"
              value="Enviar"
              class="submit botonR"
              onClick={validacion}
              required
            />
          </div>
        </div>

        <Modals
          estado={modalConf}
          cambiarEstado={setModalConf}
          estadoPantalla={true}
          texto={"Seguro de guardar el producto?"}
          titulo={" Registro de producto"}
          mostrarSi={mostrarSi}
          mostrarNo={mostrarNo}
          buttons={true}
        />
        <Modals
          estado={modalSi}
          cambiarEstado={setModalSi}
          estadoPantalla={true}
          texto={"Guardando registro ..."}
          buttons={false}
        />
        <Modals
          estado={modalNo}
          cambiarEstado={setModalNo}
          estadoPantalla={true}
          texto={"Cancelado"}
          buttons={false}
        />
        <Modals
          estado={modalNo}
          cambiarEstado={setModalNo}
          estadoPantalla={true}
          texto={"Cancelado"}
          buttons={false}
        />
        <Modals
          estado={modalError}
          cambiarEstado={setModalError}
          estadoPantalla={true}
          texto={"Se debe insertar una imagen"}
          buttons={false}
        />
      </div>
    </div>
  );
}
export default Form;
