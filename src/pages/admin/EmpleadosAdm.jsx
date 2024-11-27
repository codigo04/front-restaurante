import React, { useContext, useState } from 'react'
import { TituloDescription } from '../../components/Globals/TituloDescription';
import { AuthContext } from '../../context/AuthProvider';
import { actualizarEmpleado, consultaDni, saveAdmin, saveCajero, saveCocinero, saveMoso } from '../../service/empleadosService';
import { CuerpoModal } from '../../components/modals/CuerpoModal';
import { toast } from 'react-toastify';

export const EmpleadosAdm = () => {
    const { usuarios } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [empleados, setEmpleados] = useState(usuarios || []);

    const [selectEmpleado, setSelectedEmpleado] = useState(null);

    const tokenUser = localStorage.getItem('token')

    const [formData, setFormData] = useState({
        id: '',
        nombres: '',
        apellidos: '',
        correo: '',
        password: '',
        roles: [], // Cambiado para manejar como array de objetos
        fechaContratacion: '',
        estado: '',
        numDoc: ''
    });

    const [formDataEdit, setFormDataEdit] = useState({
        id: '',
        nombres: '',
        apellidos: '',
        correo: '',
        password: '',
        roles: [], // Cambiado para manejar como array de objetos
        fechaContratacion: '',
        estado: '',
        numDoc: ''
    });


    const handleViewEmpleado = (empleado) => {
        setSelectedEmpleado(empleado)


        setFormDataEdit({ ...formDataEdit, ...empleado });
        setIsModalOpen(true)


        console.log("Empleado  seleccionado:", empleado);
    }



    console.log('losempleados', empleados)

    const handleChangeSave = (e) => {
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

    const handleChangeUpdate = (e) => {
        const { name, value } = e.target;

        //Si el campo es 'roles', maneja la selección múltiple
        if (name === 'roles') {
            const selectedRoles = Array.from(e.target.selectedOptions, option => ({
                idRol: option.value,
                nombreRol: option.label
            }));
            setFormDataEdit({ ...formDataEdit, roles: selectedRoles });
        } else {
            setFormDataEdit({ ...formDataEdit, [name]: value });
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


    const handleSubmitSave = async (e) => {
        e.preventDefault();

        // Verificar si el empleado ya existe
        const empleadoExistente = empleados.find(empleado => empleado.numDoc === formData.numDoc);


        console.log("exist")
        console.log(empleadoExistente)

        if (empleadoExistente) {
            // Si el empleado ya existe, se actualiza en lugar de agregarlo de nuevo
            const empleadosActualizados = empleados.map(empleado =>
                empleado.numDoc === formData.numDoc ? formData : empleado
            );
            setEmpleados(empleadosActualizados);
        } else {
            // Si no existe, se agrega el nuevo empleado
            setEmpleados([...empleados, formData]);
        }

        setFormData({ nombres: '', apellidos: '', correo: '', password: '', roles: [], fechaContratacion: fechaActual(), estado: 'Activo', numDoc: '' });

        const roles = formData.roles.map(role => role.nombreRol);

        try {
            for (const role of roles) {
                switch (role) {
                    case 'Admin':
                        const empleadoAdm = {
                            nombres: formData.nombres,
                            apellidos: formData.apellidos,
                            email: formData.correo,
                            password: formData.password,
                            numDoc: formData.numDoc,
                        };
                        await saveAdmin(tokenUser, empleadoAdm);
                        break;

                    case 'Caja':
                        const empleadoCaja = {
                            nombres: formData.nombres,
                            apellidos: formData.apellidos,
                            email: formData.correo,
                            password: formData.password,
                            numDoc: formData.numDoc,
                        };
                        await saveCajero(tokenUser, empleadoCaja);
                        break;

                    case 'Mozo':
                        const empleadoMozo = {
                            nombres: formData.nombres,
                            apellidos: formData.apellidos,
                            email: formData.correo,
                            password: formData.password,
                            numDoc: formData.numDoc,
                        };
                        await saveMoso(tokenUser, empleadoMozo);
                        break;

                    case 'Cocinero':
                        const empleadoCocinero = {
                            nombres: formData.nombres,
                            apellidos: formData.apellidos,
                            email: formData.correo,
                            password: formData.password,
                            numDoc: formData.numDoc,
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

    const handleSubmitUpdate = (e) => {
        e.preventDefault();

        // Verificar si el empleado ya existe
        const empleadoExistente = empleados.find(empleado => empleado.id === formDataEdit?.id);


        console.log("exist")
        console.log(empleadoExistente)

        if (empleadoExistente) {
            // Si el empleado ya existe, se actualiza en lugar de agregarlo de nuevo
            const empleadosActualizados = empleados.map(empleado =>
                empleado.id === formDataEdit.id ? formDataEdit : empleado
            );
            setEmpleados(empleadosActualizados);
        } else {
            // Si no existe, se agrega el nuevo empleado
            setEmpleados([...empleados, formData]);
        }

        setFormData({ nombres: '', apellidos: '', correo: '', password: '', roles: [], fechaContratacion: fechaActual(), estado: 'Activo', numDoc: '' });

        const roles = formDataEdit.roles.map(role => role.nombreRol);

        //try {
        for (const role of roles) {
            switch (role) {
                case 'Admin':
                    const empleadoAdm = {
                        id:formData.id,
                        nombres: formData.nombres,
                        apellidos: formData.apellidos,
                        email: formData.correo,
                        password: formData.password,
                        numDoc: formData.numDoc,
                    };
                    //   await saveAdmin(tokenUser, empleadoAdm);
                    break;

                case 'Caja':
                    const empleadoCaja = {
                        nombres: formData.nombres,
                        apellidos: formData.apellidos,
                        email: formData.correo,
                        password: formData.password,
                        numDoc: formData.numDoc,
                    };
                    // await saveCajero(tokenUser, empleadoCaja);
                    break;

                case 'MOZO':
                    const empleadoMozo = {
                        id:formDataEdit.id,
                        nombres: formDataEdit.nombres,
                        estado:formDataEdit.estado==='1'?true:false,
                        apellidos: formDataEdit.apellidos,
                        email: formDataEdit.correo,
                        password: formDataEdit.password,
                        numDoc: formDataEdit.numDoc,
                    };
                         actualizarEmpleado(empleadoMozo);
                         toast.success("Empleado actualizado Correctamente", {
                            position: "top-center",
                          });
                         setIsModalOpen(false)
                    break;

                case 'Cocinero':
                    const empleadoCocinero = {
                        nombres: formData.nombres,
                        apellidos: formData.apellidos,
                        email: formData.correo,
                        password: formData.password,
                        numDoc: formData.numDoc,
                    };
                    // await saveCocinero(tokenUser, empleadoCocinero);
                    break;

                default:
                    break;
            }
        }
        //} catch (error) {
        //   console.error('Error al guardar el empleado:', error);
        //alert('Se produjo un error al guardar el empleado. Por favor, intenta nuevamente.');
        //  }
    };

    const fetchEmployeeByDNI = async (dni) => {
        const tokenUser = localStorage.getItem('token');

        if (!tokenUser) {
            alert("Token no encontrado. Por favor, inicia sesión.");
            return;
        }

        try {
            const data = await consultaDni(dni);

            const employeeData = {
                nombres: data.nombres || "",
                apellidos: data.apellidos || "",
                numDoc: data.numDoc,
            };

            if (dni === data.numDoc) {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    ...employeeData
                }));

                toast.success("Empleado Encontrado", {
                    position: "top-center",
                });
            } else {
                alert("Empleado no encontrado");
            }
        } catch (error) {
            console.error("Error al buscar el empleado:", error);
            toast.error("Se produjo un error al buscar el empleado. Intenta nuevamente.", {
                position: "top-center",
            });

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
                            maxLength={8}
                            name="numDoc"
                            value={formData.numDoc}
                            onChange={handleChangeSave}
                            placeholder="Ingrese DNI para buscar"
                        />
                        <button className="btn  color-primario" onClick={handleSearch}>Buscar</button>
                    </div>
                </div>

                <form onSubmit={handleSubmitSave}>
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
                                    onChange={handleChangeSave}
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
                                    onChange={handleChangeSave}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="roles" className="form-label">Roles</label>
                                <select
                                    className="form-select"
                                    name="roles"
                                    value={formData.roles.map(role => role.idRol)} // Muestra los IDs de los roles seleccionados
                                    onChange={handleChangeSave}
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
                                    onChange={handleChangeSave}

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
                                    onChange={handleChangeSave}
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
                                    onChange={handleChangeSave}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-dark color-primario">+ Agregar Empleado</button>
                    </div>
                </form>

                <div className="mt-5">
                    <h3>Lista de Empleados</h3>
                    <div className='table-container'>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Id</th>
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
                                {empleados.map((empl, index) => (
                                    <tr key={index}>
                                        <td>{empl.id}</td>
                                        <td>{empl.nombres} {empl.apellido}</td>
                                        <td>{empl.correo}</td>
                                        <td>
                                            {empl.roles.map((rol) => rol.nombreRol).join(', ')}
                                        </td>
                                        <td>{empl.fechaContratacion}</td>
                                        <td>{empl.enabled ? 'Activo' : 'Inactivo'}</td>
                                        <td>{empl.numDoc}</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm color-primario" onClick={() => handleViewEmpleado(empl)}>Editar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>



            {isModalOpen && (
                <CuerpoModal titulo="Editar Empleado" onClose={() => setIsModalOpen(false)}>
                    <br />
                    <form onSubmit={handleSubmitUpdate}>
                        <div class="row mb-3">
                            <label class="col-sm-4 col-form-label text-sm fw-medium">DNI:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control text-sm"


                                    name="numDoc"
                                    value={formDataEdit.numDoc}
                                    onChange={handleChangeUpdate}



                                />
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label class="col-sm-4 col-form-label text-sm fw-medium">Nombre:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control text-sm"
                                    name="nombres"
                                    value={formDataEdit.nombres}
                                    onChange={handleChangeUpdate}

                                />
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label class="col-sm-4 col-form-label text-sm fw-medium">Correo:</label>
                            <div class="col-sm-8">
                                <input type="text" className="form-control text-sm"

                                    name="correo"
                                    value={formDataEdit.correo}
                                    onChange={handleChangeUpdate}
                                />
                            </div>



                        </div>
                        <div class="row mb-3">
                            <label class="col-sm-4 col-form-label text-sm fw-medium">Posición:</label>
                            <div class="col-sm-8">
                                <select
                                    className="form-select"
                                    name="roles"
                                    value={formDataEdit.roles
                                        .map(role => role.idRol)} // Muestra los IDs de los roles seleccionados
                                    onChange={handleChangeUpdate}
                                    multiple
                                    required

                                // Permite seleccionar múltiples roles
                                >
                                    <option value="1">Mozo</option>
                                    <option value="2">Admin</option>
                                    <option value="3">Caja</option>
                                    <option value="4">Cocinero</option>

                                </select>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label class="col-sm-4 col-form-label text-sm fw-medium">Estado:</label>
                            <div class="col-sm-8">


                                <select
                                    className="form-select"
                                    name="estado"
                                    value={formDataEdit.estado} // Muestra los IDs de los roles seleccionados
                                    onChange={handleChangeUpdate}
                                    required

                                // Permite seleccionar múltiples roles
                                >
                                    <option value="1">Activo</option>
                                    <option value="2">Inactivo</option>


                                </select>
                            </div>
                        </div>
                        {/* <div class="row mb-3">
                            <label class="col-sm-4 col-form-label text-sm fw-medium">ID:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control text-sm" value="position" />
                            </div>
                        </div> */}

                        <div className="row">
                            <div className="col-12">
                                <button className="btn color-primario w-100" >Guardar Cambios</button>
                            </div>
                        </div>
                    </form>
                </CuerpoModal>
            )}


        </div>
    );
};