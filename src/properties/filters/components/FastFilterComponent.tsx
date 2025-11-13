import { useState } from "react";

//import iconos
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useDataPropertiesContext } from "../hooks/useDataPropertiesContext";

//Array con los filtros rápidos
const fastFilters = [
  "mayor precio",
  "menor precio",
  "más recientes",
  "menos recientes",
  "más habitaciones",
  "menos habitaciones",
];

export const FastFilterComponent = () => {
  //se importaron los estados del contexto de PropertiesContext
  const { setFastFilter } = useDataPropertiesContext();

  //estado para el abrir o cerrar la ventana de filtros
  const [isOpenList, setIsOpenList] = useState<boolean>(false);

  //Función para mostrar la lista de filtros rápidos
  const handleList = () => {
    isOpenList ? setIsOpenList(false) : setIsOpenList(true);
  };

  //Función para enviar el tipo de filtro al contexto de PropertiesContext
  const handleSelectFilter = (e: any) => {
    const filter = e.target.textContent;
    setFastFilter({ sortBy: filter });
    setIsOpenList(false);
  };

  return (
    <>
      {/* botón para abrir la lista de filtros rápidos */}
      <button
        onClick={handleList}
        className="flex justify-between items-center outline-1 rounded-md outline-gray-300 py-3 px-4 w-full mr-3 md:mr-0 md:mb-3 shadow-lg"
      >
        <h3 className="capitalize mr-2 cursor-pointer text-gray-500">
          ordenar por
        </h3>
        {!isOpenList ? (
          <FaAngleDown className="text-gray-500" />
        ) : (
          <FaAngleUp className="text-gray-500" />
        )}
      </button>

      {/* esta es la lista de los filtros rapidos */}
      {isOpenList && (
        <div className="absolute md:static md:mb-3 h-70 overflow-y-auto bg-white top-15 right-0 left-0 outline-1 outline-gray-300 rounded-sm p-3 shadow-lg z-999">
          <ul>
            {/* iteramos la el array del principio de los filtros */}
            {fastFilters.map((filter, index) => (
              <li
                key={index}
                onClick={handleSelectFilter}
                className="capitalize cursor-pointer my-3 border-b-1 border-gray-300 text-gray-500 text-md pb-2 md:hover:text-[#2A1EFA] md:hover:border-[#2A1EFA] duration-150"
              >
                {filter}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
