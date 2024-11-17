
import React, { createContext, useEffect, useState } from 'react'
import { geBebidas } from '../service/productosService';

export const ProductoContext = createContext();

export const ProductosProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [bebidas, setBebidas] = useState([]);

    const fetchPlatos = async () => {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProductos(data);

        console.log(data);
    };


    const getProductosBebidas = async () => {

        try {
           
            const { data } = await geBebidas()
            console.log(data)

            setBebidas(data);
        } catch (error) {

        }
    }

    useEffect(() => {
        getProductosBebidas();
    }, []);

    useEffect(() => {
        fetchPlatos();
    }, [])

    return (
        <ProductoContext.Provider value={{
            productos,
            bebidas
        }}>

            {children}
        </ProductoContext.Provider>
    );
};
