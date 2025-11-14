import { useEffect, useState, type ReactNode } from "react";
import { DetailContext } from "./DetailContext";

//import tipos
import type { PropiedadInterface } from "../../properties/types/propertyType";

export const DetailProvider = ({ children }: { children: ReactNode }) => {
  //estado de los datos de las propiedades
  const [data, setData] = useState<PropiedadInterface | undefined>(() => {
    const storedData = localStorage.getItem("detailData");
    return storedData ? JSON.parse(storedData) : undefined;
  });

  useEffect(() => {
    if (data) {
      localStorage.setItem("detailData", JSON.stringify(data));
    }
  }, [data]);

  return (
    <DetailContext.Provider value={{ data, setData }}>
      {children}
    </DetailContext.Provider>
  );
};
