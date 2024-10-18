import React, { useState } from 'react'

export const NavProductos = ({setEstado}) => {

   

    return (
        <div>
            <ul  className="nav nav-pills nav-fill gap-2 p-1 small  rounded-5 shadow-sm" id="pillNav2" role="tablist" style={{
                '--bs-nav-link-color': 'black',
                '--bs-nav-pills-link-active-color': 'white',
                '--bs-nav-pills-link-active-bg': '#F56606',
                width:'20rem',
                backgroundColor:'rgb(241, 241, 241)'
            }}>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link active rounded-5"
                        id="home-tab2"
                        data-bs-toggle="tab"
                        type="button"
                        role="tab"
                        aria-selected="true"

                        onClick={()=> setEstado(true)}
                    >
                        Platos
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link rounded-5"
                        id="profile-tab2"
                        data-bs-toggle="tab"
                        type="button"
                        role="tab"
                        aria-selected="false"

                        onClick={()=> setEstado(false)}
                    >
                        Bebidas
                    </button>
                </li>
                
            </ul>
        </div>
    )
}

