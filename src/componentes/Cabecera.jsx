import React from "react";
import Image from "../imagenes/logo.png";
import "../estilos/header.css"
import {useAuth}from '../context/authContext'
import { useNavigate } from "react-router-dom";
import {ProtectedRoute} from './ProtectedRoute'


function Header(){
    const{user, logout,loading }=useAuth()

    
    const handleLogout= async()=>{
        await logout()
    }

    
return <div className="contenedor-cabecera">
            <img className="logo" src={Image}/>
        <h1 className="nombre">
            Pick me up
        </h1>
        <ProtectedRoute>
        <h1 className="user">
         {user?`bienvenido ${user.email}`:`bienvenido `}
        </h1>
        <button onClick={handleLogout}>
            logout
        </button>
        </ProtectedRoute>

       
    </div>


}
export default Header;