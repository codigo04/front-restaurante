import React, { createContext, useReducer, useState  } from 'react'
export const PedidoContext = createContext();

const initialState = []
export const PedidoProvider = ({children}) => {
    const [productos, setProducto] = useState();

    const pedidoReducer = (state = initialState, action = {}) => {
  
      switch (action.type) {
        case '[pedido] agregar producto':
  
          return [...state, action.payload]
  
  
        case '[pedido] eliminar producto':
  
  
          return state.filter(compra => compra.id !== action.payload);
  
        case '[pedido] aumentar producto':
  
          return state.map(item => {
  
            const cant = item.cantidad + 1
  
            if (item.id === action.payload) return { ...item, cantidad: cant }
            return item;
          })
  
        case '[pedido] disminuir producto':
  
          break;
  
        default:
          break;
      }
  
  
    }
  
  
    const [listaPedido, dispatch] = useReducer(pedidoReducer, initialState);
  
    const agregarProducto = (producto) => {
      producto.cantidad = 1;
      const action = {
        type: '[pedido] agregar producto',
        payload: producto
  
      }
      dispatch(action);
    }
  
    const eliminarProducto = (id) => {
      const action = {
        type: '[pedido] eliminar producto',
        payload: id
  
      }
  
      dispatch(action);
    }
  
    // buscarProductoCateogry
  
  
    return (
      <PedidoContext.Provider
  
        value={
          {
            listaPedido,
            agregarProducto,
            eliminarProducto,
  
          }
        }
      >
        {children}
      </PedidoContext.Provider>
  )
}

