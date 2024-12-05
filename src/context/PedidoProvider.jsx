import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { getPedidos } from '../service/pedidoService';
import { AuthContext } from './AuthProvider';
export const PedidoContext = createContext()

const initialState = {
  todos: [], // Todos los pedidos
  filtrados: [], // Pedidos filtrados por estado
};


const pedidoReducer = (state, action) => {

  switch (action.type) {
    case "[pedido] cargar pedidos":
      //Antes  { ...state, todos: action.payload, filtrados: action.payload };
      return { ...state, todos: action.payload }; // Cargar todos los pedidos

    case "[pedido] cargar pedidos estado":

      return {
        ...state,
        filtrados: state.todos.filter((pedido) => pedido.estado === action.payload),
      };

    default:
      return state;
  }

}



export const PedidoProvider = ({ children }) => {

  const [state, dispatch] = useReducer(pedidoReducer, initialState);
  const { auth } = useContext(AuthContext);


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

  const getPedidoAllEstado = async (estado) => {

    const action = {
      type: '[pedido] cargar pedidos estado',
      payload: estado,
    };

    dispatch(action);


  }


  useEffect(() => {
    getPedidoAll()
  }, [auth]);

  return (
    <PedidoContext.Provider

      value={{

        todos: state.todos,
        filtrados: state.filtrados,
        getPedidoAll,
        getPedidoAllEstado,

      }}

    >

      {children}
    </PedidoContext.Provider>
  )
}


