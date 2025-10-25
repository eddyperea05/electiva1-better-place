import { useState } from "react";

//imports custom hooks
import { useWindowSize } from "../hooks/useWindowSize";

//import icons
import {
  FaXmark,
  FaBuilding,
  FaAngleDown,
  FaAngleUp,
  FaChair,
  FaPiggyBank,
  FaHouse,
  FaStore,
  FaBed,
  FaBath,
  FaCar,
  FaFilter,
} from "react-icons/fa6";

import { MdOutlineSquareFoot } from "react-icons/md";

import { PiFarmBold } from "react-icons/pi";
import { FilterInpuComponent } from "./CompleteFiltersComponents/FilterInpuComponent";

//array para usarlo en la iteración cuando se habra el filtro de propiedades
const typeOfProperty = [
  { property: "casa", icon: FaHouse },
  { property: "apartamento", icon: FaBuilding },
  { property: "finca", icon: PiFarmBold },
  { property: "estudio", icon: FaStore },
];

//array para usarlo en la iteración cuando se habra el filtro de inmuebles
const typeOfStuff = [
  { stuff: "habitaciones", icon: FaBed },
  { stuff: "baños", icon: FaBath },
  { stuff: "parqueaderos", icon: FaCar },
];

export const CompleteFilterComponent = () => {
  //custom hook para saber el tamaño de la ventana
  const { width } = useWindowSize();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [areOpenFilters, setAreOpenFilters] = useState({
    typeProperties: false,
    amountStuffs: false,
    amoutBudget: false,
    amoutMeters: false,
  });

  //Función para mostrar la el modal de los filtros
  const handleModal = () => {
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
  };

  //Función para abrir los filtros completos
  const handleChangeAreOpenFilters = (e: any) => {
    const textButton = e.target.textContent;

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
        <div className="bg-white fixed overflow-scroll top-0 right-0 bottom-0 left-0 md:static md:overflow-auto md:border md:border-gray-300 md:rounded-sm md:p-3 shadow-lg z-10">
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

            {/* fitrar por tipo */}
            <div className="mx-5 md:mx-0">
              {/* input para buscar por código */}
              <FilterInpuComponent />

              {/* boton para buscar por tipo de propiedad */}
              <button
                onClick={handleChangeAreOpenFilters}
                className="flex justify-between items-center w-full p-3 outline-1 outline-gray-300 rounded-sm"
              >
                <div className="flex items-center gap-2">
                  <FaBuilding className="text-[#2A1EFA]" />
                  <h3 className="capitalize text-gray-500">
                    tipo de propiedad
                  </h3>
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
                          <h3 className="capitalize text-gray-500">
                            {property}
                          </h3>
                        </div>
                        <input type="checkbox" name={property} id="" />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* boton para buscar por tipo de cantidad de cuartos, baños y parqueaderos */}
              <button
                onClick={handleChangeAreOpenFilters}
                className="flex justify-between items-center w-full p-3 mt-5 outline-1 outline-gray-300 rounded-sm"
              >
                <div className="flex items-center gap-2">
                  <FaChair className="text-[#2A1EFA]" />
                  <h3 className="capitalize text-gray-500">
                    cantidad de inmuebles
                  </h3>
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
                        <div className="flex justify-between">
                          <button className="cursor-pointer outline-1 outline-gray-300 text-gray-500 py-2 px-4 rounded-xl">
                            1
                          </button>
                          <button className="cursor-pointer outline-1 outline-gray-300 text-gray-500 py-2 px-4 rounded-xl">
                            2
                          </button>
                          <button className="cursor-pointer outline-1 outline-gray-300 text-gray-500 py-2 px-4 rounded-xl">
                            3
                          </button>
                          <button className="cursor-pointer outline-1 outline-gray-300 text-gray-500 py-2 px-4 rounded-xl">
                            4
                          </button>
                          <button className="cursor-pointer outline-1 outline-gray-300 text-gray-500 py-2 px-4 rounded-xl">
                            5+
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* boton para buscar por cantidad de presupuesto */}
              <button
                onClick={handleChangeAreOpenFilters}
                className="flex justify-between items-center w-full p-3 mt-5 outline-1 outline-gray-300 rounded-sm"
              >
                <div className="flex items-center gap-2">
                  <FaPiggyBank className="text-[#2A1EFA]" />
                  <h3 className="capitalize text-gray-500">
                    cantidad de presupuesto
                  </h3>
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
                      placeholder="Mínimo $"
                    />
                    <input
                      className="w-full outline-1 outline-gray-300 py-2 px-4 mb-3 rounded-sm"
                      type="text"
                      placeholder="Máximo $"
                    />
                  </div>
                  <button className="w-full bg-linear-to-r from-[#2A1EFA] to-[#BA1EFA] py-2.5 text-white font-bold md:cursor-pointer rounded-sm">
                    Aplicar
                  </button>
                </div>
              )}

              {/* boton para buscar por cantidad de presupuesto */}
              <button
                onClick={handleChangeAreOpenFilters}
                className="flex justify-between items-center w-full p-3 mt-5 outline-1 outline-gray-300 rounded-sm"
              >
                <div className="flex items-center gap-2">
                  <MdOutlineSquareFoot className="text-[#2A1EFA]" />
                  <h3 className="capitalize text-gray-500">
                    cantidad de metros
                  </h3>
                </div>
                {!areOpenFilters.amoutBudget ? (
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
                    />
                    <input
                      className="w-full outline-1 outline-gray-300 py-2 px-4 mb-3 rounded-sm"
                      type="text"
                      placeholder="Máximo m²"
                    />
                  </div>
                  <button className="w-full bg-linear-to-r from-[#2A1EFA] to-[#BA1EFA] py-2.5 text-white font-bold md:cursor-pointer rounded-sm">
                    Aplicar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
