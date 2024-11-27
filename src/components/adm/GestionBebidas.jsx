import React, { useEffect, useState } from 'react'
import GestionComidaimg from '../../assets/img/adm/gestionComida.jpg';
import { TituloDescription } from '../Globals/TituloDescription';
import { geBebidas, saveBebidas } from '../../service/productosService';
import { CuerpoModal } from '../modals/CuerpoModal';


export const GestionBebidas = () => {


    const [foodItems, setFoodItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        precio: 0,
        descripcion: '',
        stock: '',

    });


    const getProductosBebidas = async () => {

        try {

            const { data } = await geBebidas()

            console.log(data)

            setFoodItems(data);
        } catch (error) {

        }
    }

    useEffect(() => {
        getProductosBebidas();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFoodItems([...foodItems, formData]);
        setFormData({ nombre: '', precio: 0, descripcion: '', stock: '' });


        const tokenUser = localStorage.getItem('token')

        if (!tokenUser) return


        const producto = {
            nombre: formData.nombre,
            precio: formData.precio,
            descripcion: formData.descripcion,
            stock: formData.stock,
            idCategoria: 2

        }

        const { data } = await saveBebidas(producto);


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
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>


                                {/* <div className="col-md-6 mb-3">
                                    <label htmlFor="price" className="form-label">Categoria</label>
                                    <div className="form-group mb-3">
                                        <select className="form-select">
                                            <option>Seleccionar categoria</option>
                                            <option value='gaseosa'>Gaseosa</option>
                                            <option value='refresco'>Refresco</option>
                                        </select>
                                    </div>
                                </div> */}

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="descripcion" className="form-label">Descripcion</label>
                                    <input
                                        className="form-control"
                                        type='text'
                                        id="descripcion"
                                        name="descripcion"
                                        value={formData.descripcion}
                                        onChange={handleChange}
                                        required
                                    ></input>
                                </div>

                            </div>
                        </div>



                        <div className="container mt-2">

                            <div className="row">


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

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="stock" className="form-label">Stock</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="stock"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="container mt-2">

                            <div className="row">
                                {/* <div className="col-md-6 mb-3">
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
                                </div> */}


                            </div>
                        </div>

                        <button type="submit" className="btn btn-dark color-primario">+ Agregar bebida</button>
                    </form>


                    <div className="mt-3">
                        <h3>Lista de Bebidas</h3>

                        <div className='table-container'>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Descripcion</th>
                                        <th>stock</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>


                                <tbody>
                                    {foodItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.nombre}</td>
                                            <td>{item.precio}</td>
                                            <td>{item.descripcion}</td>
                                            <td>{item.stock}</td>

                                            <td>
                                                <button className="btn btn-danger btn-sm color-primario" onClick={() => setIsModalOpen(true)}>Editar</button>
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





            {isModalOpen && (
                <CuerpoModal titulo="Editar Bebida" onClose={() => setIsModalOpen(false)}>
                    <br />
                    
                </CuerpoModal>
            )}

        </>
    )
}


