import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { todosPedidos } from "./funciones";
import "../estilos/PedidosN.css";
import axios from "axios";

function MostrarPedidosN({ usuario }) {
  const { user } = useAuth();

  if (usuario != user.uid) {
    return <Navigate to="/" />;
  }
  const [pedidos, setPedidos] = useState([]);
  const [post, setPost] = useState(null);
  const [tablaPedi, setTablaPedi] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  var validacion = 0;

  const url =
    "https://us-central1-base-de-datos-h.cloudfunctions.net/app/api/pedido";

  useEffect(() => {
    todosPedidos(setPedidos);
    todosPedidos(setTablaPedi);
    if (post !== null) {
      axios.get(`${url}/1`).then((response) => {
         setPost(response.data);
      });
   }
  }, [post]);

  function updatePedido(pedido) {
    
    axios
      .put(`${url}/${pedido.id}`, {
        Imagen: pedido.Imagen,
        PrecioUnitario: pedido.PrecioUnitario,
        PrecioTotal: pedido.PrecioTotal,
        Hora: pedido.Hora,
        FechaLimite: pedido.FechaLimite,
        Cantidad: pedido.Cantidad,
        Nota: pedido.Nota,
        FlagC: pedido.FlagC,
        FlagN: false,
        Stock: pedido.Stock,
      })
      .then((response) => {
        setPost(response.data);
        // console.log("succesfull!!");
        //mostrarSi();
      });
  }

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    if (/[A-Za-z]/.test(e.target.value) || !/\s/.test(e.target.value)) {
      filtrar(e.target.value);
    }
  };

  const pr1 = pedidos || [];
  pr1.map((pedido) => {
    if (pedido.FlagN == true) {
      validacion += 1;
    }
  });
  const pedidos1 = pr1.filter((pedido) => {
    return pedido.FlagN == true;
  });

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = tablaPedi.filter((elemento) => {
      if (
        elemento.Nombre.toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento.FlagN == true;
      }
    });
    setPedidos(resultadosBusqueda);
  };

  /*const ListaPedidos = pedidos1.map(pedido => (*/

  return (
    <div className="containerG mt-3">
      <h1 className="titleL"> Lista de pedidos </h1>
      <div class="container-fluid">
        <div className="buscador">
          <form
            class="d-flex justify-content-center"
            value={busqueda}
            role="search"
            onChange={handleChange}
          >
            <i class="bi bi-search px-3"></i>
            <input
              class="form-control inputBusc me-2 px-4"
              type="search"
              placeholder=" Ingrese el nombre del pedido..."
              aria-label="Search"
            />
          </form>
        </div>

        <div id="fda_app" class="row">
          <section id="fda_product_tile" class="col-12">
            <div class="row fda_food_row">
              {pedidos1 != null
                ? pedidos1.map((pedido) => (
                    <div class="col-9" key={pedido.id}>
                      <div class="food_tile active">
                        <img
                          src={pedido.Imagen}
                          alt=""
                          class="fda_product_img"
                        />

                        <span class="food_name">{pedido.Nombre}</span>

                        <span class="food_detail">{pedido.Nota}</span>
                        <div class="botonN">
                          <ul id="food_meta">
                            <li>
                              Cantidad:
                              <span>{pedido.Cantidad}</span>
                            </li>
                            <li>
                              Precio total:
                              <span>Bs {pedido.PrecioUnitario}</span>
                            </li>
                          </ul>

                          <button
                            type="button"
                            class="btn btn-sm btn-default"
                            onClick={() => {
                              updatePedido(pedido);
                            }}
                          >
                            Entregado
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                : "No hay pedidos "}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
export default MostrarPedidosN;
