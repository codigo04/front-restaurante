import React, { useContext, useState } from 'react'
import '../assets/styles/Login.css'
import logo from '../assets/img/logito.svg';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
export const Login = ({ setUserRole }) => {


    const [role, setRole] = useState('¿Quién eres?');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();  // Para redirigir al usuario
    const { iniciarSession, decodToken,isLoading } = useContext(AuthContext);






    const getRuta = (decodedRole) => {
        switch (decodedRole) {
            case 'ADMIN':
                return '/admin/dashboard';
            case 'MOZO':
                return '/mozo/mesas';
            case 'CAJA':
                return '/cajero/inicio';
            default:
                return '/';
        }
    };

    const validateForm = () => {
        if (!username || !password || role === 'Elige tu tipo de usuario') {
            setErrorMessage('Por favor completa todos los campos');
            return false;
        }
        return true;
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {

            // Iniciar sesión y obtener el token
            const token = await iniciarSession(username, password);

            if (token) {
                const decoded = JSON.parse(atob(token.split('.')[1])); // Decodificar token

                const userRole = decoded.roles.find(r => r.authority === role);

                if (userRole) {
                    // Redirigir a la página según el rol
                    setUserRole(userRole.authority)
                    navigate(getRuta(userRole.authority));
                } else {
                    setErrorMessage('El rol seleccionado no coincide con el usuario');
                }
            } else {
                setErrorMessage('Credenciales incorrectas');
            }

        } catch (error) {
            setErrorMessage('Error al iniciar sesión. Inténtalo de nuevo más tarde');
        }

    };





    return (
        <>

            <section className='container-fondo container-fluid d-flex flex-column align-items-center justify-content-center min-vh-100'>
                <div className='container-form'>
                    <form className='container-fondo-form mx-auto w-50' onSubmit={handleLogin}>
                        <img src={logo} className="card-img-top" alt="logo" />


                        <div style={{ color: 'white' }}>
                            {errorMessage}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                name="email"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="dropdown">
                            <select onChange={(e) => setRole(e.target.value)} value={role} className="form-select" aria-label="Selecciona un rol">
                                <option defaultValue="">Elige tu tipo de usuario</option>
                                <option value="ADMIN">Administrador</option>
                                <option value="MOZO">Mozo</option>
                                <option value="CAJA">Cajero</option>
                            </select>
                        </div>

                        <br />
                        <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
                    </form>
                </div>
            </section>


        </>
    )
}
