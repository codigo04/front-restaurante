
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/img/logito.svg'
import { AuthContext } from '../../context/AuthProvider'

export const Sidebar = () => {

    const rolUser = localStorage.getItem('rolUser')

    const {cerrarSesionAuth}  = useContext(AuthContext);
    const links = [
        { ruta: '/admin/dashboard', nombre: 'Dashboard', rol: 'ADMIN' },
        { ruta: '/admin/productos', nombre: 'Productos', rol: 'ADMIN' },
        { ruta: '/admin/ordenes', nombre: 'Órdenes', rol: 'ADMIN' },
        { ruta: '/admin/clientes', nombre: 'Clientes', rol: 'ADMIN' },
        { ruta: '/admin/empleados', nombre: 'Empleados', rol: 'ADMIN' },
        { ruta: '/admin/mesas', nombre: 'Mesas', rol: 'ADMIN' },
        { ruta: '/admin/estadisticas', nombre: 'Estadísticas', rol: 'ADMIN' },
        { ruta: '/mozo/mesas', nombre: 'mesas', rol: 'MOZO' },
        { ruta: '/mozo/productos', nombre: 'productos', rol: 'MOZO' },
        { ruta: '/mozo/pedido', nombre: 'pedido', rol: 'MOZO' },
      ];

    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const sidebarWidth = '169px'
    return (
        <> {/* Botón de alternancia */}

            <aside
                className="sidebar bg-dark text-white transition-all duration-300 container-sidebar "
                style={{
                    width: isOpen ? sidebarWidth : '0',
                    padding:'0'
                }}
            >
                <div className="container catainer-responsy">
                    <img src={logo} className="card-img-top mb-3" alt="logo" />

                    {/* Botón de alternancia cerca del logo */}
                    <a
                        className='d-flex justify-content-center align-items-center icon-style boton-navbar'
                        variant="outline-primary"
                        onClick={toggleSidebar}
                        style={{
                            left: isOpen ? '157px' : '1px',
                        }}


                    >
                        {isOpen ? <i style={{ fontSize: '20px' }} className="bi bi-chevron-left"></i> : <i style={{ fontSize: '20px' }} className="bi bi-chevron-right"></i>}
                    </a>
                </div>

                <nav
                    className="container container-navegacion"
                    style={{
                       
                        overflow: 'hidden',
                        transition: 'width 0.3s ease',
                        visibility: isOpen ? 'visible' : 'hidden'

                    }}
                >
                    <ul className="list-unstyled">
                        {links.filter(link => link.rol === rolUser)
                            .map(link => (
                                <li  key={link.ruta} className=''>
                                    <Link to={link.ruta} className="text-black " >
                                        {link.nombre}
                                    </Link>
                                </li>
                            ))}
                        <li onClick={cerrarSesionAuth} className=''><Link to="/login" className="text-black" style={{color:'black'}}>Salir</Link></li>
                    </ul>
                </nav>
            </aside >
        </>
    )
}


