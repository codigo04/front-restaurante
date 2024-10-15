import React, { useEffect, useState } from 'react'
import { obtenerMesas, saveMesa } from '../../service/mesasService';

// { id: 1, numero: 1, capacidad: 4, estado: 'Libre' },
// { id: 2, numero: 2, capacidad: 2, estado: 'Ocupada' },
// { id: 3, numero: 3, capacidad: 6, estado: 'Reservada' },


export const MesasAdm = () => {
    const [mesas, setMesas] = useState([]);

    const [numeroMesa, setNumeroMesa] = useState('');
    const [capacidadMesa, setCapacidadMesa] = useState('');
    const [error, setError] = useState('');
    const [mensajeExito, setMensajeExito] = useState('');



    useEffect(() => {
        const cargarMesas = async () => {
            try {
                const response = await obtenerMesas();
                setMesas(response.data);
            } catch (error) {
                console.error('Error al cargar mesas', error);
            }
        };
        cargarMesas();
    }, []);



    const agregarMesa = async (e) => {
        e.preventDefault();
        setError('');
        setMensajeExito('');
    
        // Validación simple
        if (!numeroMesa || !capacidadMesa) {
          setError('Por favor ingresa todos los datos');
          return;
        }
    
        const nuevaMesa = {
            numeroMesa,
            capacidad: parseInt(capacidadMesa),
            estado: 'DISPONIBLE'
        };
    
        try {
          const response = await saveMesa(nuevaMesa);
          setMensajeExito(response.message || 'Mesa agregada correctamente.');
          setError(response.message)
          // Actualiza la lista de mesas con la nueva mesa.
          setMesas([...mesas, response.data]); // Agrega la nueva mesa al array de mesas.
          setNumeroMesa('');
          setCapacidadMesa('');
        } catch (error) {
          console.error('Error al agregar la mesa:', error);
          
          setError('Ya existe una mesa con el número: '+numeroMesa);
        }
    };

    const cambiarEstadoMesa = (id, nuevoEstado) => {
        setMesas(prevMesas =>
            prevMesas.map(mesa => (mesa.id === id ? { ...mesa, estado: nuevoEstado } : mesa))
        );
    };

    const getEstadoClase = (estado) => {
        switch (estado) {
            case 'DISPONIBLE': return 'bg-success';
            case 'OCUPADA': return 'bg-danger';
            case 'RESERVADA': return 'bg-warning';
            default: return '';
        }
    };


    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-center">Gestión de Mesas del Restaurante</h1>

            <div className="row">

                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Agregar Nueva Mesa</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={agregarMesa}>
                                <div className="mb-3">
                                    <label htmlFor="numeroMesa" className="form-label">
                                        Número de Mesa
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="numeroMesa"
                                        value={numeroMesa}
                                        onChange={(e) => setNumeroMesa(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="capacidadMesa" className="form-label">
                                        Capacidad
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="capacidadMesa"
                                        value={capacidadMesa}
                                        onChange={(e) => setCapacidadMesa(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Agregar Mesa
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 container-color">
                    <table className="table table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Número de Mesa</th>
                                <th>Capacidad</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mesas.map((mesa) => (
                                <tr key={mesa.id}>
                                    <td>{mesa.numeroMesa}</td>
                                    <td>{mesa.capacidad}</td>
                                    <td>
                                        <span className={`badge ${getEstadoClase(mesa.estado)}`}>
                                            {mesa.estado}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="btn-group" role="group">
                                            <button
                                                className="btn btn-sm btn-outline-success"
                                                onClick={() => cambiarEstadoMesa(mesa.id, 'DISPONIBLE')}
                                            >
                                                Libre
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => cambiarEstadoMesa(mesa.id, 'OCUPADA')}
                                            >
                                                Ocupada
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-warning"
                                                onClick={() => cambiarEstadoMesa(mesa.id, 'RESERVADA')}
                                            >
                                                Reservada
                                            </button>
                                        </div>
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


