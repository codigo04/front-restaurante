import React, { useEffect, useState } from 'react'

import { MesasMozo } from '../../components/mozo/MesasMozo'
import { obtenerMesas } from '../../service/mesasService';

export const MesasMoso = () => {

    const [mesas, setMesas] = useState([]);

    console.log(mesas);

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


    return (
        <div>

            <div className="row">
                <div className="col-md-12 mb-3 ">
                    <h1 htmlFor="search">Mesas</h1>
                </div>

                <div className="row">
                    {
                        mesas.map(itemMesas =>

                            <div className='col p-2'>
                                <MesasMozo numeroMesa={itemMesas.numeroMesa} estado={itemMesas.estado}></MesasMozo>
                            </div>
                        )
                    }
                </div>
            </div>


        </div>
    )
}


