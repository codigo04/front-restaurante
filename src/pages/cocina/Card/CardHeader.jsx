
export const CardHeader = ({numeroMesa, horaPedido}) => {
  return (
    <header className="card-header">
    <div className="flex-center-between mb-2">
      <div>
        <h2>Mesa</h2>
      </div>
      <div className="rounded-circle circle-mesa flex-center fs-4">
        <span>{numeroMesa}</span>
      </div>
    </div>
    <div>
      <p className="m-0">
        <i className="bi bi-stopwatch"></i> Hora de pedido:<span> {horaPedido}</span>
      </p>
    </div>
  </header>
  )
}
