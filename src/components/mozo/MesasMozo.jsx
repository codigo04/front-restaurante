import React from 'react'
import '../../assets/styles/cssMozo/css.css'
import { NavLink } from 'react-router-dom'
import { actualizarEstadoMesa } from '../../service/mesasService';
export const MesasMozo = ({ numeroMesa, estado }) => {
    const getEstadoClase = (estado) => {
        switch (estado) {
            case 'DISPONIBLE': return '-success';
            case 'OCUPADA': return '-danger';
            case 'RESERVADA': return '-warning';
            default: return '';
        }
    };


    // actualizarEstadoMesa
    const manejarIngreso = async () => {

        const nuevaMesa = {
             numeroMesa: "20G",
             capacidad: 40,
             estado: "OCUPADA"
            
            };

        if (estado === 'DISPONIBLE') {
            try {
                // Actualiza el estado de la mesa a 'OCUPADA' en la base de datos
                const response = await actualizarEstadoMesa(nuevaMesa, 1);

                // Actualiza el estado localmente
                setMesas(prevMesas =>
                    prevMesas.map(mesa =>
                        mesa.id === 1 ? { ...mesa, estado: 'OCUPADA' } : mesa
                    )
                );

                // Navega a la página de productos
               
            } catch (error) {
                console.error('Error al actualizar el estado de la mesa', error);
             
            }
        }
    };


    return (
        <div className='container-meza container-color'>
            <h1 className='container-num-mesa'>
                <p>Mesa</p>
                <h1>{numeroMesa}</h1>
            </h1>

            {/* Solo permite el acceso si la mesa está "DISPONIBLE" */}
            {estado === 'DISPONIBLE' ? (
                <NavLink to={'/mozo/productos'}>
                    <button onClick={manejarIngreso} className={`btn btn${getEstadoClase(estado)}`}>
                        {estado}
                    </button>
                </NavLink>
            ) : (
                <button className={`btn btn${getEstadoClase(estado)}`} disabled>
                    {estado}
                </button>
            )}
        </div>
    )
}


