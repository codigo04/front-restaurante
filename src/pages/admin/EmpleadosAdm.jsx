import React, { useContext, useState } from 'react'
import { TituloDescription } from '../../components/Globals/TituloDescription';
import { AuthContext } from '../../context/AuthProvider';
import { consultaDni, saveAdmin, saveCajero, saveCocinero, saveMoso } from '../../service/empleadosService';

export const EmpleadosAdm = () => {
    const { usuarios } = useContext(AuthContext);

    const [foodItems, setFoodItems] = useState(usuarios || []);
    const tokenUser = localStorage.getItem('token')
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        correo: '',
        password: '',
        roles: [], // Cambiado para manejar como array de objetos
        fechaContratacion: '',
        estado: '',
        numDoc: ''
    });



    console.log('losempleados', foodItems)
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Si el campo es 'roles', maneja la selección múltiple
        if (name === 'roles') {
            const selectedRoles = Array.from(e.target.selectedOptions, option => ({
                idRol: option.value,
                nombreRol: option.label
            }));
            setFormData({ ...formData, roles: selectedRoles });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const fechaActual = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Añadir 1 porque los meses son de 0 a 11
        const day = String(date.getDate()).padStart(2, '0');

        const fechaContratacion = `${year}-${month}-${day}`;

        return fechaContratacion
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Guardar el empleado en el estado antes de enviar
        setFoodItems([...foodItems, formData]);
        setFormData({ nombres: '', apellidos: '', correo: '', password: '', roles: [], fechaContratacion: fechaActual(), estado: 'Activo', numDoc: '' });

        const roles = formData.roles.map(role => role.nombreRol);

        try {
            for (const role of roles) {
                switch (role) {
                    case 'Admin':

                        const empleadoAdm = {
                            nombres: formData.nombres || "desdeEl front",
                            apellidos: formData.apellidos || "policio",
                            email: formData.correo || "desdeEl@gmail.com",
                            password: formData.password || "desdeEl",
                            numDoc: formData.numDoc || "00000"
                        };


                        await saveAdmin(tokenUser, empleadoAdm);
                        break;

                    case 'Caja':
                        const empleadoCaja = {
                            nombres: formData.nombres || "desdeEl front",
                            apellidos: formData.apellidos || "policio",
                            email: formData.correo || "desdeEl@gmail.com",
                            password: formData.password || "desdeEl",
                            numDoc: formData.numDoc || "00000"
                        };


                        await saveCajero(tokenUser, empleadoCaja);
                        break;

                    case 'Mozo':
                        const empleadoMozo = {
                            nombres: formData.nombres || "desdeEl front",
                            apellidos: formData.apellidos || "policio",
                            email: formData.correo || "desdeEl@gmail.com",
                            password: formData.password || "desdeEl",
                            numDoc: formData.numDoc || "00000"
                        };


                        await saveMoso(tokenUser, empleadoMozo);
                        break;

                    case 'Cocinero':
                        const empleadoCocinero = {
                            nombres: formData.nombres || "desdeEl front",
                            apellidos: formData.apellidos || "policio",
                            email: formData.correo || "desdeEl@gmail.com",
                            password: formData.password || "desdeEl",
                            numDoc: formData.numDoc || "00000"
                        };


                        await saveCocinero(tokenUser, empleadoCocinero);
                        break;

                    default:

                        break;
                }
            }
        } catch (error) {
            console.error('Error al guardar el empleado:', error);
            alert('Se produjo un error al guardar el empleado. Por favor, intenta nuevamente.');
        }
    };

    const fetchEmployeeByDNI = async (dni) => {
        const tokenUser = localStorage.getItem('token');

        if (!tokenUser) {
            alert("Token no encontrado. Por favor, inicia sesión.");
            return;
        }

        try {
            const data = await consultaDni(tokenUser, dni);
            const employeeData = {
                nombres: data.nombres,
                apellidos: data.apellidos,
                numDoc: data.numDoc,
            };

            if (dni === data.numDoc) {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    ...employeeData
                }));
            } else {
                alert("Empleado no encontrado");
            }
        } catch (error) {
            console.error("Error al buscar el empleado:", error);
            alert("Se produjo un error al buscar el empleado. Intenta nuevamente.");
        }
    };

    const handleSearch = () => {
        fetchEmployeeByDNI(formData.numDoc);
    };

    return (
        <div className="container-fluid container-color">
            <div className="container-fluid">
                <h1>Gestión de Empleados</h1>
                <p>Añade y administra los empleados</p>

                <div className="mt-4">
                    <label htmlFor="dniSearch" className="form-label">Buscar por DNI</label>
                    <div className="d-flex">
                        <input
                            type="text"
                            className="form-control me-2"
                            id="dniSearch"
                            name="numDoc"
                            value={formData.numDoc}
                            onChange={handleChange}
                            placeholder="Ingrese DNI para buscar"
                        />
                        <button className="btn btn-primary" onClick={handleSearch}>Buscar</button>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="nombres" className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombres"
                                    name="nombres"
                                    value={formData.nombres}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="apellidos" className="form-label">Apellido</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="apellidos"
                                    name="apellidos"
                                    value={formData.apellidos}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="roles" className="form-label">Roles</label>
                                <select
                                    className="form-select"
                                    name="roles"
                                    value={formData.roles.map(role => role.idRol)} // Muestra los IDs de los roles seleccionados
                                    onChange={handleChange}
                                    required
                                    multiple
                                // Permite seleccionar múltiples roles
                                >
                                    <option value="1">Mozo</option>
                                    <option value="2">Admin</option>
                                    <option value="3">Caja</option>
                                    <option value="4">Cocinero</option>

                                </select>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="fechaContratacion" className="form-label">Fecha</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="fechaContratacion"
                                    name="fechaContratacion"
                                    value={formData.fechaContratacion}
                                    onChange={handleChange}

                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="correo" className="form-label">Correo</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="correo"
                                    name="correo"
                                    value={formData.correo}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-dark">+ Agregar Empleado</button>
                    </div>
                </form>

                <div className="mt-5">
                    <h3>Lista de Empleados</h3>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Roles</th>
                                <th>Fecha Ingreso</th>
                                <th>Estado</th>
                                <th>DNI</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foodItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.nombres} {item.apellido}</td>
                                    <td>{item.correo}</td>
                                    <td>
                                        {item.roles.map((rol) => rol.nombreRol).join(', ')}
                                    </td>
                                    <td>{item.fechaContratacion}</td>
                                    <td>{item.enabled ? 'Activo' : 'Inactivo'}</td>
                                    <td>{item.numDoc}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm">Editar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};