//import icons
import {
  FaAngleDown,
  FaAngleUp,
  FaChair,
  FaBed,
  FaBath,
  FaCar,
} from "react-icons/fa6";

//Import de contexto
import { useDataPropertiesContext } from "../../hooks/useDataPropertiesContext";

//Import de tipos
import type { Filter } from "../../../context/types/PropertiesContextTypes";
import type { PropsFilters } from "./types/PropsTypesFilters";

export const FilterAmoutStuffs = ({
  handleChange,
  areOpenFilters,
}: PropsFilters) => {

  //Contexto de las propiedades filtradas
  const { typeFastFilter, setFastFilter } = useDataPropertiesContext();

  //array para usarlo en la iteración cuando se habra el filtro de inmuebles
  const typeOfStuff = [
    { stuff: "habitaciones", icon: FaBed },
    { stuff: "baños", icon: FaBath },
    { stuff: "parqueaderos", icon: FaCar },
  ];

  //Valores que vamos a iterar por cada stuff
  const values = [1, 2, 3, 4, "5+"];

  //Función para capturar los tipos de stuffs y la cantidad
  const handleAmountClick = (stuff: string, value: number | string) => {
    
    //mantenemos los filtros anteriores y pasamos el nuevo
    setFastFilter((prev: Filter) => ({
      ...prev,
      amountStuffs: {
        ...prev.amountStuffs,
        [stuff]: value,
      },
    }));
  };

  return (
    <>
      {/* boton para buscar por tipo de cantidad de cuartos, baños y parqueaderos */}
      <button
        onClick={handleChange}
        className="flex justify-between items-center w-full p-3 mt-5 outline-1 outline-gray-300 rounded-sm"
      >
        <div className="flex items-center gap-2">
          <FaChair className="text-[#2A1EFA]" />
          <h3 className="capitalize text-gray-500">cantidad de inmuebles</h3>
        </div>
        {!areOpenFilters.amountStuffs ? (
          <FaAngleDown className="text-gray-500" />
        ) : (
          <FaAngleUp className="text-gray-500" />
        )}
      </button>

      {/* Iteración para mostrar los iconos y el nombre de cada inmueble */}
      {areOpenFilters.amountStuffs && (
        <div className="my-3 outline outline-gray-300 p-3 rounded-sm">
          <ul>
            {typeOfStuff.map(({ stuff, icon: Icon }, index) => (
              <li key={index} className="mb-3">
                <div className="flex items-center mb-3">
                  <Icon className="mr-2 text-[#2A1EFA]" />
                  <h3 className="capitalize text-gray-500">{stuff}</h3>
                </div>
                {/* En los botones usamos estilos dinamicos para poder cambiar el color del botón */}
                <div className="flex justify-between">
                  {values.map((value, i) => (
                    <button
                      key={i}
                      onClick={() => handleAmountClick(stuff, value)}
                      className={`cursor-pointer outline-1 outline-gray-300 py-2 px-4 rounded-xl ${
                        typeFastFilter.amountStuffs?.[stuff] === value
                          ? "bg-[#2A1EFA] text-white"
                          : "text-gray-500"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
