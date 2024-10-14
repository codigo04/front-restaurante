import React, { useState } from 'react'

import GestionComidaimg from '../../assets/img/adm/gestionComida.jpg';
import { Saludo } from '../../components/Globals/Saludo';
import { NavProductos } from '../../components/adm/NavProductos';
import { GestionComida } from '../../components/adm/GestionComida';
import { GestionBebidas } from '../../components/adm/GestionBebidas';
export const ProdutosAdm = () => {

  const [estadoPro, setEstadoPro] = useState(true)

  return (


    <>

      <div className="container-fluid container-color">
        <div>
          <NavProductos setEstado={setEstadoPro}></NavProductos>
        </div>
        {estadoPro == true ? <GestionComida></GestionComida> : <GestionBebidas></GestionBebidas>}
      </div>

    </>
  )
}
