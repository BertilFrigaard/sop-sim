import { useState } from "react";
import { SelectionContext } from "./SelectionContext";
import { useBeams } from "./useBeams";
import type { Beam } from "../types/beamTypes";

export function SelectionProvider({ children }: { children: React.ReactNode }) {
    const [selectedBeamId, setSelectedBeamId] = useState<number | null>(null);
    const { beams, setBeams } = useBeams();

    const getSelectedBeam = () => {
        const found = beams.find((beam) => beam.id == selectedBeamId);

        if (!found) {
            setSelectedBeamId(null);
            return null;
        }

        return found;
    };

    const updateSelectedBeam = (beam: Beam) => {
        setBeams((prev) => {
            return prev.map((b) => (b.id == beam.id ? beam : b));
        });
    };

    return (
        <SelectionContext.Provider value={{ selectedBeamId, setSelectedBeamId, getSelectedBeam, updateSelectedBeam }}>
            {children}
        </SelectionContext.Provider>
    );
}
