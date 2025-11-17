import { createContext } from "react";
import type { Beam } from "../types/beamTypes";

export const BeamsContext = createContext<Beam[]>([]);
