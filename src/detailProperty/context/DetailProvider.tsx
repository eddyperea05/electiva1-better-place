import { useState, type ReactNode } from "react";
import { DetailContext } from "./DetailContext";

//import tipos
import type { PropiedadInterface } from "../../properties/types/propertyType";

export const DetailProvider = ({ children }: { children: ReactNode }) => {

  //estado de los datos de las propiedades
  const [data, setData] = useState<PropiedadInterface>();

  return (
    <DetailContext.Provider value={{ data, setData }}>
      {children}
    </DetailContext.Provider>
  );
};
