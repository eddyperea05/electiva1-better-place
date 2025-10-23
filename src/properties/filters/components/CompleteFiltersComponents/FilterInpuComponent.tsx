import { useState } from "react";
import { useDetailContext } from "../../../../detailProperty/hooks/useDataContext";
import { filterInput } from "../../functionsFilters";

export const FilterInpuComponent = () => {

  //llamada al contexto de la data de las propiedaddes
  const { data } = useDetailContext();

  //Hook para capturar la información del hook
  const [filterInputData, setFilterInputData] = useState<string>("");

  //Funció para capturar el valor del input
  const handleChangeInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    //se le envia la data al hook
    setFilterInputData(value);
  };

  //Función para saber si coincide los códigos
  const handleOnClickFilterInput = () => {
    filterInput(data.codigoCasa, filterInputData);
  };

  return (
    <>
      <div className="display flex flex-col mb-4">
        <input
          onChange={handleChangeInputFilter}
          name="filterInput"
          className="outline-1 outline-gray-300 px-2 py-3 mb-3 rounded-sm"
          type="text"
          placeholder="Buscar por código..."
        />
        <button
          onClick={handleOnClickFilterInput}
          className="bg-linear-to-r from-[#2A1EFA] to-[#BA1EFA] text-white py-2.5 font-bold md:cursor-pointer rounded-sm"
        >
          Buscar
        </button>
      </div>
    </>
  );
};
