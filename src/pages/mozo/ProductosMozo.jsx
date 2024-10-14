import React, { useState, useContext } from 'react'
import { Combobox } from '../../components/Globals/Combobox'
import { CardProducto } from '../../components/mozo/CardProducto';
import { ProductoContext } from '../../context/ProductosProvider';
import { TituloDescription } from '../../components/Globals/TituloDescription';
import { NavLink } from 'react-router-dom';
import { Badge } from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import { PedidoContext } from '../../context/PedidoProvider';



export const ProductosMozo = () => {
  const [selectedOption, setSelectedOption] = useState('2');





  const { productos } = useContext(ProductoContext);

  const { listaPedido, agregarProducto, eliminarProducto } = useContext(PedidoContext)




  //Combobox


  const handleAgregar = (compra) => {

    agregarProducto(compra);
  }

  const handleQuitar = (id) => {
    eliminarProducto(id);
  }

  const datos = [
    { value: '1', label: 'Platos' },
    { value: '2', label: 'Bebidas' },

  ];

  const handleSelect = (value) => {
    setSelectedOption(value);
    // console.log('Opción seleccionada:', value);
  };


  return (
    <>
      <section>
        <div className=' container-color gap-3'>
          <TituloDescription titulo={'Selecciona una categoría'} />

          <div className=' gap-3 d-flex container-fluid categoria-mozo'>
            <div className='col'>
              <Combobox datos={datos} handleSelect={handleSelect} />
            </div>

            <div className='col text-end'>
              <NavLink to='/mozo/pedido'>
                <Badge badgeContent={listaPedido.length} color="secondary">
                  <ShoppingCart color="action" />
                </Badge>
              </NavLink>
            </div>
          </div>

<br />
          <div className='contenedor-productos row '>
            {selectedOption === '1' ? (
              productos.length > 0 ? (
                productos.map(pro => (
                  <div className='col mb-3' key={pro.id}>
                    <CardProducto
                      imagen={pro.image}
                      titulo={pro.title}
                      descripcion={pro.description}
                      precio={pro.price}
                      handleAgregar={() => handleAgregar(pro)}
                      handleQuitar={() => handleQuitar(pro.id)}
                    />
                  </div>
                ))
              ) : (
                <div className='col-12 text-center'>No hay productos disponibles en esta categoría.</div>
              )
            ) : (
              <div className='col-12 text-center'>Pronto disponible</div>
            )}
          </div>
        </div>
      </section>

    </>
  );
};

