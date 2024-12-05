import React, { useContext, useEffect, useState } from 'react'
import GestionComidaimg from '../../assets/img/adm/gestionComida.jpg';
import { TituloDescription } from '../Globals/TituloDescription';
import { ProductoContext } from '../../context/ProductosProvider';
import { saveBebidas } from '../../service/productosService';
import { Box, Button } from '@mui/material';
import { CuerpoModal } from '../modals/CuerpoModal';
import { DeleteDialog } from '../Globals/DeleteDialog';

export const GestionComida = () => {
    const { platos, agregarProduct, updateProducto, deleteProduct } = useContext(ProductoContext);

    const [foodItems, setFoodItems] = useState(platos || []);

    const { openDialog, dialogComponent } = DeleteDialog(deleteProduct);

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



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // const getProductosPlatos = () => {
    //     setFoodItems(platos);
    // }
    // useEffect(() => {
    //     getProductosPlatos();
    // }, []);

    const handleSubmitSave = async (e) => {
        e.preventDefault();
        // setFoodItems([...foodItems, formData]);
        setFormData({ nombre: '', precio: 0, descripcion: '', ingredients: '', portions: '' });
        const tokenUser = localStorage.getItem('token')
        if (!tokenUser) return

        const producto = {

            nombre: formData.nombre,
            precio: formData.precio,
            descripcion: formData.descripcion,
            imagen: "https://chewinghappiness.com/wp-content/uploads/2021/02/Pollo-a-la-braza-4-1-500x500.jpg",
            estado: "ACTIVO",
            porcion: "no se aun",
            stock: formData.stock,
            litros: "5000",
            idCategoria: 1

        }
        agregarProduct(producto)
        const { data } = await saveBebidas(producto);
    };


    // obtenemos los datos 
    const handleChangeUpdate = (e) => {
        const { name, value } = e.target;
        setFormDataEdit({ ...formDataEdit, [name]: value });
    }

    const handleSubmitUpdate = (e) => {
        e.preventDefault();
        try {
            const newProducto = {
                id: formDataEdit.id,
                nombre: formDataEdit.nombre,
                precio: formDataEdit.precio,
                descripcion: formDataEdit.descripcion,
                imagen: "https://chewinghappiness.com/wp-content/uploads/2021/02/Pollo-a-la-braza-4-1-500x500.jpg",
                estado: "ACTIVO",
                porcion: "no se aun",
                stock: 22,
                litros: "5000",
                idCategoria: 1
            }
            console.log("Producto actualizadfo:", newProducto);
            //setFoodItems([...foodItems,formData])

            updateProducto(newProducto);
            setIsModalOpen(false)

        } catch (error) {

        }
    }


    const handleViewProducto = (empleado) => {
        setFormDataEdit({ ...formDataEdit, ...empleado });
        setIsModalOpen(true)
        console.log("Producto selecciondo:", empleado);
    }



    return (


        <>


            <div className="row">
                <div className="col-md-6 container-fluid">

                    <TituloDescription titulo={'Gestión de Comidas'} decripcion={'Añade y administra los platillos del menú'}></TituloDescription>

                    <form onSubmit={handleSubmitSave}>

                        <div className="container mt-4">

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="name" className="form-label">Nombre del platillo</label>
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

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="price" className="form-label">Precio</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="price"
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
                                    <label htmlFor="description" className="form-label">Descripción</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="descripcion"
                                        value={formData.descripcion}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                {/* <div className="col-md-6 mb-3">
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
                                </div> */}
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

                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {platos.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.nombre}</td>
                                            <td>{item.precio}</td>
                                            <td>{item.descripcion}</td>

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
                        <div class="row mb-3">
                            <label class="col-sm-4 col-form-label text-sm fw-medium">Nombre:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control text-sm"


                                    name="nombre"
                                    value={formDataEdit.nombre}
                                    onChange={handleChangeUpdate}

                                />
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label class="col-sm-4 col-form-label text-sm fw-medium">Precio:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control text-sm"
                                    name="precio"
                                    value={formDataEdit.precio}
                                    onChange={handleChangeUpdate}

                                />
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label class="col-sm-4 col-form-label text-sm fw-medium">Descripcion:</label>
                            <div class="col-sm-8">
                                <input type="text" className="form-control text-sm"

                                    name="descripcion"
                                    value={formDataEdit.descripcion}
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

