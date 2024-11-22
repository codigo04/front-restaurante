
export const CardItem = ({nombrePlato, cantidad}) => {
  return (
    <>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <div className="d-flex gap-3 align-items-center">
          <i className="fa-solid fa-utensils color-icon"></i>
          <p className="m-0">{nombrePlato}</p>
        </div>
        <div className="rounded-circle circle-detail text-white d-flex justify-content-center align-items-center">
          <span className="text-white">{cantidad}</span>
        </div>
      </div>
    </>
  );
};
