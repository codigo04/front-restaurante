import React, { useState } from 'react'
import GestionComidaimg from '../../assets/img/adm/gestionComida.jpg';
import { TituloDescription } from '../Globals/TituloDescription';


export const GestionBebidas = () => {


    const [foodItems, setFoodItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        disponibilidad: '',
        ingredients: '',
        precio: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFoodItems([...foodItems, formData]);
        setFormData({ name: '', price: 0, description: '', ingredients: '', precio: '' });
    };

    return (


        <>


            <div className="row">
                <div className="col-md-6 container-fluid">

                 <TituloDescription titulo={'Gestión de Bedidas'} decripcion={'Añade y administra las bebidas del menú'}></TituloDescription>

                    <form onSubmit={handleSubmit}>

                        <div className="container mt-4">

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="name" className="form-label">Nombre de la bebida</label>
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
                                    <label htmlFor="price" className="form-label">Categoria</label>
                                    <div className="form-group mb-3">
                                    <select className="form-select">
                                        <option>Seleccionar categoria</option>
                                        <option value='gaseosa'>Gaseosa</option>
                                        <option value='refresco'>Refresco</option>
                                    </select>
                                </div>
                                </div>
                            </div>
                        </div>



                        <div className="container mt-4">

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="tamaño" className="form-label">Tamaño</label>
                                    <input
                                        className="form-control"
                                        id="tamaño"
                                        name="tamaño"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    ></input>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="precio" className="form-label">Precio</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="precio"
                                        name="precio"
                                        value={formData.precio}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="container mt-4">

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="disponibilidad" className="form-label">Disponibilidad</label>
                                    <input
                                        type='text'
                                        className="form-control"
                                        id="disponibilidad"
                                        name="disponibilidad"
                                        value={formData.disponibilidad}
                                        onChange={handleChange}
                                        required
                                    ></input>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="portions" className="form-label">Cantidad</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="portions"
                                        name="portions"
                                        value={formData.portions}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-dark">+ Agregar comida</button>
                    </form>


                    <div className="mt-5">
                        <h3>Lista de Comidas</h3>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Porciones</th>
                                    <th>Disponible</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foodItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.portions}</td>
                                        <td>✔️</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm">Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>

                <div className="col-md-6 text-center contendor-img">
                    <img src={GestionComidaimg} alt="Plato" className="img-fluid img-fluid-tamanno" />
                </div>
            </div>



        </>
    )
}


