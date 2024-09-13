import React from 'react'
import logo from '../assets/img/logito.svg'
import { Link } from 'react-router-dom'
export const NavBarMoso = () => {
  return (
    <>
      <aside className="sidebar">
        <div className="conainer">
          <img src={logo} className="card-img-top" alt="logo" />
        </div>
        <nav className='container'>
          <ul>
            <li><Link to="/mozo/mesas">mesas</Link></li>
            
            <li><Link to="/login" className="">Salir</Link></li>
          </ul>
        </nav>
      </aside>
    </>
  )
}
