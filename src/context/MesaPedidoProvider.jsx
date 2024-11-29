import React, { createContext, useReducer, useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { MesasContext } from './MesasProvider';
import { getPedidos } from '../service/pedidoService';

export const MesaPedidoContext = createContext();

const initialState = []; //  se guardarán las mesas con sus pedidos

const pedidoReducer = (state, action) => {

  switch (action.type) {
    case '[mesas] cargar mesas':
      return action.payload.map((mesa) => ({
        idMesa: mesa.id,
        numeroMesa: mesa.numeroMesa,
        estado: mesa.estado,
        pedidos: [],
      }));

    case '[pedido] agregar producto':

      return state.map((mesa) =>
        mesa.idMesa === action.payload.idMesa
          ? {
            ...mesa,
            pedidos: [...mesa.pedidos, action.payload.producto],
          }
          : mesa
      );

    case '[pedido] eliminar producto':
      return state.map((mesa) =>
        mesa.idMesa === action.payload.idMesa
          ? {
            ...mesa,
            pedidos: mesa.pedidos.filter(
              (compra) => compra.id !== action.payload.idProducto
            ),
          }
          : mesa
      );

    case '[pedido] aumentar producto':
      return state.map((mesa) =>
        mesa.idMesa === action.payload.idMesa
          ? {
            ...mesa,
            pedidos: mesa.pedidos.map((item) =>
              item.id === action.payload.idProducto
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
            ),
          }
          : mesa
      );

    case '[pedido] disminuir producto':
      return state.map((mesa) =>
        mesa.idMesa === action.payload.idMesa
          ? {
            ...mesa,
            pedidos: mesa.pedidos.map((item) =>
              item.id === action.payload.idProducto && item.cantidad > 1
                ? { ...item, cantidad: item.cantidad - 1 }
                : item
            ),
          }
          : mesa
      );

    case '[pedido] obtener pedidos de mesa':
      const mesaSeleccionada = state.find((mesa) => mesa.idMesa === action.payload);
      return mesaSeleccionada ? mesaSeleccionada.pedidos : [];

    case '[pedido] cambiar estado':
      return state.map((mesa) =>
        mesa.idMesa === action.payload.idMesa
          ? {
            ...mesa,
            estado: action.payload.estado,
          }
          : mesa
      );

    case '[mesa] vaciar mesa':
      return state.map((mesa) =>
        mesa.idMesa === action.payload.idMesa
          ? {
            ...mesa,
            estado: action.payload.estado,
          }
          : mesa
      );
    default:

      return state;
  }
};

export const MesaPedidoProvider = ({ children }) => {

  const [mesasPedido, dispatch] = useReducer(pedidoReducer, initialState);

  const { mesas, setMesas } = useContext(MesasContext);

  const [pedidosAll, setPedidoAll] = useState([])
  // Función para cargar las mesas desde la API

  const cargarMesas = () => {
    dispatch({
      type: '[mesas] cargar mesas',
      payload: mesas,
    });

  };

  // Cargar las mesas al montar el proveedor
  useEffect(() => {
    console.log('cargadno las mesas ')
    cargarMesas();

  }, [mesas]);

  const mostrarProductosMesa = (idMesa) => {
    dispatch({
      type: '[pedido] obtener pedidos de mesa',
      payload: idMesa, // Cambia 1 por el ID de la mesa que necesites
    });
  }



  // Funciones para manipular pedidos
  const agregarProducto = (idMesa, producto) => {
    const action = {
      type: '[pedido] agregar producto',
      payload: { idMesa, producto: { ...producto, cantidad: 1 } },
    };
    dispatch(action);
  };

  const eliminarProducto = (idMesa, idProducto) => {
    const action = {
      type: '[pedido] eliminar producto',
      payload: { idMesa, idProducto },
    };
    dispatch(action);
  };

  const vaciarMesa = (idMesa) => {
    const action = {
      type: '[mesa] vaciar mesa',
      payload: idMesa
    }
  }

  const aumentarCantidad = (idMesa, idProducto) => {
    const action = {
      type: '[pedido] aumentar producto',
      payload: { idMesa, idProducto },
    };
    dispatch(action);
  };

  const disminuirCantidad = (idMesa, idProducto) => {
    const action = {
      type: '[pedido] disminuir producto',
      payload: { idMesa, idProducto },
    };
    
    dispatch(action);
  };

  const cambiarEstadoMesa = (idMesa, estado) => {
    const action = {
      type: '[pedido] cambiar estado',
      payload: { idMesa, estado },
    };
    dispatch(action);
  }


  const getPedidosAll = async () => {
    try {
      const { data } = await getPedidos();
      setPedidoAll(data);
      console.log("todos los pedidpos")
      console.log(data)
    } catch (error) {

    }
  }


  useEffect(() => {
    getPedidosAll()
  }, [mesas]);

  return (
    <MesaPedidoContext.Provider
      value={{
        mesasPedido,
        agregarProducto,
        eliminarProducto,
        aumentarCantidad,
        disminuirCantidad,
        mostrarProductosMesa,
        cambiarEstadoMesa,
        vaciarMesa,
        pedidosAll
      }}
    >
      {children}
    </MesaPedidoContext.Provider>
  );
};
