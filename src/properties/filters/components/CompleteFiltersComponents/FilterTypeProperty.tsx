import { useEffect, useState } from "react";

//imports de icons
import {
  FaBuilding,
  FaAngleDown,
  FaAngleUp,
  FaHouse,
  FaStore,
} from "react-icons/fa6";
import { PiFarmBold } from "react-icons/pi";

///import del contexto de las propiedades
import { useDataPropertiesContext } from "../../hooks/useDataPropertiesContext";

//import de tipos
import type { filters } from "../../types/filtersTypes";
import type {PropsFiltersWithInput } from "./types/PropsTypesFilters";

export const FilterTypeProperty = ({
  handleChange,
  areOpenFilters,
  typeFastFilter,
}: PropsFiltersWithInput) => {
  //Contexto de propiedades
  const { setFastFilter } = useDataPropertiesContext();

  //Hook para saber cuales filtros fueron selecionados
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  //Hook para limpiar los campos cuando se le da al botón de quitar filtros
  useEffect(() => {
    setSelectedTypes(typeFastFilter.typeProperties ?? []);
  }, [typeFastFilter.typeProperties]);

  //array para usarlo en la iteración cuando se habra el filtro de propiedades
  const typeOfProperty = [
    { property: "casa", icon: FaHouse },
    { property: "apartamento", icon: FaBuilding },
    { property: "finca", icon: PiFarmBold },
    { property: "estudio", icon: FaStore },
  ];

  //Función para saber que checkbox se presionaron
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    //Con esta variables podemos agregar o eliminar el tipo de propiedad del array del hook
    const updatedTypes = checked
      ? [...selectedTypes, name]
      : selectedTypes.filter((type) => type !== name);

    setSelectedTypes(updatedTypes);
    setFastFilter((prev: filters) => ({
      ...prev,
      typeProperties: updatedTypes,
    }));
  };

  return (
    <>
      {/* boton para buscar por tipo de propiedad */}
      <button
        onClick={handleChange}
        className="flex justify-between items-center w-full p-3 outline-1 outline-gray-300 rounded-sm"
      >
        <div className="flex items-center gap-2">
          <FaBuilding className="text-[#2A1EFA]" />
          <h3 className="capitalize text-gray-500">tipo de propiedad</h3>
        </div>
        {!areOpenFilters.typeProperties ? (
          <FaAngleDown className="text-gray-500" />
        ) : (
          <FaAngleUp className="text-gray-500" />
        )}
      </button>

      {/* Iteración para mostrar los iconos y el nombre de cada checkbox */}
      {areOpenFilters.typeProperties && (
        <div className="my-3 outline outline-gray-300 p-3 rounded-sm">
          <ul>
            {typeOfProperty.map(({ property, icon: Icon }, index) => (
              <li key={index} className="flex justify-between mb-2">
                <div className="flex justify-center items-center">
                  <Icon className="mr-2 text-[#2A1EFA]" />
                  <h3 className="capitalize text-gray-500">{property}</h3>
                </div>
                <input
                  type="checkbox"
                  name={property}
                  checked={selectedTypes.includes(property)}
                  onChange={handleCheckboxChange}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
