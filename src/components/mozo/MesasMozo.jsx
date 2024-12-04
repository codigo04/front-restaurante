import React, { useContext, useEffect, useState } from 'react'
import '../../assets/styles/cssMozo/css.css'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { actualizarEstadoMesa } from '../../service/mesasService';
import { MesasContext } from '../../context/MesasProvider';
export const MesasMozo = ({ numeroMesa, estado, id }) => {

    const { cambiarEstado, setMesaSelect, mesaSelect } = useContext(MesasContext);

    const navigate = useNavigate()

    const getEstadoClase = (estado) => {
        switch (estado) {
            case 'DISPONIBLE': return '-success';
            case 'OCUPADA': return '-danger';
            case 'RESERVADA': return '-warning';
            default: return '';
        }
    };


    // cambiarEstado(id, numeroMesa, nuevoEstado)

    //     setMesas(prevMesas =>
    //         prevMesas.map(mesa => (mesa.id === id ? { ...mesa, estado: nuevoEstado } : mesa))
    //     );

    const handleClick = () => {
        console.log("mesa seleccionda: " + id)
        setMesaSelect(id)

        console.log(estado)
        // idMesa, numeroMesa, estado
        if (estado === "DISPONIBLE") {
            navigate('/mozo/productos');
        } if (estado === "OCUPADA") {

            navigate('/mozo/pedido');
        }

    };





    // const [ocupado, setOcupado] = useState(false);  // Estado de ocupación

    const botonOcupado = () => {

        // setOcupado(prevOcupado => !prevOcupado);
    };



    return (
        <div className='container-mesa '>
            {/* <h3 className='container-num-mesa'>
                <p>Mesa</p>
                <h3>{numeroMesa}</h3>
            </h3>

            {estado === 'DISPONIBLE' ? (
                <button
                    // onClick={() => cambiarEstado(id,numeroMesa,'OCUPADA')}
                    onClick={handleClick}
                    className={`btn btn${getEstadoClase(estado)}`}>
                    {estado}

                </button>
            ) : (
                <button className={`btn btn${getEstadoClase(estado)}`} >
                    Ver detalles
                </button>
            )} */}





            <div className="card" >
                {/* Encabezado de la tarjeta */}
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Mesa {numeroMesa}</h5>
                    <span className={`badge ${estado === 'DISPONIBLE' ? 'color-primario' : 'bg-danger'}`}>
                        {estado === 'DISPONIBLE' ? 'Libre' : 'Ocupada'}
                    </span>
                </div>

                {/* Contenido de la tarjeta */}
                <div className="card-body text-center">
                    <div className="d-flex justify-content-center align-items-center mb-3">
                        <div
                            className={`rounded-circle border border-4 ${estado === 'DISPONIBLE' ? 'color-primario-border' : 'border-danger'}`}
                            style={{ width: '6rem', height: '6rem' }}
                        >
                            <i className="bi bi-person-fill" style={{ fontSize: '2rem' }}></i>
                        </div>
                    </div>
                </div>

                {/* Pie de la tarjeta */}
                <div className="card-footer d-flex justify-content-between align-items-center">

                    {
                        estado === 'DISPONIBLE' ? <button className={`btn color-primario `} onClick={handleClick}>
                            Disponible
                        </button> :
                            <button className={`btn btn-danger`} onClick={handleClick}>
                                Ver detalles
                            </button>


                    }


                    {/* <button className={`btn ${occupied ? 'btn-danger' : 'btn-secondary'}`} onClick={toggleOccupied}>
                        {occupied ? 'Ver detalles' : 'Disponible'}
                    </button> */}
                </div>
            </div>
        </div>
    )
}


