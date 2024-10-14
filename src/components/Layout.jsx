import React from 'react'
import '../assets/styles/navbar.css'
import { Link, Outlet } from 'react-router-dom';
import { Saludo } from './Globals/Saludo';
// import { NavLink } from 'react-router-dom'


export const Layout = ({sidebar}) => {
    return (
        <>

            <div className="containt">

                {sidebar}

                
                <div className="content">
                    <Saludo nombre={'Francisco'}></Saludo>
                  <Outlet></Outlet>
                </div>
            </div>
        </>
    )
}
