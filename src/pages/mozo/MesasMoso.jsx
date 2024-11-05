import React, { useContext, useEffect, useState } from 'react'

import { MesasMozo } from '../../components/mozo/MesasMozo'
import { obtenerMesas } from '../../service/mesasService';
import { MesasContext } from '../../context/MesasProvider';

export const MesasMoso = () => {

    // const [mesas, setMesas] = useState([]);
    const { mesas, setMesas } = useContext(MesasContext);


    return (
        <div>

            <div className="container-fluid my-4 container-color">
                <div className="row mb-4">
                    <div className="col-12 text-center">
                        <h1 className="display-4">Mesas</h1>
                    </div>
                </div>

                <div className="row">
                    {mesas.map((itemMesas) => (
                        <div
                            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 d-flex justify-content-center"
                            key={itemMesas.id}
                        >
                            <MesasMozo
                                numeroMesa={itemMesas.numeroMesa}
                                estado={itemMesas.estado}
                                setMesas={setMesas}
                                id={itemMesas.id}
                            />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}


