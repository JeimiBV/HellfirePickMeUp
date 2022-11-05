import React from "react";
import Image from "../imagenes/logo.png";
import "../estilos/header.css";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();



  const redirigirL = () => {
    navigate("/");
  };
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };
  const [ boton, setBoton] =useState(true)
  const controlBoton=()=>{
    setBoton(false)
  }

  return (
    <div className="contenedor-cabecera">
      <div className="logoYNombre">
        <img className="logo" src={Image} onClick={redirigirL} />
        <h1 className="nombre">Pick me up</h1>
      </div>

      <ul className={boton ? " navbar-nav gap-5 ms-auto " : " invisible"}>
        <li className="nav nav-pills flex-column flex-sm-row">
          <Link onClick={controlBoton}
            className="flex-sm-fill text-sm-center nav-link active "
            as
            to="/login"
          >
            <i className="bi bi-shop "> </i> Negocio
          </Link>
        </li>
        <li className="nav nav-pills flex-column flex-sm-row ">
          <Link onClick={controlBoton}
            className="flex-sm-fill text-sm-center nav-link active "
            as
            to="/login"
          >
            <i className="bi bi-person"></i> Consumidor
          </Link>
        </li>
      </ul>


      {/*<h1 className="user">
         {user?`bienvenido ${user.email}`:`bienvenido `}
  </h1>*/}
      {user ? <button  onClick={handleLogout}>logout</button> : <div></div>}
    </div>
  );
}

/*return (
    <div className="contenedor-cabecera">
      <nav className="navbar fixed-top navbar-expand-lg bg-sucess border-bottom border-dark border-2 ">
        <div className="container-lg">
          <div className="mr-auto">
            <Link class="navbar-brand" as to="/">
              <img
                src="../../src/imagenes/logo.png"
                alt=" "
                width="40"
                height="34"
              />
            </Link>
          </div>

          <div className="position-absolute top-0 start-50 translate-middle-x">
            <li className="navbar-nav ">
              <p class="fs-3">Pick me up</p>
            </li>
          </div>

          <button
            className=" navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav gap-5 ms-auto ">
              <li className="nav nav-pills flex-column flex-sm-row">
                <Link
                  className="flex-sm-fill text-sm-center nav-link active "
                  as
                  to="/login"
                >
                  <i className="bi bi-shop "> </i> Negocio
                </Link>
              </li>
              <li className="nav nav-pills flex-column flex-sm-row ">
                <Link
                  className="flex-sm-fill text-sm-center nav-link active "
                  as
                  to="/login"
                >
                  <i className="bi bi-person"></i> Consumidor
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}*/
export default Header;
