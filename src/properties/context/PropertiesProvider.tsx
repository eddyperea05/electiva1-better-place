import { useState, type ReactNode } from "react";
import { PropertiesContext } from "./PropertiesContext";
import type { FastFilter } from "./types/PropertiesContextTypes";

export const PropertiesProvider = ({ children }: { children: ReactNode }) => {
  //Estado para los filtros rápidos
  const [typeFastFilter, setFastFilter] = useState<FastFilter>();

  return (
    <PropertiesContext.Provider
      value={{ typeFastFilter, setFastFilter }}
    >
      {children}
    </PropertiesContext.Provider>
  );
};
