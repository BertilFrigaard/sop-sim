import { createContext } from "react";
import type { GraphStateContextType } from "../types/contextTypes";

export const GraphStateContext = createContext<GraphStateContextType | null>(null);
