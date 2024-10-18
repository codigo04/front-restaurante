import { South } from '@mui/icons-material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null)  //almacena el token
    const [rolUser, setRoluser] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [usuarios, setUsuarios] = useState([]);
    const [clientes, setClientes] = useState([]);

    const [decodToken, SetDecodToken] = useState([]); //almacena el token decodificado

    const [isLoading, setIsLoading] = useState(false); //almacena si hay usuario autenticado o existe

    const navigate = useNavigate()

    const decodificarToken = (token) => {
        const decodeToken = jwtDecode(token)
        SetDecodToken(decodeToken);

        console.log(decodeToken)
    }

    useEffect(() => {
        const autenticarUser = () => {
            const token = localStorage.getItem('token');
            setRoluser(localStorage.getItem('rolUser'))
            if (token) {
                console.log('si hay tokeen')
                setAuth(token);

                // navigate('/admin/dashboard')
                setIsLoading(true)

                setCargando(true)
                return;
            }

            setCargando(true)

        }

        autenticarUser()
    }, []);





    const iniciarSession = async (email, password) => {

        try {
            const response = await axios.post('http://localhost:8080/api/v1/autenticacion/signin', {
                email,
                password
            });

            const token = response.data.token;
            setAuth(token);
           
            console.log('etro al login')
            // Guarda el token en localStorage
            localStorage.setItem('token', token);
            
            


            setIsLoading(true)
            // Retorna el token
            
                return token
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            // setIsLoading(false)
            return null;
        }
    };

    const cerrarSesionAuth = () => {
        setAuth(null);
        setRoluser(null);
        setIsLoading(false);
        localStorage.removeItem('token')
        localStorage.removeItem('rolUser')
    }


    return (
        <AuthContext.Provider

            value={{
                iniciarSession,
                cerrarSesionAuth
                ,
                decodToken,
                isLoading,
                setIsLoading,
                auth,
                rolUser,
                 setRoluser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


