import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)
    const [usuarios, setUsuarios] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [decodToken, SetDecodToken] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const decodificarToken = (token) => {
        const decodeToken = jwtDecode(token)
        SetDecodToken(decodeToken)

        console.log(decodeToken)
    }

    useEffect(() => {
       
    }, []);
    


    const iniciarSession = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/autenticacion/signin', {
                email,
                password
            });

            const token = response.data.token;
            console.log(token);

            // Decodifica el token
            // decodificarToken(token);

            // Guarda el token en localStorage
            localStorage.setItem('token', token);


            setIsLoading(true)
            // Retorna el token
            return token;

        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setIsLoading(false)
            return null;
        }
    };




    return (
        <AuthContext.Provider

            value={{
                iniciarSession,
                decodToken,
                isLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


