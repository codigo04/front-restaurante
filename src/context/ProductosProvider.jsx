
import React, { createContext, useEffect, useReducer, useState } from 'react'
import { geBebidas, updateProductoService } from '../service/productosService';

export const ProductoContext = createContext();


const initialState = [];
const productoReducer = (state, action) => {

    switch (action.type) {
        case '[producto] cargar productos':
            return action.payload;

        case '[producto] agregar producto':


            return [...state, action.payload];

        case '[producto] eliminar producto':
            return state.filter(producto => producto.id !== action.payload)

        case '[producto] editar producto':
            return state.map(producto =>
                producto.id === action.payload.id ? { ...producto, ...action.payload } : producto
            );

        case '[producto] disminuir producto':
            return;

        case '[producto] obtener pedidos de mesa':

            return;

        case '[producto] cambiar estado':
            return;

        case '[mesa] vaciar mesa':
            return;
        default:

            return state;
    }
};
export const ProductosProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productoReducer, initialState);

    const [productos, setProductos] = useState([]);

    const [platos, setPlatos] = useState([]);
    const [bebidas, setBebidas] = useState([]);


    const getProductos = async () => {
        try {
            const { data } = await geBebidas();
            console.log("Todos los productos:", data);

            // Filtrar por categoría
            cargarProductos(data)
            setPlatos(data.filter(producto => producto.idCategoria === 1)); // Platos (categoría 1)
            setBebidas(data.filter(producto => producto.idCategoria === 2)); // Bebidas (categoría 2)
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    };
    // 

    const cargarProductos = (productos) => {
        dispatch({
            type: '[producto] cargar productos',
            payload: productos,
        });
    };

    useEffect(() => {
        getProductos()

    }, []);

    const updateProduct = (productoUpdate) => {

        console.log("llegadno datos productoUpdate")
        console.log(productoUpdate)

        dispatch({
            type: '[producto] editar producto',
            payload: productoUpdate
        });

    };

    const agregarProduct = (newProducto) => {
        dispatch({
            type: '[producto] agregar producto',
            payload: newProducto,
        });

    };

    useEffect(() => {
        setPlatos(state.filter(producto => producto.idCategoria === 1)); // Platos (categoría 1)
        setBebidas(state.filter(producto => producto.idCategoria === 2)); // Bebidas (categoría 2)
    }, [state]);



    const deleteProduct = (idProducto) => {


        try {


            dispatch({
                type: '[producto] eliminar producto',
                payload: idProducto,
            });


        } catch (error) {

        }



    };




    const updateProducto = async (newProducto) => {
        try {
            const { data } = await updateProductoService(newProducto.id, newProducto)
            updateProduct(data);
        } catch (error) {
            console.error("Error al Editar el producto", error);
        }
    };



    return (
        <ProductoContext.Provider value={{
            productos: state,
            platos,
            bebidas,
            updateProducto,
            updateProduct,
            deleteProduct,
            agregarProduct,

        }}>

            {children}
        </ProductoContext.Provider>
    );
};
