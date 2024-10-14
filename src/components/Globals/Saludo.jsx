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
        <h1>Hola, {nombre} </h1>
        <h1>Chimbote, {formattedDate}</h1>
      </header>
    );
}
