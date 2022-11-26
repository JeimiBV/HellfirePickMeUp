import Axios from "axios"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

//const url='http://localhost:5000/pruebafirebase-30018/us-central1/app/api/products'
//http://localhost:5000/base-de-datos-h/us-central1/app
const todosProductos = async (setProductos) =>{

    const peticion =  Axios({
        method: "GET",
        //withCredentials: true,
        
        url: "http://localhost:5000/base-de-datos-h/us-central1/app/api/products",
    }).then(response => {
        if (!response.data.error) {
            console.log(response.data)
            setProductos(response.data)
        } else {
            console.log(response.data.error[0]);
        }
    })
        .catch(err => {
            console.log(err)
        });
   // state(peticion.data.results)
    console.log(peticion)

}
/*const todosProductos = async () => {
    const url = "http://localhost:5000/pruebafirebase-30018/us-central1/app/api/products"
        .then(Response => Response.json()
            .then(data => { console.log(data) })
        )
}*/
const unicoProducto = async (id, setProducto) => {
    console.log(id)
    //console.log(req.params.id)

    const peticion =  Axios({
        method: "GET",
        //withCredentials: true,
        url: `http://localhost:5000/base-de-datos-h/us-central1/app/api/products/${id}`,
    }).then(response => {
        if (!response.data.error) {
            console.log(response.data)
            setProducto(response.data)
        } else {
            console.log(response.data.error[0]);
        }
    })
        .catch(err => {
            console.log(err)
        });
   // state(peticion.data.results)
    console.log(peticion)
}

const todosCategorias = async (setCategorias) =>{

    const peticion =  Axios({
        method: "GET",
        //withCredentials: true,
        url: "http://localhost:5000/base-de-datos-h/us-central1/app/api/oferts",
    }).then(response => {
        if (!response.data.error) {
            console.log(response.data)
            setCategorias(response.data)
        } else {
            console.log(response.data.error[0]);
        }
    })
        .catch(err => {
            console.log(err)
        });
   // state(peticion.data.results)
    console.log(peticion)

}
const filtrarOfertas = async (id, setOfertas) => {
    console.log(id)
    //console.log(req.params.id)

    const peticion =  Axios({
        method: "GET",
        //withCredentials: true,
        url: `http://localhost:5000/base-de-datos-h/us-central1/app/api/oferts/${id}`,
    }).then(response => {
        if (!response.data.error) {
            console.log(response.data)
            setOfertas(response.data)
        } else {
            console.log(response.data.error[0]);
        }
    })
        .catch(err => {
            console.log(err)
        });
   // state(peticion.data.results)
    console.log(peticion)
}

const todosPedidos = async (setPedidos) =>{

    const peticion =  Axios({
        method: "GET",
        //withCredentials: true,
        
        url: "https://us-central1-base-de-datos-h.cloudfunctions.net/app/api/pedido",
    }).then(response => {
        if (!response.data.error) {
            console.log(response.data)
            setPedidos(response.data)
        } else {
            console.log(response.data.error[0]);
        }
    })
        .catch(err => {
            console.log(err)
        });
   // state(peticion.data.results)
    console.log(peticion)

}

export {

    todosProductos,
    unicoProducto, 
    todosCategorias, 
    filtrarOfertas,
    todosPedidos
}