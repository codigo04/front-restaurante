import React, { useContext, useState } from 'react'
import { TituloDescription } from '../../components/Globals/TituloDescription';
import { AuthContext } from '../../context/AuthProvider';


export const ClientesAdm = () => {
  const { clientes } = useContext(AuthContext);
  const [filteredClientes, setFilteredClientes] = useState(clientes || []); // Filtrados para búsqueda y eliminar

  // Función para eliminar un cliente
  const handleDelete = (idCliente) => {
    const updatedClientes = filteredClientes.filter((cliente) => cliente.idCliente !== idCliente);
    setFilteredClientes(updatedClientes); // Actualizamos la lista filtrada
  };

 


  const [searchQuery, setSearchQuery] = useState("");

 // Función de búsqueda
 const handleSearch = (e) => {
  const searchQuery = e.target.value.toLowerCase();
  
  const filtered = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(searchQuery) ||
    cliente.apellido.toLowerCase().includes(searchQuery) ||
    cliente.dni.includes(searchQuery)
  );
  setFilteredClientes(filtered); 
};
  return (
    <>
      <section className='container-fluid container-color'>
        <div>
          <TituloDescription  titulo={'Gestión de clientes'} decripcion={'Aqui se muestra todas las ordenes'}></TituloDescription>
          <div className="mt-4">
            <div className="row">
              <div className="col-md-12 mb-3">
                <label htmlFor="search" className="form-label">Buscar</label>
                <input
                  type="search"
                  className="form-control"
                  id="search"
                  name="search"
                  placeholder="Buscar cliente..."
                  aria-label="Buscar"
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h3>Listado de Clientes</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Dni</th>
               
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredClientes.map((user) => (
                  <tr key={user.idCliente}>
                    <td>{user.idCliente}</td>
                    <td>{user.nombre}</td>
                    <td>{user.apellido}</td>
                    <td>{user.dni}</td>
                    
                    
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(user.idCliente)}
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
