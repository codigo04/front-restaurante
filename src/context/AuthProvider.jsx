import { South } from '@mui/icons-material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { obtenerEmpledos } from '../service/empleadosService';
import { obtenerClientes } from '../service/clientesService';

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
   
    const getEmpleados = async (tokenUser) => {
        
      
        try {
           
            const {data} = await obtenerEmpledos(tokenUser)
            
            setUsuarios(data)
            console.log(usuarios)
        } catch (error) {
            console.error('Error obtener los empleados', error);
        }
    }


    const getClientes = async (tokenUser) => {
        
      
        try {
           
            const {data} = await obtenerClientes(tokenUser)
            setClientes(data.data)
            console.log(usuarios)
        } catch (error) {
            console.error('Error obtener los Clientes', error);
            
        }
    }



    useEffect(() => {
        const tokenUser = localStorage.getItem('token')
        if (!tokenUser) return

        getEmpleados(tokenUser);
        getClientes(tokenUser);
    }, []);


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
            // alert("CONEXION A SERVIDOR INAXCESIBLE")
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


    useEffect(() => {
        cerrarSesionAuth()
    }, []);

    return (
        <AuthContext.Provider

            value={{
                iniciarSession,
                cerrarSesionAuth,
                decodToken,
                isLoading,
                setIsLoading,
                auth,
                rolUser,
                setRoluser,
                usuarios,
                clientes
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


