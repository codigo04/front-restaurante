import React, { useContext } from 'react'
import '../../assets/styles/cssMozo/css.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { actualizarEstadoMesa } from '../../service/mesasService';
import { MesasContext } from '../../context/MesasProvider';
export const MesasMozo = ({ numeroMesa, estado, id,  }) => {

    const { cambiarEstado } = useContext(MesasContext);


    const getEstadoClase = (estado) => {
        switch (estado) {
            case 'DISPONIBLE': return '-success';
            case 'OCUPADA': return '-danger';
            case 'RESERVADA': return '-warning';
            default: return '';
        }
    };



    return (
        <div className='container-meza container-color'>
            <h1 className='container-num-mesa'>
                <p>Mesa</p>
                <h1>{numeroMesa}</h1>
            </h1>

            {estado === 'DISPONIBLE' ? (
                <button
                    onClick={() => cambiarEstado(id,numeroMesa,'OCUPADA')}
                    className={`btn btn${getEstadoClase(estado)}`}>
                    {estado}
                </button>
            ) : (
                <button className={`btn btn${getEstadoClase(estado)}`} disabled>
                    {estado}
                </button>
            )}
        </div>
    )
}


