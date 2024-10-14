import React from 'react'

export const Combobox = ({ datos, handleSelect }) => {


  return (
    <div className="form-group">
      
      <select id="combobox" className="form-control" onChange={(e) => handleSelect(e.target.value)}>
        <option value="">Selecciona una opción</option>
        {
          datos.map((dato, index) => (
            <option key={index} value={dato.value}>
              {dato.label}
            </option>
          ))
        }
      </select>
    </div>
  )
}


