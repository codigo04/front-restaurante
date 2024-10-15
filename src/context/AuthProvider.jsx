import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)
    const [usuarios, setUsuarios] = useState([]);
    const [clientes, setClientes] = useState([]);

    const navigate = useNavigate()
    return (
        <AuthContext.Provider

            value={{

            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


