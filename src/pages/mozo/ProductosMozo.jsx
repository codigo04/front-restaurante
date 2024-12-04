import React, { useState, useContext, useEffect } from 'react'
import { Combobox } from '../../components/Globals/Combobox'
import { CardProducto } from '../../components/mozo/CardProducto';
import { ProductoContext } from '../../context/ProductosProvider';
import { TituloDescription } from '../../components/Globals/TituloDescription';
import { NavLink } from 'react-router-dom';
import { Badge } from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'

import { MesasContext } from '../../context/MesasProvider';
import { MesaPedidoContext } from '../../context/MesaPedidoProvider';
import { getPedidos } from '../../service/pedidoService';



export const ProductosMozo = () => {
  const [selectedOption, setSelectedOption] = useState('2');

  const { platos, bebidas } = useContext(ProductoContext);

  const { listaPedido, agregarProducto, eliminarProducto } = useContext(MesaPedidoContext)

  const { mesasPedido } = useContext(MesaPedidoContext);

  const { mesaSelect } = useContext(MesasContext);


  const mesaSeleccionadaId = mesaSelect; // Cambia por el ID de la mesa que seleccionaste
  // Obtener la mesa seleccionada
  const mesaSeleccionada = mesasPedido.find((mesa) => mesa.idMesa === mesaSeleccionadaId);
  const productosMesa = mesaSeleccionada ? mesaSeleccionada.pedidos : [];
  console.log('mesas')
  console.log(mesaSelect)

  //Combobox


  const handleAgregar = (compra) => {
    console.log("asi llega el prpoducto")
    console.log(compra)

    agregarProducto(mesaSelect, compra);
  }


  const cargarProductos = async () => {
    try {

      const { data } = await getPedidos();

      console.log("Data")
      console.log(data)

      const pedidosPendientes = data.filter(pedido => pedido.estado === "EN_PREPARACION");

      console.log("detallePedidos filtrado")
      console.log(pedidosPendientes)

      pedidosPendientes.forEach(pedido => {
        if (pedido.detallePedidos) {
          pedido.detallePedidos.forEach(detalle => {
            const cargar = {
              cantidad: detalle.cantidad,
              cliente:pedido?.cliente,
              descripcion: detalle.producto?.descripcion || "Sin descripción",
              estado: "INACTIVO",
              id: detalle.producto?.id || null,
              idCategoria: detalle.producto?.idCategoria || null,
              imagen: detalle.producto?.imagen || "https://via.placeholder.com/150",
              litros: detalle.producto?.litros || null,
              nombre: detalle.producto?.nombre || "Producto desconocido",
              porcion: detalle.producto?.porcion || "",
              precio: detalle.precio,
              stock: detalle.producto?.stock || 0
            };

            console.log("Cargar producto:");
            console.log(cargar);
            console.log("Mesa ID:", pedido.mesa?.id);
            agregarProducto(pedido.mesa?.id, cargar);
          });
        }
      });



    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    console.log("cargando")
    cargarProductos()
  }, []);

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

            <div className="col text-end">
              <NavLink to="/mozo/pedido">
                <Badge
                  badgeContent={
                    productosMesa.length
                  }
                  // Suma total de pedidos
                  color="secondary"
                >
                  <ShoppingCart color="action" />
                </Badge>
              </NavLink>
            </div>

          </div>

          <br />
          <div className='contenedor-productos row '>
            {selectedOption === '1' ? (
              platos.length > 0 ? (
                platos.map(pro => (
                  <div className='col mb-3' key={pro.id}>
                    <CardProducto
                      imagen={pro.imagen}
                      titulo={pro.nombre}
                      // descripcion={pro.descripcion}
                      precio={pro.precio}
                      handleAgregar={() => handleAgregar(pro)}
                      handleQuitar={() => handleQuitar(pro.id)}
                    />
                  </div>
                ))
              ) : (
                <div className='col-12 text-center'>No hay productos disponibles en esta categoría.</div>
              )
            ) : (
              bebidas.map(bebi => (
                <div className='col mb-3' key={bebi.id}>
                  <CardProducto
                    imagen={bebi.imagen}
                    titulo={bebi.nombre}
                    descripcion={bebi.descripcion}
                    precio={bebi.precio}
                    handleAgregar={() => handleAgregar(bebi)}
                    handleQuitar={() => handleQuitar(bebi.id)}
                  />
                </div>
              ))

            )}
          </div>
        </div>
      </section >

    </>
  );
};

