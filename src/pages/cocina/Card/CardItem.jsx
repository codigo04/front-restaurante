
export const CardItem = ({ checked, onCheckboxChange,index , nombrePlato, cantidad, idCategoria }) => {


  return (
    <>
      <div className="mb-4 p-4 bg-white rounded-lg shadow-lg flex justify-between items-center">
        {/* Contenedor del nombre y el checkbox */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2">
            <input
              id={`checkbox-${index}`} 
              type="checkbox"
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={checked}
              onChange={onCheckboxChange}
            />
            <p className="text-gray-800 font-medium">{nombrePlato}</p>
          </label>
        </div>
        {/* Contenedor de la cantidad */}
        <div className="w-10 h-10 bg-[#F56606] rounded-full flex justify-center items-center text-white font-bold">
          {cantidad}
        </div>
      </div>
    </>
  );
};
