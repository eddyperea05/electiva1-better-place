import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const userDataContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "UserContext debe de ser proporcionado por un UserProvider"
    );
  }
  return context;
};
