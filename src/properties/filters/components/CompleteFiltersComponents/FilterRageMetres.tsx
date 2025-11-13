import { useEffect, useState } from "react";

//import icons
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { MdOutlineSquareFoot } from "react-icons/md";

//import del contexto de las propiedades
import { useDataPropertiesContext } from "../../hooks/useDataPropertiesContext";

//import de tipos
import type { Filter } from "../../../context/types/PropertiesContextTypes";
import type { PropsFiltersWithInput } from "./types/PropsTypesFilters";

export const FilterRageMetres = ({
  handleChange,
  areOpenFilters,
  typeFastFilter,
}: PropsFiltersWithInput) => {
  const { setFastFilter } = useDataPropertiesContext();

  //Creamos hooks para guardar el maximo y minimo de los metros
  const [minMeters, setMinMeters] = useState<string>("");
  const [maxMeters, setMaxMeters] = useState<string>("");

  //Hook para limpiar los campos cuando se le da al botón de quitar filtros
  useEffect(() => {
    const min = typeFastFilter.budgetRange?.min ?? "";
    const max = typeFastFilter.budgetRange?.max ?? "";

    setMinMeters(min ? (min.toString()) : "");
    setMaxMeters(max ? (max.toString()) : "");
  }, [typeFastFilter.budgetRange]);

  //Funcion para enviar los valores de los filtros anteriores y los metros
  const applyMetersFilter = () => {
    const min = minMeters;
    const max = maxMeters;

    //Enviamos lso valores con lso filtros anteriores
    setFastFilter((prev: Filter) => ({
      ...prev,
      metersRange: { min, max },
    }));
  };

  return (
    <>
      {/* boton para buscar por cantidad de presupuesto */}
      <button
        onClick={handleChange}
        className="flex justify-between items-center w-full p-3 mt-5 outline-1 outline-gray-300 rounded-sm"
      >
        <div className="flex items-center gap-2">
          <MdOutlineSquareFoot className="text-[#2A1EFA]" />
          <h3 className="capitalize text-gray-500">cantidad de metros</h3>
        </div>
        {!areOpenFilters.amoutMeters ? (
          <FaAngleDown className="text-gray-500" />
        ) : (
          <FaAngleUp className="text-gray-500" />
        )}
      </button>

      {/* ventana para abrir los inputs de la cantidad de precio */}
      {areOpenFilters.amoutMeters && (
        <div className="my-3 outline outline-gray-300 p-3 rounded-sm">
          <div>
            <input
              className="w-full outline-1 outline-gray-300 py-2 px-4 mb-3 rounded-sm"
              type="text"
              placeholder="Mínimo m²"
              value={minMeters}
              onChange={(e) => setMinMeters(e.target.value)}
            />
            <input
              className="w-full outline-1 outline-gray-300 py-2 px-4 mb-3 rounded-sm"
              type="text"
              placeholder="Máximo m²"
              value={maxMeters}
              onChange={(e) => setMaxMeters(e.target.value)}
            />
          </div>
          <button
            onClick={applyMetersFilter}
            className="w-full bg-linear-to-r from-[#2A1EFA] to-[#BA1EFA] py-2.5 text-white font-bold md:cursor-pointer rounded-sm"
          >
            Aplicar
          </button>
        </div>
      )}
    </>
  );
};
