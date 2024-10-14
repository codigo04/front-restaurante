import React from 'react'

import { MesasMozo } from '../../components/mozo/MesasMozo'

export const MesasMoso = () => {
    return (
        <div>

            <div className="row">
                <div className="col-md-12 mb-3 ">
                    <h1 htmlFor="search">Mesas</h1>
                </div>

                <div className="row">
                    <div className='col p-2'>
                        <MesasMozo></MesasMozo>
                    </div>


                    <div className='col p-2'>
                        <MesasMozo></MesasMozo>
                    </div>

                    <div className='col p-2'>
                        <MesasMozo></MesasMozo>
                    </div>

                    <div className='col p-2'>
                        <MesasMozo></MesasMozo>
                    </div>

                    <div className='col p-2'>
                        <MesasMozo></MesasMozo>
                    </div>
                   
                </div>
            </div>


        </div>
    )
}


