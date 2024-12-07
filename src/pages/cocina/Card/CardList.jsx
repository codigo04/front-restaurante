import { useEffect, useState } from 'react';
import { CardItem } from './CardItem'








export const CardList = ({ platos, setEstadoProducto }) => {
  const [checkedPlatos, setCheckedPlatos] = useState(
    platos?.map((plato) => plato.producto?.idCategoria === 2) // Inicializamos con los platos de categoría 2 marcados
  );

  // Verificar si todos los platos están marcados al cargar los platos
  useEffect(() => {
    const newCheckedPlatos = platos?.map(
      (plato) => plato.producto?.idCategoria === 2 // Solo los platos de categoría 2 estarán marcados por defecto
    );
    setCheckedPlatos(newCheckedPlatos);

    // Verificar si todos los checkboxes están marcados (incluso los de otras categorías)
    const allChecked = newCheckedPlatos?.every((checked) => checked === true);
    setEstadoProducto(allChecked); // Cambia el estado si todos los checkboxes están marcados
  }, [platos, setEstadoProducto]);

  const handleCheckboxChange = (index) => {
    // Actualizar el estado de los checkboxes individualmente
    const newCheckedPlatos = [...checkedPlatos];

    // Cambiar el estado de la categoría correspondiente
    newCheckedPlatos[index] = !newCheckedPlatos[index];

    setCheckedPlatos(newCheckedPlatos);

    // Verificar si todos los checkboxes están marcados después del cambio
    const allChecked = newCheckedPlatos?.every((checked) => checked === true);
    setEstadoProducto(allChecked); // Si todos están marcados, actualiza el estado
  };

  console.log("platos")
  console.log(platos)
  return (
    <div className="card-body px-2">

      <div className='table-container'>
        {platos?.map((plato, index) => (
          <CardItem checked={checkedPlatos[index]} onCheckboxChange={() => handleCheckboxChange(index)} index={index} key={index} idCategoria={plato.producto?.idCategoria} nombrePlato={plato.producto?.nombre} cantidad={plato.cantidad} />
        ))}
      </div>


      {/* <div className='table-container'>
        {platos.map((plato, index) => (
          <CardItem key={index} nombrePlato={plato.precio} cantidad={plato.cantidad} />
        ))}
      </div> */}
    </div>
  )
}
