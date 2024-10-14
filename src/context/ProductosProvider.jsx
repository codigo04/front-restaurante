
import React, { createContext, useEffect, useState } from 'react'

export const ProductoContext = createContext();

export const ProductosProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);

    const fetchProdcutos = async () => {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProductos(data);

        console.log(data);
    };


    useEffect(() => {
        fetchProdcutos();
    }, [])

    return (
        <ProductoContext.Provider value={{
            productos
        }}>

            {children}
        </ProductoContext.Provider>
    );
};
