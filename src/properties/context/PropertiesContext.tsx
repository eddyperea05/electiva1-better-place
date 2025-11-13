import { createContext } from "react";
import type { FilterType } from "./types/PropertiesContextTypes";

export const PropertiesContext = createContext<FilterType | null>(null);