import { createContext } from "react";
import type { FastFilter } from "./types/PropertiesContextTypes";

export const PropertiesContext = createContext<FastFilter | null>(null);