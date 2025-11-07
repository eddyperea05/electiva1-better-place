import type { ReactNode } from "react";
import { userDataContext } from "../authentication/hooks/userDataContext";
import { Navigate } from "react-router-dom";

export const PrivatePolicityMyLessesRouter = ({
  children,
}: {
  children: ReactNode;
}) => {
  /* Este componente solo sirve para que el usuario no pueda redirecionar por la url 
    a las las propiedades que tiene arrendas */

  const { userData } = userDataContext();

  return userData.isOwner ? children : <Navigate to="/properties"/>;
};
