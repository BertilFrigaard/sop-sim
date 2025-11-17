import type React from "react";
import type { Beam } from "./beamTypes";

export type SelectionContextType = {
    selectedBeamId: number | null;
    setSelectedBeamId: (selectedBeamId: number | null) => void;
    getSelectedBeam: () => Beam | null;
    updateSelectedBeam: (beam: Beam) => void;
};

export type BeamsContextType = {
    beams: Beam[];
    setBeams: React.Dispatch<React.SetStateAction<Beam[]>>;
    addBeam: (beam: Beam) => void;
    getUniqueBeamId: () => number;
};
