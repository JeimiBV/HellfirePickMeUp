import React, { useEffect, useState, setState } from "react";
import { todosPedidos } from "../funciones";
import '../../estilos/estilosPedidos.css';
import { useAuth } from "../../context/authContext";
import { getDownloadURL } from "firebase/storage";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
const ListaPedidos = ({ usuario }) => {

   const { user } = useAuth();

   if (usuario != user.uid) {
      return <Navigate to="/" />
   }

   const [pedidos, setPedidos] = useState(null)
   const [post, setPost] = useState(null);
   const [tablaPedi, setTablaPedi] = useState([]);
   const [busqueda, setBusqueda] = useState("");
   const url = "https://us-central1-base-de-datos-h.cloudfunctions.net/app/api/pedido";
   //const [productos, setProductos] = useState(null)
   //const [pedido, setPedidos] = useState(null)
   const params = useParams()
   useEffect(() => {
      todosPedidos(setPedidos)
      todosPedidos(setTablaPedi)
      if (post !== null) {
         axios.get(`${url}/1`).then((response) => {
            setPost(response.data);
         });
      }
   }, [post])
   function updatePedido(pedidosC) {
      console.log(pedidosC)
      axios
         .put(`${url}/${pedidosC.id}`, {
            Imagen: pedidosC.Imagen,
            PrecioUnitario: pedidosC.PrecioUnitario,
            PrecioTotal: pedidosC.PrecioTotal,
            Hora: pedidosC.Hora,
            FechaLimite: pedidosC.FechaLimite,
            Cantidad: pedidosC.Cantidad,
            Nota: pedidosC.Nota,
            FlagC: false,
            FlagN: pedidosC.FlagN,
            Stock: pedidosC.Stock

         })
         .then((response) => {
            setPost(response.data);
         });
   }

   const handleChange = e => {
      setBusqueda(e.target.value);
      if (/[A-Za-z]/.test(e.target.value) || !/\s/.test(e.target.value)) {
         filtrar(e.target.value);
      }
   }

   const fechaActual = new Date()
   const pr = pedidos || []

   const listaP = pr.filter(pedido => {
      const fechaPr = new Date(pedido.FechaLimite + 'T' + pedido.Hora)
      return pedido.FlagC == true;
   }
   )
   const filtrar = (terminoBusqueda) => {
      var resultadosBusqueda = tablaPedi.filter((elemento) => {
         if (elemento.Nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
            return elemento.FlagN == true;
         }
      });
      setPedidos(resultadosBusqueda);
   }

   /*const deleteTask = (id) => {
       const filteredTasks = pr.filter(pedido => pedido.id !== id)
       setPedidos(filteredTasks)
       
   }*/

   return (

      <>
         <div className=" containerPed">
            <h1 className="titulo text-center m-4" > Pedidos </h1>
            <div className="buscador">
               <form class="d-flex justify-content-center" value={busqueda} role="search" onChange={handleChange}>
                  <i class="bi bi-search px-3"></i>
                  <input class="form-control inputBusc me-2 px-5" type="search" placeholder=" Ingrese el nombre del pedido..." aria-label="Search" />
               </form>
            </div>
            <div className="PedidosP">
               {listaP != null ? (
                  listaP.map(pedidosC => (
                     <div className="row row-col" key={pedidosC.id}>
                        <div class="art-board">
                           <div class="art-board__container">
                              <div class="cardss">
                                 <div class="card__image">
                                    <img className="imgn" src={pedidosC.Imagen} alt=" " />
                                 </div>
                                 <div class="card__info">
                                    <div class="car__info--title">
                                       <h3 >{pedidosC.Nombre}</h3>
                                    </div>
                                 </div>
                                 <div className=" face back" >
                                    <p className="" >
                                       <span > Precio: {pedidosC.PrecioUnitario} bs.</span>
                                       <span className="d-block"> Hora límite:{pedidosC.Hora} </span>
                                       <span className="d-block">Fecha límite: {pedidosC.FechaLimite} </span>
                                       <span className="d-block">Cantidad: {pedidosC.Cantidad} </span>
                                    </p>
                                    <button className="botonEliminar" color="danger" onClick={()=>{updatePedido(pedidosC)}} >
                                    <i class="fa-solid fa-trash"></i></button>
                                    
                                 </div>
                              </div>
                           </div>
                           
                        </div>
                        
                     </div>
                     
                  )
                  )
               ) : ('no hay productos')}
            </div>
            
         </div>

      </>
   )
}

export default ListaPedidos