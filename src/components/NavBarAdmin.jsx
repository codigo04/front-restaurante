import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/img/logito.svg'
import { AuthContext } from '../context/AuthProvider'

export const NavBarAdmin = () => {
 
 
    const {cerrarSesionAuth}  = useContext(AuthContext);

    
    return (
        <>
            <aside className="sidebar">
                <div className="conainer">
                <img src={logo} className="card-img-top" alt="logo" />
                </div>
                <nav className='container'>
                    <ul>
                        <li><Link to="/admin/dashboard">Dashboard</Link></li>
                        <li><Link to="/admin/productos">Productos</Link></li>
                        <li><Link to="/admin/ordenes">Ordenes</Link></li>
                        <li><Link to="/admin/clientes">Clientes</Link></li>
                        <li><Link to="/admin/empleados">Empleados</Link></li>
                        <li><Link to="/admin/mesas">Mesas</Link></li>
                        <li><Link to="/admin/estadisticas">Estadisticas</Link></li>
                        <li onClick={cerrarSesionAuth}><Link to="/login" className="">Salir</Link></li>
                    </ul>
                </nav>
            </aside>
        </>
    )
}
