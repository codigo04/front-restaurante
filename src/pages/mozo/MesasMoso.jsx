import React, { useContext, useEffect, useState } from 'react'

import { MesasMozo } from '../../components/mozo/MesasMozo'
import { obtenerMesas } from '../../service/mesasService';
import { MesasContext } from '../../context/MesasProvider';

export const MesasMoso = () => {

    // const [mesas, setMesas] = useState([]);
    const {mesas, setMesas} = useContext(MesasContext);

   
    return (
        <div>

            <div className="row">
                <div className="col-md-12 mb-3 ">
                    <h1 htmlFor="search">Mesas</h1>
                </div>

                <div className="row">
                    {
                        mesas.map(itemMesas => (

                            <div className='col p-2 ' key={itemMesas.id}>
                                <MesasMozo
                                    numeroMesa={itemMesas.numeroMesa}
                                    estado={itemMesas.estado}
                                    setMesas={setMesas}
                                    id={itemMesas.id} ></MesasMozo>
                            </div>
                        ))
                    }
                </div>
            </div>


        </div>
    )
}


