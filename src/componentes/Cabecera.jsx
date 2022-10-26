import React from "react";
import Image from "../imagenes/logo.png";
import "../estilos/header.css"


function Header(){
return <div className="contenedor-cabecera">
            <img className="logo" src={Image}/>
        <h1 className="nombre">
            Pick me up
        </h1>
        <h1 className="user">
            User
        </h1>
       
    </div>


}
export default Header;