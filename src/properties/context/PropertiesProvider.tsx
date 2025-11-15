import { useState, type ReactNode } from "react";
import { PropertiesContext } from "./PropertiesContext";
import type { Filter } from "./types/PropertiesContextTypes";

export const PropertiesProvider = ({ children }: { children: ReactNode }) => {
  //Estado para los filtros rápidos
  const [typeFastFilter, setFastFilter] = useState<Filter>({
    sortBy: undefined,
    amountStuffs: {
      habitaciones: undefined,
      baños: undefined,
      parqueaderos: undefined,
    },
    budgetRange: {
      min: undefined,
      max: undefined,
    },
    metersRange: {
      min: undefined,
      max: undefined,
    },
  });

  return (
    <PropertiesContext.Provider value={{ typeFastFilter, setFastFilter }}>
      {children}
    </PropertiesContext.Provider>
  );
};
