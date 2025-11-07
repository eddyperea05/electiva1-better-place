import { useEffect, useState, type ReactNode } from "react";
import { UserContext } from "./UserContext";
import type { userDataContext } from "./types/userContextType";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  //Hook para enviar la información del usuario
  const [userData, setUserData] = useState<userDataContext>();

  // Cada vez que se recarga la página se traen lso datos del usuario
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  // Cada vez que se actualizán los datos del usuario se envian al local storage
  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
