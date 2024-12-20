import React, { useContext } from 'react'
import '../../assets/styles/cssMozo/css.css'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { actualizarEstadoMesa } from '../../service/mesasService';
import { MesasContext } from '../../context/MesasProvider';
export const MesasMozo = ({ numeroMesa, estado, id,  }) => {

    const { cambiarEstado } = useContext(MesasContext);

    const navigate = useNavigate()

    const getEstadoClase = (estado) => {
        switch (estado) {
            case 'DISPONIBLE': return '-success';
            case 'OCUPADA': return '-danger';
            case 'RESERVADA': return '-warning';
            default: return '';
        }
    };

    const handleClick = () => {
        navigate('/mozo/productos');
      };

    return (
        <div className='container-mesa '>
            <h3 className='container-num-mesa'>
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
            )}
        </div>
    )
}


