import React, { useContext } from 'react'
import logo from '../assets/img/logito.svg'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider';
export const NavBarMoso = () => {
  const {cerrarSesionAuth}  = useContext(AuthContext);
  return (
    <>
      <aside className="sidebar">
        <div className="conainer">
          <img src={logo} className="card-img-top" alt="logo" />
        </div>
        <nav className='container'>
          <ul>
            <li><Link to="/mozo/mesas">mesas</Link></li>
            
            <li onClick={cerrarSesionAuth}><Link to="/login" className="">Salir</Link></li>
          </ul>
        </nav>
      </aside>
    </>
  )
}
