import { createContext } from "react";
import type { DetailContextData } from "./types/detailContextTypes";

export const DetailContext = createContext<DetailContextData | null>(null);