import { useContext } from "react";
import { PropertiesContext } from "../../context/PropertiesContext";

export const useDataPropertiesContext = () => {
  const context = useContext(PropertiesContext);
  if (!context) {
    throw new Error(
      "useDataPropertiesContext debe de ser proporcionado por un PropertiesProvider"
    );
  }
  return context;
};
