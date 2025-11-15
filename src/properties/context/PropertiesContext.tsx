import { createContext } from "react";
import type { FilterInterface } from "./types/PropertiesContextTypes";

export const PropertiesContext = createContext<FilterInterface | null>(null);