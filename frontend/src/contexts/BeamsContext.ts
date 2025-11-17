import { createContext } from "react";
import type { BeamsContextType } from "../types/contextTypes";

export const BeamsContext = createContext<BeamsContextType | null>(null);
