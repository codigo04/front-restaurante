import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logito.svg";
export const NavBarCaja = () => {
  return (
    <>
      <aside className="sidebar">
        <div className="conainer">
          <img src={logo} className="card-img-top" alt="logo" />
        </div>
        <nav className="container">
          <ul>
            <li>
              <Link to="/cajero/inicio">caja</Link>
            </li>
            <li>
              <Link to="/cajero/cerrar-caja">cerrar Caja</Link>
            </li>

            <li>
              <Link to="/login" className="">
                Salir
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};
