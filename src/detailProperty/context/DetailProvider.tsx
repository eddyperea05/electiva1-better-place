import { useState, type ReactNode } from "react";
import { DetailContext } from "./DetailContext";
import type { property } from "../../ownerships/components/types/ownershipsPropertiesTypes";

export const DetailProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<property>();

  return (
    <DetailContext.Provider value={{ data, setData }}>
      {children}
    </DetailContext.Provider>
  );
};
