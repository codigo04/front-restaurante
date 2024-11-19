import React, { useContext } from 'react'
import '../assets/styles/navbar.css'
import { Link, Outlet } from 'react-router-dom';
import { Saludo } from './Globals/Saludo';
import { Sidebar } from './Globals/Sidebar';
import { AuthContext } from '../context/AuthProvider';
// import { NavLink } from 'react-router-dom'


export const Layout = ({ sidebar }) => {

    const { isLoading} = useContext(AuthContext); 
    const username = localStorage.getItem('username');
    return (
        <>

            <div className="d-flex">

                <Sidebar></Sidebar>


                <div className="content container-fluid">
                    <Saludo nombre={username}></Saludo>
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    )
}
