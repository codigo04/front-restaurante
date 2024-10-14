
import React, { useState } from 'react'


export const CardProducto = ({ imagen, titulo, descripcion, precio,handleAgregar,handleQuitar }) => {

    const [added, setAdded] = useState(false)

    const clickAgregar = () => {
        handleAgregar()
        setAdded(true)
    }

    const clickQuitar = () => {
        handleQuitar()
        setAdded(false)
    }

    return (
        <div className='tarjetas ' style={{width:'8rem'}}>
            <div className='container d-flex flex-column align-items-center'>
            <img src={imagen}  style={{height:'8rem'}} className="card-img-top" alt={titulo} />
            <div className="card-body">
                <h5 className="card-title">Pollo a la braza</h5>
                <p className="card-text">zzzzzzzz</p>
                <p className="card-text"><strong>${precio}</strong></p>
                {
                    added
                        ? <button
                            type="button"
                            className="btn btn-danger btn-tamaño"
                            onClick={clickQuitar}
                        >
                            Quitar
                        </button>
                        : <button
                            type="button"
                            className="btn btn-primary  btn-tamaño"
                            onClick={clickAgregar}
                        >
                            Agregar
                        </button>
                }
            </div>

            </div>
        </div>
    )
}


