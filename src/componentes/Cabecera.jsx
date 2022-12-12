import React from "react";
import Image from "../imagenes/logo-9.png";
import "../estilos/header.css";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Header() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="contenedor-cabecera">
       <nav className="navbar fixed-top navbar-expand-sm bg-sucessN border-bottom border-dark border-2 ">
          <div className="d-flex  w-50  justify-content">
              <div className="logoYNombre mx-5">
              <Link className="flex-sm-fill  nav-link active" to="/">
                <img className="logo " src={Image}  />
              </Link>    
          </div>         
        </div>




        <button class="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon "></span>
        </button>


        <div className="collapse navbar-collapse mx-3 justify-content-end " id="navbarTogglerDemo02">
          <div className="d-flex justify-content-right">
            {!user &&
              <ul className="navbar-nav gap-5 ms-auto mx-3 justify-content-end">
                <li className="nav nav-pills flex-column flex-sm-row">
                  <Link
                    className="flex-sm-fill text-sm-center nav-link active "
                    to="/loginN"
                  >
                    <i className="bi bi-shop "> </i> Negocio
                  </Link>
                </li>
                <li className="nav nav-pills flex-column flex-sm-row ">
                  <Link
                    className="flex-sm-fill text-sm-center nav-link active "
                    to="/loginC"
                  >
                    <i className="bi bi-person"></i> Consumidor
                  </Link>
                </li>

              </ul>
            }

          </div>

          <div className="d-flex justify-content">

        
      {user && 
        <>
        <ul className="navbar-nav gap-5 ms-auto mx-3 justify-content-end">
         
            <li className="nav nav-pills flex-column flex-sm-row ">
            <button className=" flex-sm-fill text-sm-center nav-link active m-2" onClick={handleLogout}>Cerrar sesión</button>
            </li>
          </ul>
        </>
        }
        </div>
      </div>
    </nav>
    </div>
  );
}
export default Header;
