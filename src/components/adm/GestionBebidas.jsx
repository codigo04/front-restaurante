import React, { useContext, useEffect, useState } from 'react'
import GestionComidaimg from '../../assets/img/adm/gestionComida.jpg';
import { TituloDescription } from '../Globals/TituloDescription';
import { geBebidas, saveBebidas } from '../../service/productosService';
import { CuerpoModal } from '../modals/CuerpoModal';
import { ProductoContext } from '../../context/ProductosProvider';
import { Box, Button } from '@mui/material';
import { DeleteDialog } from '../Globals/DeleteDialog';
import { toast } from 'react-toastify';


export const GestionBebidas = () => {

    const { platos, bebidas, agregarProduct, deleteProduct, updateProducto } = useContext(ProductoContext);
    const { openDialog, dialogComponent } = DeleteDialog(deleteProduct);
    const [foodItems, setFoodItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        precio: 0,
        descripcion: '',
        stock: '',

    });

    const [formDataEdit, setFormDataEdit] = useState({
        id: '',
        nombre: '',
        precio: 0,
        descripcion: '',
        stock: '',

    });





    const handleChangeSave = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleChangeUpdate = (e) => {
        const { name, value } = e.target;
        setFormDataEdit({ ...formDataEdit, [name]: value });
    }

    const handleSubmitSave = async (e) => {
        e.preventDefault();
        // setFoodItems([...foodItems, formData]);
        setFormData({ nombre: '', precio: 0, descripcion: '', stock: '' });


        try {

            const tokenUser = localStorage.getItem('token')

            if (!tokenUser) return

            const producto = {
                nombre: formData.nombre,
                precio: formData.precio,
                descripcion: formData.descripcion,
                stock: formData.stock,
                idCategoria: 2

            }

            agregarProduct(producto)
            const { data } = await saveBebidas(producto);



            toast.success("Producto Agregado Correctamente", {
                position: "top-center",
            });

        } catch (error) {
            toast.success("Error Al Agregar", {
                position: "top-center",
            });
        }
    };

    const handleSubmitUpdate = (e) => {
        e.preventDefault();

        try {
            const newProducto = {
                id: formDataEdit.id,
                nombre: formDataEdit.nombre,
                precio: formDataEdit.precio,
                descripcion: formDataEdit.descripcion,
                // imagen: "https://example.com/imagen/cocacola.jpg",
                estado: "ACTIVO",
                porcion: "no se aun",
                stock: formDataEdit.stock,
                litros: "5000",
                idCategoria: 2
            }

            //setFoodItems([...foodItems,formData])
            updateProducto(newProducto);
            setIsModalOpen(false)
            toast.success("Producto Actualizado Correctamente", {
                position: "top-center",
            });
        } catch (error) {
            toast.error("Error Al Actualizar El Producto", {
                position: "top-center",
            });
        }
    }

    const handleViewProducto = (producto) => {
        setFormDataEdit({ ...formDataEdit, ...producto });
        setIsModalOpen(true)
        console.log("Producto selecciondo:", producto);
    }


    return (
        <>

            <div className="row">
                <div className="col-md-6 container-fluid">

                    <TituloDescription titulo={'Gestión de Bedidas'} decripcion={'Añade y administra las bebidas del menú'}></TituloDescription>

                    <form onSubmit={handleSubmitSave}>

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
                                        onChange={handleChangeSave}
                                        required
                                    />
                                </div>


                                <div className="col-md-6 mb-3">
                                    <label htmlFor="descripcion" className="form-label">Descripcion</label>
                                    <input
                                        className="form-control"
                                        type='text'
                                        id="descripcion"
                                        name="descripcion"
                                        value={formData.descripcion}
                                        onChange={handleChangeSave}
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
                                        onChange={handleChangeSave}
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
                                        onChange={handleChangeSave}
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
                                    {bebidas.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.nombre}</td>
                                            <td>{item.precio}</td>
                                            <td>{item.descripcion}</td>
                                            <td>{item.stock}</td>

                                            <td>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        gap: 1, // Espaciado horizontal entre botones
                                                        justifyContent: "center", // Centrar los botones
                                                    }}
                                                >
                                                    <Button
                                                        variant="contained"
                                                        sx={{ backgroundColor: "#ff6600", color: "#fff" }}
                                                        onClick={() => handleViewProducto(item)}
                                                    >
                                                        Editar
                                                    </Button>
                                                    <Button
                                                        variant="contained" handleDeleteProducto
                                                        color="error" // Usar el color predeterminado para eliminar
                                                        onClick={() => openDialog(item.id)}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </Box>

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

                    <form onSubmit={handleSubmitUpdate}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label text-sm fw-medium">Nombre:</label>
                            <div className="col-sm-8">
                                <input type="text" class="form-control text-sm"


                                    name="nombre"
                                    value={formDataEdit.nombre}
                                    onChange={handleChangeUpdate}

                                />
                            </div>
                        </div>

                        <div classNames="row mb-3">
                            <label className="col-sm-4 col-form-label text-sm fw-medium">Precio:</label>
                            <div className="col-sm-8">
                                <input type="text" class="form-control text-sm"
                                    name="precio"
                                    value={formDataEdit.precio}
                                    onChange={handleChangeUpdate}

                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label text-sm fw-medium">Descripcion:</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control text-sm"

                                    name="descripcion"
                                    value={formDataEdit.descripcion}
                                    onChange={handleChangeUpdate}
                                />
                            </div>

                        </div>

                        <div classNames="row mb-3">
                            <label className="col-sm-4 col-form-label text-sm fw-medium">Stock:</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control text-sm"

                                    name="descripcion"
                                    value={formDataEdit.stock}
                                    onChange={handleChangeUpdate}
                                />
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-12">
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ backgroundColor: "#ff6600", color: "#fff" }}

                                >
                                    Guardar Cambios
                                </Button>

                            </div>
                        </div>


                    </form>

                </CuerpoModal>
            )}

            {dialogComponent}
        </>
    )
}


