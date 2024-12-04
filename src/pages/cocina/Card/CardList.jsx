import { CardItem } from './CardItem'

export const CardList = ({ platos }) => {
  return (
    <div className="card-body px-2">
        {platos.map((plato, index)=>(
            <CardItem key={index} nombrePlato={plato.nombre} cantidad={plato.cantidad}/>
        ))}
  </div>
  )
}
