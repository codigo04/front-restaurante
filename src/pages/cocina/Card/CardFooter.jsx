
export const CardFooter = ({estado, onCompletar}) => {
  return (
    <footer>
    <div className="container card-footer d-flex">
    <button
        className={`btn ${estado === "completado" ? "btn-success" : "btn-danger"} mx-auto w-75`}
        onClick={onCompletar}
      >
        {estado === "completado" ? "Completado" : "Pendiente"}
        </button>
    </div>
  </footer>
  )
}
