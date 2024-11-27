import React, { useState } from 'react'

export const CuerpoModal = ({ children, titulo, onClose }) => {

return (
    <div className="order-details-overlay" role="dialog" aria-labelledby="modal-title" aria-modal="true">
        <div className="order-details">
            <div className="d-flex justify-content-between">
                <h3 id="modal-title">{titulo}</h3>
                <button
                    onClick={onClose}
                    className="btn btn-secondary color-primario"
                    aria-label="Cerrar modal"
                >
                    <i className="bi bi-x" style={{ color: 'white' }}></i>
                </button>
            </div>
            {children}
        </div>
    </div>
    )
}


