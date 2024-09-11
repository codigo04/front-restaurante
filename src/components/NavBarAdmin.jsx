import React from 'react'
import { Link } from 'react-router-dom'

export const NavBarAdmin = () => {
    return (
        <>
            <aside className="sidebar">
                <div className="brand">Brand</div>
                <nav>
                    <ul>
                        <li><Link to="/admin/dashboard">Dashboard</Link></li>
                        <li><Link to="/admin/productos">Productos</Link></li>
                        <li><Link to="/admin/ordenes">Ordenes</Link></li>
                        <li><Link to="/moso">Clientes</Link></li>
                        <li><Link to="/moso">Ingresos</Link></li>
                        <li><Link to="/moso">Estadisticas</Link></li>
                        <li><Link to="/login" className="">Cerrar Sesion</Link></li>
                    </ul>
                </nav>
            </aside>
        </>
    )
}
