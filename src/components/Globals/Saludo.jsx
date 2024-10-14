import React from 'react'

export const Saludo = ({ nombre }) => {

    const today = new Date();
    const formattedDate = today.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  
    return (
      <header className="d-flex justify-content-between align-items-center my-4">
        <h2>Hola, {nombre} </h2>
        <h2>Chimbote, {formattedDate}</h2>
      </header>
    );
}
