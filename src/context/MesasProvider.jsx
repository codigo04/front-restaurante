import React, { createContext, useEffect, useState } from 'react'
import { actualizarEstadoMesa, obtenerMesas } from '../service/mesasService';
import { useNavigate } from 'react-router-dom';


export const MesasContext = createContext()

export const MesasProvider = ({ children }) => {
    const [mesas, setMesas] = useState([])

    const navigate = useNavigate();


    useEffect(() => {
        const cargarMesas = async () => {
            try {
                const response = await obtenerMesas();
                setMesas(response.data);
            } catch (error) {
                console.error('Error al cargar mesas', error);
            }
        };
        cargarMesas();
    }, []);

    
    const cambiarEstado = async (idMesa, numeroMesa, estado) => {
        const nuevaMesa = {
            numeroMesa: numeroMesa,
            capacidad: 40, // Esto puede ser dinámico
            estado: estado
        };

        if (true) {
            try {
                // Actualiza el estado de la mesa a 'OCUPADA' en la base de datos
                await actualizarEstadoMesa(nuevaMesa, idMesa);

                // Actualiza el estado localmente
                setMesas(prevMesas =>
                    prevMesas.map(mesa =>
                        mesa.id === idMesa ? { ...mesa, estado: estado } : mesa
                    )
                );

                // Navega a la página de productos
                // navigate('/mozo/productos');
            } catch (error) {
                console.error('Error al actualizar el estado de la mesa', error);
            }
        }
    };


    return (
        <MesasContext.Provider

            value={{
                setMesas,
                mesas,
                cambiarEstado
            }}

        >
            {children}
        </MesasContext.Provider>
    )
}

