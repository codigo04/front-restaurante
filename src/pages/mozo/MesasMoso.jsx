import React, { useContext, useEffect, useState } from 'react'

import { MesasMozo } from '../../components/mozo/MesasMozo'
import { obtenerMesas } from '../../service/mesasService';
import { MesasContext } from '../../context/MesasProvider';
import { MesaPedidoContext } from '../../context/MesaPedidoProvider';


export const MesasMoso = () => {

    // const [mesas, setMesas] = useState([]);
    const { setMesaSelect } = useContext(MesasContext);
    const { mesasPedido } = useContext(MesaPedidoContext);

    const cambiarEstado = () => {

    }

    console.log(mesasPedido)

    return (
        <div>

            <div className="container-fluid my-4 container-color">
                <div className="row mb-4">
                    <div className="col-12 text-center">
                        <h1 className="display-4">Mesas</h1>
                    </div>
                </div>

                <div className="row">
                    {mesasPedido.map((itemMesas) => (
                        <div
                            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 d-flex justify-content-center"
                            key={itemMesas.idMesa}
                        >
                            <MesasMozo
                                numeroMesa={itemMesas.numeroMesa}
                                estado={itemMesas.estado}

                                id={itemMesas.idMesa}
                            />
                        </div>
                    ))}
                </div>
            </div>








        </div>
    )
}


