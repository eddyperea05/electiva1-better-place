import { useEffect, useState } from "react";

//imports de iconos
import { FaAngleDown, FaAngleUp, FaPiggyBank } from "react-icons/fa6";

//import del contexto
import { useDataPropertiesContext } from "../../hooks/useDataPropertiesContext";

//import de función auxiliar
import { formatThousands } from "../../../../utils/formatThousand";

//imports de tipós
import type { filters } from "../../types/filtersTypes";
import type { PropsFiltersWithInput } from "./types/PropsTypesFilters";

export const FilterRangePice = ({
  handleChange,
  areOpenFilters,
  typeFastFilter
}: PropsFiltersWithInput) => {
  //Contexto para enviar las propiedades filtradas
  const { setFastFilter } = useDataPropertiesContext();

  //Creamos hooks para guardar el maximo y minimo de los precios
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  //Hook para limpiar los campos cuando se le da al botón de quitar filtros
  useEffect(() => {
    const min = typeFastFilter.budgetRange?.min ?? "";
    const max = typeFastFilter.budgetRange?.max ?? "";

    setMinPrice(min ? formatThousands(min.toString()) : "");
    setMaxPrice(max ? formatThousands(max.toString()) : "");
  }, [typeFastFilter.budgetRange]);

  //Esta función nos permite pasar el valor que ingresa como string a entero
  const parseToNumber = (value: string) =>
    value ? parseInt(value.replace(/\./g, ""), 10) : undefined;

  //Función para aplicar el filtro de rangos
  const applyBudgetFilter = () => {
    const min = parseToNumber(minPrice);
    const max = parseToNumber(maxPrice);

    //traemos todos los filtros anteriores y agregamos el filtro nuevo de rango de precio
    setFastFilter((prev: filters) => ({
      ...prev,
      budgetRange: { min, max },
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
          <FaPiggyBank className="text-[#2A1EFA]" />
          <h3 className="capitalize text-gray-500">cantidad de presupuesto</h3>
        </div>
        {!areOpenFilters.amoutBudget ? (
          <FaAngleDown className="text-gray-500" />
        ) : (
          <FaAngleUp className="text-gray-500" />
        )}
      </button>

      {/* ventana para abrir los inputs de la cantidad de precio */}
      {areOpenFilters.amoutBudget && (
        <div className="my-3 outline outline-gray-300 p-3 rounded-sm">
          <div>
            <input
              className="w-full outline-1 outline-gray-300 py-2 px-4 mb-3 rounded-sm"
              type="text"
              value={minPrice}
              placeholder="Mínimo $"
              onChange={(e) => setMinPrice(formatThousands(e.target.value))}
            />
            <input
              className="w-full outline-1 outline-gray-300 py-2 px-4 mb-3 rounded-sm"
              type="text"
              value={maxPrice}
              placeholder="Máximo $"
              onChange={(e) => setMaxPrice(formatThousands(e.target.value))}
            />
          </div>
          <button
            onClick={applyBudgetFilter}
            className="w-full bg-linear-to-r from-[#2A1EFA] to-[#BA1EFA] py-2.5 text-white font-bold md:cursor-pointer rounded-sm"
          >
            Aplicar
          </button>
        </div>
      )}
    </>
  );
};
