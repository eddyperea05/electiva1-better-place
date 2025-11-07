import { createContext } from "react";
import type { userDataContext } from "./types/userContextType";

export const UserContext = createContext<userDataContext | null>(null);