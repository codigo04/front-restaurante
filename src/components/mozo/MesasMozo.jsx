import React from 'react'
import '../../assets/styles/cssMozo/css.css'
import { NavLink } from 'react-router-dom'
export const MesasMozo = () => {

    return (
        <div className='container-meza container-color'>
            <h1 className='container-num-mesa'>
                <p>Mesa</p>
                <h1>01</h1>
            </h1>
            <NavLink to={'/mozo/productos'}><button className='btn btn-danger'>Disponible</button></NavLink>
        </div>
    )
}


