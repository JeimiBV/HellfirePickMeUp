import React, {useEffect, useState} from "react";
import "../estilos/productos.css";
import {todosProductos} from './funciones'
import { Navigate } from "react-router-dom";
import { useAuth } from '../context/authContext'
import "../estilos/Informacion.css";
import { Link, useParams } from "react-router-dom";
import { unicoProducto } from "./funciones";
import Ofertar from "./Ofertar";
import Modals from "./Modals";
import axios from "axios";


function Productoslista({usuario}) {
     //codigo para bloquear la ida hacia atras
     window.location.hash="no-back-button";
     window.location.hash="Again-No-back-button";//esta linea es necesaria para chrome
     window.onhashchange=function(){window.location.hash="no-back-button";}
    const { user } = useAuth();
    
    if(usuario!=user.uid){
        return <Navigate to ="/"/>
    }
   ///Informacion producto
   const [modalOf, setModalOf] = useState(false);
   const [modalSi, setModalSi] = useState(false);
   const [modalNo, setModalNo] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [Precio, setPrecio] = useState({ estado: false, valor: "" }); // tarea 9
   const [Fecha, setFecha] = useState({ estado: false, valor: "AAAA-MM-DD" }); // tarea 10
   const [Hora, setHora] = useState({ estado: false, valor: "--:--" }); // tarea 11
   const [Stock, setStock] = useState({ estado: false, valor: "" }); 
   const [modalConf, setModalConf] = useState(false);
   const [producto, setProductos] = useState(null);
   const [oferta, setOfertas] = useState(null);
   
   const [product, setProduct]=useState([])
   const [tablaProductos, setTablaProductos]= useState([]);
   const [busqueda, setBusqueda]= useState("");
   const params = useParams();

   const [post, setPost] = useState(null);
   const url =
       "https://us-central1-base-de-datos-h.cloudfunctions.net/app/api/products";
   useEffect(() => {
       unicoProducto(params.id, setProductos);

       if (post !== null) {
           axios.get(`${url}/1`).then((response) => {
               setPost(response.data);
           });
       }
   }, [post]);

   function updatePost() {
       axios
           .put(`${url}/${params.id}`, {
               Nombre: producto.Nombre,
               Descripcion: producto.Descripcion,
               Tipo: producto.Tipo,
               Imagen: producto.Imagen,
               Precio: document.getElementById("numero").value,
               Fecha: document.getElementById("fecha").value,
               Hora: document.getElementById("hora").value,
               Stock: document.getElementById("stock").value,
               
           })
           
           .then((response) => {
               setPost(response.data);
               mostrarSi();
           
           });
   }

   const Validar = () => {
     
       const aux = formatoFecha('yyyy-mm-dd',0) == Fecha.valor && Hora.valor <= formatoHora();
       const aux2 = Fecha.valor <= formatoFecha('yyyy-mm-dd',5);
       if ((Precio.valor > 0) && 
       (Precio.valor < 99999)&&
       (Fecha.valor !== 'AAAA-MM-DD' && (Fecha.valor >= formatoFecha('yyyy-mm-dd',0))) &&
        (Hora.valor !== '--:--') && !aux && aux2) {
           setPrecio(prevState => ({ ...prevState, estado: false }))
           setFecha(prevState => ({ ...prevState, estado: false }));
           setHora(prevState => ({ ...prevState, estado: false }));
           setStock(prevState =>({...prevState, estado:false}));
           setIsLoading(false)
           setModalConf(true);

       } else {
           setIsLoading(true);

           if (Precio.valor > 0 && Precio.valor < 99999) {
               setPrecio(prevState => ({ ...prevState, estado: false }));
           } else {
               setPrecio(prevState => ({ ...prevState, estado: true }));
           }
           if (Fecha.valor !== 'AAAA-MM-DD' && Fecha.valor >= formatoFecha('yyyy-mm-dd',0) && aux2) {
               setFecha(prevState => ({ ...prevState, estado: false }));
           } else {
               setFecha(prevState => ({ ...prevState, estado: true }));
           }
           if (Hora.valor !== '--:--') {
               if (aux) {
                   setHora(prevState => ({ ...prevState, estado: true }));
               } else {
                   setHora(prevState => ({ ...prevState, estado: false }));
               }

           } else {
               setHora(prevState => ({ ...prevState, estado: true }));
           }
           if(Stock.valor<=0){
               setStock(prevState => ({ ...prevState, estado: true }));
           }
           else{
               setStock(prevState => ({ ...prevState, estado: false }));
           }
       }

   }

   const mostrarSi = () => {
       setTimeout(() => {
           setModalNo(false);
           setModalSi(false);
       }, 3000);

       document.getElementById("form").reset();
       setModalConf(false);
       setModalSi(true);
       setPrecio((prevState) => ({ ...prevState, estado: false }));
       setFecha((prevState) => ({ ...prevState, estado: false }));
       setHora((prevState) => ({ ...prevState, estado: false }));
       setStock((prevState) => ({ ...prevState, estado: false }));
       window.location.pathname = "/listaOfertas";
   };

   const guardarOferta = () => { };

   const mostrarNo = () => {
       setTimeout(() => {
           setModalNo(false);
           setModalSi(false);
       }, 3000);
       setPrecio(prevState => ({ ...prevState, valor: '' }));
       setFecha(prevState => ({ ...prevState, valor: 'AAAA-MM-DD' }));
       setHora(prevState => ({ ...prevState, valor: '--:--' }));
       setHora(prevState => ({ ...prevState, valor: '1' }));
       document.getElementById("form").reset();
       setModalConf(false);
       setModalNo(true);
   };

   function formatoFecha(formato,year) {
       const date = new Date();
       const map = {
           dd: date.getDate(),
           mm: date.getMonth() + 1,
           yyyy: date.getFullYear() + year
       }

       if (date.getDate() < 10) {
           map.dd = '0' + date.getDate()
       }

       return (formato.replace(/dd|mm|yyyy/gi, matched => map[matched]))
   }
   function formatoHora() {
       const tiempoT = new Date();
       const hoy = tiempoT.getHours() + ':' + tiempoT.getMinutes();
       return (hoy);
   }

   const [show, setShow] = useState(false);
   const mostrar = (cambiarEstado) => {
       setTimeout(() => {
           cambiarEstado(false);
       }, 2000);
       cambiarEstado(true);
   };

   const mostrarModal = () => {
       mostrar(setShow);
   };

   const mostrarModalOf = () => {
       setModalOf(true);
   };
   const ocultarModalOf = () => {
       setModalOf(false);
       setPrecio(prevState => ({ ...prevState, estado: false }));
       setFecha(prevState => ({ ...prevState, estado: false }));
       setHora(prevState => ({ ...prevState, estado: false }));
       setStock(prevState => ({ ...prevState, estado: false }));
   }; 
   ///Mostrar lista producto
   

    useEffect(() => {
        todosProductos(setProduct)
        todosProductos(setTablaProductos)
    },[] )
    
    const handleChange=e=>{
        setBusqueda(e.target.value);
        if (/[A-Za-z]/.test(e.target.value) || !/\s/.test(e.target.value)) {
           filtrar(e.target.value); 
        }                  
    }

    const filtrar=(terminoBusqueda)=>{
        var resultadosBusqueda=tablaProductos.filter((elemento)=>{
          if( elemento.Nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
            return elemento;
          }
        });
        setProductos(resultadosBusqueda);
      }
    const pr = product || []
    const listaProductos= pr.map(producto => (
        <>
        <div class="image">
        <img class="image__img" src={producto.Imagen} alt="Bricks"/>
        <span className="image_div1"> {producto.Nombre}</span>
        <div class="image__overlay image__overlay--primary">
            <div className="original">
            <div class="image__title">{producto.Nombre}</div>
            <p class="image__description">
                {producto.Descripcion}
            </p>
            
            <div className="botonHU1">
            <button class="custom-btn btn-1" onClick={mostrarModalOf}>Ofertar</button>
            </div>
            
            </div>
        </div>
        
        </div>
          
    </>           
        
        ) )
    return(   
   
     
<div className="containerGHU1 ">
    
    <h1 className="titleL"> Lista de productos </h1> 
    <div className="buscador">
        <form class="d-flex justify-content-center" value={busqueda}  role="search" onChange={handleChange}>
            <i class="bi bi-search px-3"></i>
            <input class="form-control inputBusc me-2 px-4" type="search" placeholder=" Ingrese el nombre del producto..." aria-label="Search"  />              
        </form>
    </div>

        <div className="productos">
             {listaProductos}
 
        </div>
        
        <Ofertar estado={modalOf}>
        <div className="login-wrap">
            <div className="login-form">
                <div className="tituloPedido"><label  className="tab">Realiza tu oferta!</label></div>

                        <div className="sign-up-htm">
                                <form  className="fo" id="form" action="https://us-central1-base-de-datos-h.cloudfunctions.net/app/api/products/${id}" method="PUT">
                                        <div className="group">
                                            <label for="user" className="campo">Precio
                                                <input  className="input"
                                                    id="numero"
                                                    type="number"
                                                    required
                                                    placeholder="Bs."
                                                    min="1"
                                                    max="99999"
                                                    onChange={(e) =>
                                                        setPrecio((prevState) => ({
                                                            ...prevState,
                                                            valor: e.target.value,
                                                        }))
                                                    }
                                                /> 
                                                <h3
                                                        className={
                                                        Precio.estado
                                                                    ? "validacion-1"
                                                                        : "invisible"
                                                                }
                                                >
                                                                Ingrese un número positivo y menor a 99999
                                                </h3>
                                            </label>
                                        </div>
                                        <div className="group">
                                            <label for="pass" className="campo">Fecha
                                                <input className="input"
                                                
                                                id="fecha"
                                                type="date"
                                                min={formatoFecha('yyyy-mm-dd',0)}
                                                required
                                                onChange={(e) =>
                                                    setFecha((prevState) => ({
                                                        ...prevState,
                                                        valor: e.target.value,
                                                    }))
                                                }
                                                />
                                                <h3
                                                                    className={
                                                                        Fecha.estado
                                                                            ? "validacion-1"
                                                                            : "invisible"
                                                                    }
                                                                >
                                                                    Ingrese una fecha valida
                                                </h3>
                                            </label>

                                        </div>
                                        <div className="group">
                                            <label for="pass" className="campo">Hora
                                                <input  className="input" 
                                                    id="hora"
                                                    type="time"
                                                    required
                                                    defaultValue={null}
                                                    onChange={(e) =>
                                                        setHora((prevState) => ({
                                                            ...prevState,
                                                            valor: e.target.value,
                                                        }))
                                                    }
                                                />
                                                <h3
                                                                    className={
                                                                        Hora.estado
                                                                            ? "validacion-1"
                                                                            : "invisible"
                                                                    }
                                                                >
                                                                    Ingrese una hora valida
                                                </h3>
                                            </label>
                                        </div>
                                                <div className="group">
                                                    <label for="pass" className="campo">Stock
                                                        <input className="input"
                                                            id="stock"
                                                            type="number"
                                                            placeholder="0"
                                                            min={1}
                                                            required
                                                            defaultValue={1}
                                                            onChange={(e) =>
                                                                setStock((prevState) => ({
                                                                    ...prevState,
                                                                    valor: e.target.value,
                                                                }))
                                                            }
                                                        />
                                                        <h3
                                                                            className={
                                                                                Stock.estado
                                                                                    ? "validacion-1"
                                                                                    : "invisible"
                                                                            }
                                                                        >
                                                                            Ingrese un valor valido en este campo
                                                                        </h3>
                                                    </label>

                                                </div>
                                </form>
                                        <div className="contenedor-botones">
                                                    <button
                                                        className="botonL-1"
                                                        onClick={Validar}
                                                        onChange={updatePost}
                                                    >
                                                        Confirmar
                                                    </button>
                                                    <button
                                                        className="botonR-1"
                                                        onClick={ocultarModalOf}
                                                    >
                                                        Cancelar
                                                    </button>
                                        </div>
                        </div>
            </div>
        </div>


            <div className="mod">
                <Modals
                    titulo={"Registro de oferta"}
                    mostrarSi={updatePost}
                    mostrarNo={mostrarNo}
                    buttons={true}
                    estado={modalConf}
                    cambiarEstado={setModalConf}
                    estadoPantalla={true}
                    texto={"¿Está seguro de realizar su oferta?"}
                    icon={false}
                    
                />

                <Modals
                    titulo={""}
                    mostrarSi={mostrarSi}
                    buttons={false}
                    estado={modalSi}
                    cambiarEstado={setModalSi}
                    estadoPantalla={true}
                    texto={"Guardando registro ..."}
                    icon={true}
                    
                />
                <Modals
                    titulo={""}
                    mostrarNo={mostrarNo}
                    buttons={false}
                    estado={modalNo}
                    cambiarEstado={setModalNo}
                    estadoPantalla={true}
                    texto={"Cancelado"}
                    icon={true}
                    
                />
            </div>
        </Ofertar>  
      </div>
      
    
        
    )
}

export default Productoslista

/*<div className="productos">

<div className="producto" key={producto.id}>

    <a href={`/informacion/${producto.id}`}>
        <img className="imagen" src={producto.image} alt="" />
        </a>
       <h1 className="nombre">{producto.name}</h1>                               

</div>
</div>*/

/*<div className="container">

         <h1 className="title"> Lista de productos </h1> 
         
                <div className="productos">  
                    <div className="producto"> 
                    <Link to = "/Informacion">           
                            <div className="producto_imagen">
                                <img src={producto.image} alt="" />
                            </div>      
                            </Link>         

                        <div className="P_footer">
                                    <h1 className="nombre"> pique</h1>       
                        </div>    
                    </div>
                </div>  
             
    </div>*/