import { useContext } from "react";
import { DetailContext } from "../context/DetailContext";

export const useDetailContext = () => {
  const detailContext = useContext(DetailContext);
  if (!detailContext) {
    throw new Error("useDetailContext debe de ser proporcionado por un DetailProvider");
  }
  return detailContext;
};