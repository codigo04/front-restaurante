import React, { createContext, useEffect, useReducer } from 'react'
import { getPedidos } from '../service/pedidoService';
export const PedidoContext = createContext()

const initialState = []

const pedidoReducer = (state, action) => {

  switch (action.type) {
    case "[pedido] cargar pedidos":

      return action.payload

    default:
      return state;
  }

}



export const PedidoProvider = ({ children }) => {

  const [pedidoAll, dispatch] = useReducer(pedidoReducer, initialState);



  const getPedidoAll = async () => {
    try {
      const { data } = await getPedidos();
      //setPedidoAll(data);
      console.log("todos los pedidpos")
      console.log(data)
      const action = {
        type: '[pedido] cargar pedidos',
        payload: data,
      };

      dispatch(action);

    } catch (error) {

    }
  }


  useEffect(() => {
    getPedidoAll()
  }, []);

  return (
    <PedidoContext.Provider
    
    value={{

      pedidoAll,
      getPedidoAll 

    }}
    
    >

      {children}
    </PedidoContext.Provider>
  )
}


