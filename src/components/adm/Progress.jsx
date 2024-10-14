import React from 'react'

export const Progress = ({plato,porcentaje}) => {
    return (
        <div className="earning-item mb-3">
            <p>{plato}</p>
            <div className="progress">
                <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${porcentaje}%` }}>
                    {porcentaje}%
                </div>
            </div>
        </div>
    )
}


