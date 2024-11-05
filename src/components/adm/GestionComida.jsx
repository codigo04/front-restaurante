import React, { useState } from 'react'
import GestionComidaimg from '../../assets/img/adm/gestionComida.jpg';
import { TituloDescription } from '../Globals/TituloDescription';

export const GestionComida = () => {


    const [foodItems, setFoodItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        description: '',
        ingredients: '',
        portions: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFoodItems([...foodItems, formData]);
        setFormData({ name: '', price: 0, description: '', ingredients: '', portions: '' });
    };

    return (


        <>


            <div className="row">
                <div className="col-md-6 container-fluid">

                    <TituloDescription titulo={'Gestión de Comidas'} decripcion={'Añade y administra los platillos del menú'}></TituloDescription>

                    <form onSubmit={handleSubmit}>

                        <div className="container mt-4">

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="name" className="form-label">Nombre del platillo</label>
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
                                    <label htmlFor="price" className="form-label">Precio</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>



                        <div className="container mt-4">

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="description" className="form-label">Descripción</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="portions" className="form-label">Porciones a tamaño</label>
                                    <input
                                        type="text"
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

                        <button type="submit" className="btn color-primario ">+ Agregar comida</button>
                    </form>


                    <div className="mt-5">
                        <h3>Lista de Comidas</h3>
                        <div className='table-container'>
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

                </div>

                <div className="col-md-6 text-center contendor-img">
                    <img src={GestionComidaimg} alt="Plato" className="img-fluid img-fluid-tamanno" />
                </div>
            </div>



        </>
    )
}

