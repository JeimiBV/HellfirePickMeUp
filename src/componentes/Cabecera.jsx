import React from "react";
import Image from "../imagenes/logo.png";
import "../estilos/header.css"
import { useAuth } from '../context/authContext'
import { ProtectedRoute } from "./ProtectedRoute";

function Header() {
    const { user, logout } = useAuth();
    
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error(error.message);
        }
    };

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
export default Header