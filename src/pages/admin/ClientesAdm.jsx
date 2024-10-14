import React, { useState } from 'react'
import { TituloDescription } from '../../components/Globals/TituloDescription';


export const ClientesAdm = () => {
  const [users, setUsers] = useState([
    { cliente: "Juan", mesa: "4", fecha: "2024-07-15", estado: "pendiente", mesero: "Franco" },
    { cliente: "María",  mesa: "4", fecha: "2024-07-15", estado: "pendiente", mesero: "Franco" },
    { cliente: "Carlos", surname: "López",  mesa: "4", fecha: "2024-07-15", estado: "pendiente", mesero: "Franco" }
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
          <TituloDescription  titulo={'Gestión de Ordenes'} decripcion={'Aqui se muestra todas las ordenes'}></TituloDescription>
          <div className="mt-4">
            <div className="row">
              <div className="col-md-12 mb-3">
                <label htmlFor="search" className="form-label">Buscar</label>
                <input
                  type="search"
                  className="form-control"
                  id="search"
                  name="search"
                  placeholder="Buscar platillo..."
                  aria-label="Buscar"
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h3>Listado de Usuarios</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Mesa</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Mesero</th>
                 
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.cliente}</td>
                    <td>{user.mesa}</td>
                    <td>{user.fecha}</td>
                    <td>{user.estado}</td>
                    <td>{user.mesero}</td>
                    
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
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
      </section>

    </>
  )
}
