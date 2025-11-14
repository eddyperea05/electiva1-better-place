import { useEffect, useState } from "react";

import { useDetailContext } from "../../../../detailProperty/hooks/useDataContext";
import { useNavigate } from "react-router-dom";
import type { PropiedadInterface } from "../../../types/propertyType";
import { getProperties } from "../../../../firebase/functions/functionsPropertiesFirebase";

export const FilterInpuComponent = () => {
  //navigate para ir al detalle de la propiedad
  const navigate = useNavigate();

  //llamado al conexto del detalle
  const { setData } = useDetailContext();

  //Hook para alamacenar las propiedades
  const [properties, setProperties] = useState<PropiedadInterface[]>([]);

  //Hook para capturar la información del hook
  const [filterInputData, setFilterInputData] = useState<string>("");
  const [filteredCodes, setFilteredCodes] = useState<string[]>([]);

  //Hook para tener los datos ya cargados en el array
  useEffect(() => {
    const fetchProperties = async () => {
      const data = await getProperties();
      setProperties(data);
    };
    fetchProperties();
  }, []);

  //Funció para capturar el valor del input
  const handleChangeInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterInputData(value);

    if (!value) {
      setFilteredCodes([]);
      return;
    }

    //Variable para filtrar los propiedades con coicidencia y maximo 5 propieaddes
    const matches = properties
      .map((property: PropiedadInterface) => property.code)
      .filter((code: string) => code.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 5);

    setFilteredCodes(matches);
  };

  //Función para enviar los datos al detalle de las propiedades
  const handleClickDetail = () => {
    const dataProperty = properties.filter(
      (property: PropiedadInterface) => property.code === filterInputData
    );

    setData({ ...dataProperty[0] });
    navigate("/detail");
  };

  return (
    <>
      <div className="display relative flex flex-col mb-4">
        <input
          onChange={handleChangeInputFilter}
          name="filterInput"
          value={filterInputData}
          className="outline-1 outline-gray-300 px-2 py-3 mb-3 rounded-sm"
          type="text"
          placeholder="Buscar por código..."
        />
        <button
          onClick={handleClickDetail}
          className="bg-linear-to-r from-[#2A1EFA] to-[#BA1EFA] text-white py-2.5 font-bold md:cursor-pointer rounded-sm"
        >
          Buscar
        </button>
      </div>
      {filteredCodes.length > 0 && (
        <ul className="absolute w-64 bg-white border border-gray-300 rounded-sm shadow-md max-h-60 overflow-y-auto">
          {filteredCodes.map((code, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setFilterInputData(code);
                setFilteredCodes([]);
              }}
            >
              {code}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
