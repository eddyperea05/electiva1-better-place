import { useContext } from "react";
import { DetailContext } from "../context/DetailContext";

export const useDetailContext = () => {
  const context = useContext(DetailContext);
  if (!context) {
    throw new Error("useDetailContext debe de ser proporcionado por un DetailProvider");
  }
  return context;
};