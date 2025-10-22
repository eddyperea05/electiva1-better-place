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
          className="outline-1 outline-black px-2 py-3 mb-3"
          type="text"
          placeholder="Buscar por código..."
        />
        <button
          onClick={handleOnClickFilterInput}
          className="bg-blue-700 text-white py-3 font-bold md:hover:bg-blue-900 md:cursor-pointer md:duration-150"
        >
          Buscar
        </button>
      </div>
    </>
  );
};
