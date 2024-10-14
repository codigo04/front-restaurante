import React from 'react'
export const TituloDescription = ({titulo,decripcion}) => {
  return (
    <div>
      <h2 style={{margin:'0'}}>{titulo}</h2>
      <span>{decripcion}</span>
    </div>
  )
}


