import React, { useState } from 'react'
import { TituloDescription } from '../../components/Globals/TituloDescription';

export const EmpleadosAdm = () => {

    const [foodItems, setFoodItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        apellido: '',
        correo: '',
        password:'',
        rol: '',
        fechaInicio: '',
        estado: '',
        dni: ''
    });

    // Función para manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        setFoodItems([...foodItems, formData]);
        setFormData({ name: '', apellido: '', correo: '',password,rol: '', fechaInicio: '', estado: '', dni: '' });
    };

    // Función para simular una solicitud externa por DNI y rellenar los campos
    const fetchEmployeeByDNI = async (dni) => {
        // Simulación de la búsqueda del empleado por DNI (esto podría ser una llamada a una API real)
        const employeeData = {
            name: 'Juan Perez',
            apellido: 'Cueva',
            correo: 'juan.perez@example.com',
            rol: 'admin',
            fechaInicio: '2022-05-12',
            estado: 'Activo',
        };

        // Simula una búsqueda por el DNI ingresado
        if (dni === "12345678") {
            setFormData({
                ...formData,
                ...employeeData,
                dni: dni // Mantener el DNI
            });
        } else {
            alert("Empleado no encontrado");
        }
    };

    const handleSearch = () => {
        fetchEmployeeByDNI(formData.dni);
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
                            name="dni"
                            value={formData.dni}
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
                                <label htmlFor="name" className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="apellido" className="form-label">Apellido</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="apellido"
                                    name="apellido"
                                    value={formData.apellido}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="rol" className="form-label">Rol</label>
                                <select
                                    className="form-select"
                                    name="rol"
                                    value={formData.rol}
                                    onChange={handleChange}
                                    required
                                >
                                    <option>Seleccionar Rol</option>
                                    <option value="admin">Administrador</option>
                                    <option value="empleado">Empleado</option>
                                </select>
                            </div>

                            <div className="col-md-6 mb-3">
                                <input
                                    type="date"
                                    className="form-control"
                                    id="fechaInicio"
                                    name="fechaInicio"
                                    value={formData.fechaInicio}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="estado" className="form-label">Estado (por definir)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="estado"
                                    name="estado"
                                    value={formData.estado}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="correo" className="form-label">Correo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="correo"
                                    name="correo"
                                    value={formData.correo}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="Password" className="form-label">Password</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Password"
                                    name="Password"
                                    value={formData.Password}
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
                                <th>Rol</th>
                                <th>Fecha Ingreso</th>
                                <th>Estado</th>
                                <th>DNI</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foodItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.correo}</td>
                                    <td>{item.rol}</td>
                                    <td>{item.fechaInicio}</td>
                                    <td>{item.estado}</td>
                                    <td>{item.dni}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}


