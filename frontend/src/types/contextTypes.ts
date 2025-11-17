import type { Beam } from "./beamTypes";

export type SelectionContextType = {
    selectedBeamId: number | null;
    setSelectedBeamId: (selectedBeamId: number | null) => void;
    getSelectedBeam: () => Beam | null;
};

export type BeamsContextType = {
    beams: Beam[];
    setBeams: (beams: Beam[]) => void;
    addBeam: (beam: Beam) => void;
    getUniqueBeamId: () => number;
};
