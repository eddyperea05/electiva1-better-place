import { useState } from "react";

//imports custom hooks
import { useWindowSize } from "../hooks/useWindowSize";

//import icons
import { FaXmark, FaFilter } from "react-icons/fa6";

//imports de componentes
import { FilterInpuComponent } from "./CompleteFiltersComponents/FilterInpuComponent";
import { FilterTypeProperty } from "./CompleteFiltersComponents/FilterTypeProperty";
import { FilterAmoutStuffs } from "./CompleteFiltersComponents/FilterAmoutStuffs";
import { FilterRangePice } from "./CompleteFiltersComponents/FilterRangePice";
import { FilterRageMetres } from "./CompleteFiltersComponents/FilterRageMetres";

//import de tipos
import type { Filter } from "../../context/types/PropertiesContextTypes";

//import de contexto de las propiedades
import { useDataPropertiesContext } from "../hooks/useDataPropertiesContext";

export const CompleteFilterComponent = () => {
  //custom hook para saber el tamaño de la ventana
  const { width } = useWindowSize();

  const { typeFastFilter, setFastFilter } = useDataPropertiesContext();

  //Hook para abrir o cerrar el modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  //Hook para saber cual modal de cerro
  const [areOpenFilters, setAreOpenFilters] = useState({
    typeProperties: false,
    amountStuffs: false,
    amoutBudget: false,
    amoutMeters: false,
  });

  //Función para mostrar la el modal de los filtros
  const handleModal = () => {
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
    /* Hacemos un cambio en el estilo directo para que no se pueda hacer 
    el scroll de las ventanas anteriores */
    document.body.style.overflow = !isModalOpen ? "hidden" : "auto";
  };

  //Función para abrir los filtros completos
  const handleChangeAreOpenFilters = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const textButton = e.currentTarget.textContent;

    //creamos una lista donde los valores sea el valor del objeto
    const mapTextToKey: Record<string, keyof typeof areOpenFilters> = {
      "tipo de propiedad": "typeProperties",
      "cantidad de inmuebles": "amountStuffs",
      "cantidad de presupuesto": "amoutBudget",
      "cantidad de metros": "amoutMeters",
    };

    //guardamos la llave como el valor del mapeo de la lista
    const key = mapTextToKey[textButton];

    /* usarmos el hook y usarmos propiedad dinamica para guardar el valor contrario 
    si se presiona el boton */
    setAreOpenFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  //Función para limpiar todos los filtros
  const handleClearAllFilters = () => {
    setFastFilter({
      typeProperties: [],
      amountStuffs: {},
      budgetRange: { min: undefined, max: undefined },
      metersRange: { min: undefined, max: undefined },
      sortBy: "",
    });
  };

  //Función para saber que filtros estan activados
  const hasActiveFilters = (filter?: Filter): boolean => {
    if (!filter) return false;

    //Retornamos todos los filtros activamos y validamos que seand diferendes de undefined
    return (
      (filter.typeProperties?.length ?? 0) > 0 ||
      Object.values(filter.amountStuffs ?? {}).some((v) => v !== undefined) ||
      filter.budgetRange?.min !== undefined ||
      filter.budgetRange?.max !== undefined ||
      filter.metersRange?.min !== undefined ||
      filter.metersRange?.max !== undefined ||
      !!filter.sortBy
    );
  };

  return (
    <>
      {/* Este boton es solo para movil por lo cual si es menor a 768 no se va a mostrar */}
      {width < 768 && (
        <button
          onClick={handleModal}
          className="py-3 px-4 bg-linear-to-r from-[#2A1EFA] to-[#BA1EFA] rounded-md"
        >
          <FaFilter className="text-white" />
        </button>
      )}

      {/* Tenemos isModalOpen para la vista movil y width que lo traemos del customhook para la
      version de escritorio */}
      {(isModalOpen || width > 768) && (
        <div className="z-10 bg-white fixed overflow-scroll top-0 right-0 bottom-0 left-0 md:static md:overflow-auto md:border md:border-gray-300 md:rounded-sm md:p-3 shadow-lg">
          <div className="flex flex-col md:mt-2">
            {/* boton para cerrar el modal en la vista movil */}
            <button
              onClick={handleModal}
              className="flex justify-end mx-3 my-4 md:hidden"
            >
              <FaXmark
                size={30}
                className="text-white bg-blue-700 p-1 rounded-sm"
              />
            </button>

            {hasActiveFilters(typeFastFilter) && (
              <button
                onClick={handleClearAllFilters}
                className="capitalize my-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                quitar filtros
              </button>
            )}

            {/* fitrar por tipo */}
            <div className="mx-5 md:mx-0">
              {/* input para buscar por código */}
              <FilterInpuComponent />

              {/* Filtrar por propiedades */}
              <FilterTypeProperty
                handleChange={handleChangeAreOpenFilters}
                areOpenFilters={areOpenFilters}
                typeFastFilter={typeFastFilter}
              />

              {/* Filtar por cantidad de cosas */}
              <FilterAmoutStuffs
                handleChange={handleChangeAreOpenFilters}
                areOpenFilters={areOpenFilters}
              />

              {/* Filtrar por rango de precios */}
              <FilterRangePice
                handleChange={handleChangeAreOpenFilters}
                areOpenFilters={areOpenFilters}
                typeFastFilter={typeFastFilter}
              />

              {/* Filtrar por rango de metros */}
              <FilterRageMetres
                handleChange={handleChangeAreOpenFilters}
                areOpenFilters={areOpenFilters}
                typeFastFilter={typeFastFilter}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
