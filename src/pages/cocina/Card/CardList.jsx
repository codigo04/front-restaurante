import { CardItem } from './CardItem'








export const CardList = ({ platos }) => {
  return (
    <div className="card-body px-2">

      <div className='table-container'>
        {platos.map((plato, index) => (
          <CardItem key={index} nombrePlato={plato.precio} cantidad={plato.cantidad} />
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
