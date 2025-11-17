import { createContext } from "react";
import type { SelectionContextType } from "../types/contextTypes";

export const SelectionContext = createContext<SelectionContextType | null>(null);
