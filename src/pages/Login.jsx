import React, { useState } from 'react'
import '../assets/styles/Login.css'
import logo from '../assets/img/logito.svg';
import { useNavigate } from 'react-router-dom';
export const Login = ({ setUserRole }) => {


    const [role, setRole] = useState('¿Quién eres?');
    const [username, setUsername] = useState('admin@gmail.com');
    const [password, setPassword] = useState('admin');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();  // Para redirigir al usuario




    const getRuta = () => {

        switch (role) {

            case 'admin':


                console.log(`/${role}/dashboard`)
                return `/${role}/dashboard`
            case 'mozo':
                return `/${role}/mesas`
            case 'cajero':
                return `/${role}/inicio`
            default:
                break;
        }
    }

    // setRole('admin')
    const handleLogin = (e) => {
        e.preventDefault();


        console.log(role)
        console.log(password)
        // Ejemplo de lógica de autenticación básica
        const user = {
            username: 'admin@gmail.com',
            password: 'admin'
        };

        // Validar credenciales
        if (username === user.username && password === user.password) {
            // Si las credenciales son correctas, redirigir al Home


            setUserRole(role);

            navigate(`${getRuta()}`);
        } else {
            // Si son incorrectas, mostrar mensaje de error

            console.log(role)
            console.log('contraseña mal')
            setErrorMessage('Credenciales incorrectas, por favor intente de nuevo.');
        }
    };





    return (
        <>

            <section className='container-fondo container-fluid d-flex flex-column align-items-center justify-content-center min-vh-100'>
                <div className='container-form'>
                    <form className='container-fondo-form mx-auto w-50' onSubmit={handleLogin}>
                        <img src={logo} className="card-img-top" alt="logo" />



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
                                <option defaultValue="">¿Quién eres?</option>
                                <option value="admin">Administrador</option>
                                <option value="mozo">Mozo</option>
                                <option value="cajero">Cajero</option>
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
