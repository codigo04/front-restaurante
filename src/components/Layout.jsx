import React from 'react'
import '../assets/styles/navbar.css'
import { Link, Outlet } from 'react-router-dom';
import { Saludo } from './Globals/Saludo';
import { Sidebar } from './Globals/Sidebar';
// import { NavLink } from 'react-router-dom'


export const Layout = ({sidebar}) => {
    return (
        <>

            <div className="d-flex">

                <Sidebar></Sidebar>

                
                <div className="content container-fluid">
                    <Saludo nombre={'Francisco'}></Saludo>
                  <Outlet></Outlet>
                </div>
            </div>
        </>
    )
}
