import { CardList } from "./CardList"

export const CardMain = ({ imagenUrl, platos, estado, cambiarEstado,setEstadoProducto }) => {
  return (
    <main className="card-body">
      <section className="container card">
        {/* <article className=" d-flex flex-row my-3">
          <div className="card-image w-50">
            <img
              src={imagenUrl}
              alt="Descripción de la imagen"
              className="img-fluid w-75"
            />
          </div>
          <div className="card-action w-50 flex-center">

          </div>
        </article> */}

        <article>
          <div>
            <h4>Lista de platos</h4>
          </div>
          <CardList setEstadoProducto={setEstadoProducto} platos={platos} />
        </article>
      </section>
    </main>
  )
}
