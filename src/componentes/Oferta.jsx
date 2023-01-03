import React, { useState, useEffect } from "react";
import "../estilos/ofertaM.css";
import { useParams } from "react-router-dom";
import { filtrarOfertas } from "./funciones";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { todosCategorias, unicoProducto } from "./funciones";
import Pedido from "./Pedido";
import Modals from "./Modals";
import axios from "axios";

function Mostraroferta({ usuario }) {
  const { user } = useAuth();

  if (usuario != user.uid) {
    return <Navigate to="/" />;
  }
  const [categorias, setCategorias] = useState(null);
  const [ofertas, setOfertas] = useState(null);
  const params = useParams();
  const [modalPedido, setModalPedido] = useState(false);
  const [contador, setContador] = useState(1);
  const [precio, setPrecio] = useState(1);
  const [precioFijo, setPrecioFijo] = useState(1);
  const [modalRealPedido, setModalRealPedido] = useState(false);
  const [modalCancPedido, setModalCancPedido] = useState(false);
  const [notas, setNotas] = useState({ valor: "", estado: false });
  const [valida, setValida] = useState(true);
  const [nombre, setNombre] = useState("");
  const [producto, setProducto] = useState(null);
  const [stock, setStock] = useState(0);
  var url =
    "http://localhost:5000/bd-pickmeup/us-central1/app/api/pedido";

  useEffect(() => {
    filtrarOfertas(params.id, setOfertas);
    todosCategorias(setCategorias);
  }, []);
  //console.log(ofertas)
  const fechaActual = new Date();
  const pr = ofertas || [];
  //console.log(pr)
  const sumar = () => {
    setContador(contador + 1);
    setPrecio((contador + 1) * precioFijo);
  };

  const disminuir = () => {
    if (contador > 1) {
      setContador(contador - 1);
      setPrecio(precioFijo * (contador - 1));
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

  const pasarDatos = (id, precioo, nombree, stock) => {
    setModalPedido(true);
    setPrecioFijo(precioo);
    setPrecio(precioo);
    setNombre(nombree);
    setStock(stock);
    console.log(precio);
    unicoProducto(id, setProducto);
    //mostrarRealPedido()
  };

  const mostrarRealPedido = () => {
    if (valida) {
      axios({
        method: "POST",
        data: {
          Nombre: nombre,
          Imagen: producto.Imagen,
          PrecioUnitario: precio,
          PrecioTotal: producto.Precio,
          Hora: producto.Hora,
          FechaLimite: producto.Fecha,
          Cantidad: contador,
          Nota: notas.valor,
          FlagC: true,
          FlagN: true,
          Stock: producto.Stock,
        },
        url: "http://localhost:5000/bd-pickmeup/us-central1/app/api/pedido",
      })
        .then((response) => {
          if (!response.data.error) {
            console.log(response.data);
          } else {
            console.log(response.data.error[0]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setTimeout(() => {
        setModalPedido(false);
        setModalRealPedido(false);
      }, 3000);
      setModalRealPedido(true);
      setContador(1);
    }
  };

  const mostrarCancPedido = () => {
    setTimeout(() => {
      setModalCancPedido(false);
      setModalPedido(false);
    }, 3000);
    setModalCancPedido(true);
    setContador(1);
  };

  const ofertados = pr.filter((producto) => {
    const fechaPr = new Date(producto.Fecha + "T" + producto.Hora);
    return fechaPr > fechaActual && producto.Precio !== "";
  });

  const ListaOfertas = ofertados.map((oferta) => (
    <div class="list-card" key={oferta.id}>
      <section className="jeimi">
        <h1 className="nombreO">{oferta.Nombre}</h1>
        <span class="price">Precio: {oferta.Precio} Bs</span>
        <br />

        <span class="price">Hora límite: {oferta.Hora} </span>
        <button
          onClick={() => {
            pasarDatos(oferta.id, oferta.Precio, oferta.Nombre);
          }}
          className="mt-5 p-1 ps-2 pe-2 ms-5 btn btn-outline-dark boton-pedido "
        >
          Hacer pedido
        </button>
      </section>
      <section className="seccion1">
        <img className="imgMajo" src={oferta.Imagen} alt="" />
        <span class="list-category">
          <p>{oferta.Descripcion} </p>
        </span>
      </section>
    </div>
  ));

  const pr1 = categorias || [];
  console.log(`Pr1: ${pr1}`);
  const ListaCategorias = pr1.map((categoria) => (
    <a href={`/Oferta/${categoria.id}`}>{categoria.Name}</a>
  ));
  return (
    <div className="container89">
      <div class="default-hero-banner">
                <img src="https://pbs.twimg.com/media/FhJUxarUoAA5TBJ?format=jpg&name=4096x4096" alt="" className="Fotofondo" />
                <div className="Lab">
                    <h1 className="gt pt-4">
                        ¿Qué quieres comer hoy?
                    </h1>
                    <h1 className="gt1 pt-4">
                    Alimentos frescos y saludables, siempre
                    </h1>
                </div>
                
            </div>

            <div class="list-section">
                <div class="left-section">
                    <section class="column-1 h1Categoria">
                        <h1>Categorías</h1>
                        {ListaCategorias}
                    </section>
                </div>
                <div class="right-section">
                    <div class="list-cards">
                        {ListaOfertas}
                    </div>
                </div>
            </div>

      <Pedido estado={modalPedido}>
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
                <div className="sumador-precio p-2">Bs : {precio}</div>
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
      </Pedido>
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
    </div>
  );
}
export default Mostraroferta;