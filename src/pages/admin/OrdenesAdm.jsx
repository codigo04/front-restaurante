import React, { useState } from 'react'
import { TituloDescription } from '../../components/Globals/TituloDescription';

export const OrdenesAdm = () => {
  const [users, setUsers] = useState([
    { name: "Juan", surname: "Pérez", dni: "12345678", phone: "987654321", registrationDate: "2024-08-31", orders: 5 },
    { name: "María", surname: "Gómez", dni: "87654321", phone: "987123456", registrationDate: "2024-07-15", orders: 3 },
    { name: "Carlos", surname: "López", dni: "12348765", phone: "987321654", registrationDate: "2024-06-22", orders: 7 },
    { name: "Carlos", surname: "López", dni: "12348765", phone: "987321654", registrationDate: "2024-06-22", orders: 7 },
    { name: "Carlos", surname: "López", dni: "12348765", phone: "987321654", registrationDate: "2024-06-22", orders: 7 }
  ]);

  const handleDelete = (index) => {
    const updatedUsers = users.filter((user, i) => i !== index);
    setUsers(updatedUsers);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Puedes filtrar los resultados basados en la búsqueda
    console.log("Buscando:", e.target.value);
  };
  return (
    <>
      <section className='container-fluid container-color'>
        <div>
          <TituloDescription titulo={'Gestión de Ordenes'} decripcion={'Buscar '}></TituloDescription>
          <div className=" mt-4">
            <div className="row">
              <div className="col-md-12 mb-3">
                <label htmlFor="search" className="form-label">Buscar</label>
                <input
                  type="search"
                  className="form-control"
                  id="search"
                  name="search"
                  placeholder="Buscar Orden..."
                  aria-label="Buscar"
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h3>Listado de Ordenes</h3>
            <div className='table-container'>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>DNI</th>
                    <th>Teléfono</th>
                    <th>Fecha Registro</th>
                    <th>Órdenes</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{user.name}</td>
                      <td>{user.surname}</td>
                      <td>{user.dni}</td>
                      <td>{user.phone}</td>
                      <td>{user.registrationDate}</td>
                      <td>{user.orders}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm color-primario"
                          onClick={() => handleDelete(index)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

    </>
  )
}
