import type React from "react";
import type { Beam } from "./beamTypes";

export type SelectionContextType = {
    selectedBeamId: number | null;
    setSelectedBeamId: (selectedBeamId: number | null) => void;
    getSelectedBeam: () => Beam | null;
    updateSelectedBeam: (beam: Beam) => void;
    paramBounds: ParamBounds;
    setParamBounds: React.Dispatch<React.SetStateAction<ParamBounds>>;
};

export type ParamBounds = {
    lower: number;
    upper: number;
};

export type BeamsContextType = {
    beams: Beam[];
    setBeams: React.Dispatch<React.SetStateAction<Beam[]>>;
    addBeam: (beam: Beam) => void;
    getUniqueBeamId: () => number;
};

export type GraphState = "XY" | "F_VMAX" | "E_VMAX" | "I_VMAX" | "L_VMAX";

export type GraphStateContextType = {
    graphState: GraphState;
    updateGraphState: (s: GraphState) => void;
};
