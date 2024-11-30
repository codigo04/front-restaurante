import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { createContext, useEffect, useState } from 'react'
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

    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate()


    const getEmpleados = async (tokenUser) => {

        try {

            const { data } = await obtenerEmpledos(tokenUser)

            setUsuarios(data)
            console.log(usuarios)
        } catch (error) {
            console.error('Error obtener los empleados', error);
        }
    }


    const getClientes = async (tokenUser) => {


        try {

            const { data } = await obtenerClientes(tokenUser)
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

                setAuth(token);
                // setIsLoading(false)



                return;
            }



        }

        autenticarUser()
        setIsLoading(false);
    }, []);





    const iniciarSession = async (email, password) => {

        try {
            const response = await axios.post('http://localhost:8080/api/v1/autenticacion/signin', {
                email,
                password
            });

            const token = response.data.token;

            setAuth(token);

            console.log('entro al login')
            // Guarda el token en localStorage
            localStorage.setItem('token', token);

            setIsLoading(false)


            return token
        } catch (error) {
            console.error('Error al iniciar sesión:', error);

            setIsLoading(false)
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


