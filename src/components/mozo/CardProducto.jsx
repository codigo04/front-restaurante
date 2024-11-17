
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
        <div
        className="card tarjetas shadow-sm"
        style={{
            width: '8rem',
            border: '1px solid #ddd',
            borderRadius: '12px',
            overflow: 'hidden',
        }}
    >
        <div className="container d-flex flex-column align-items-center p-2">
            <img
                src={imagen}
                style={{
                    height: '8rem',
                    width: '100%',
                    objectFit: 'cover',
                    borderBottom: '2px solid #007bff',
                }}
                className="card-img-top"
                alt={titulo}
            />
            <div
                className="card-body text-center"
                style={{ padding: '0.5rem', backgroundColor: '#f8f9fa' }}
            >
                <h5
                    className="card-title"
                    style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#333',
                        marginBottom: '0.5rem',
                    }}
                >
                    {titulo}
                </h5>
                <p
                    className="card-text text-muted"
                    style={{
                        fontSize: '0.8rem',
                        marginBottom: '0.5rem',
                    }}
                >
                    {descripcion}
                </p>
                <p
                    className="card-text"
                    style={{
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        color: '#28a745',
                    }}
                >
                    s/{precio}
                </p>
                {added ? (
                    <button
                        type="button"
                        className="btn btn-danger btn-sm w-100"
                        onClick={clickQuitar}
                        style={{
                            borderRadius: '15px',
                            fontSize: '0.8rem',
                        }}
                    >
                        Quitar
                    </button>
                ) : (
                    <button
                        type="button"
                        className="btn color-primario btn-sm w-100"
                        onClick={clickAgregar}
                        style={{
                            borderRadius: '15px',
                            fontSize: '0.8rem',
                        }}
                    >
                        Agregar
                    </button>
                )}
            </div>
        </div>
    </div>
    )
}


