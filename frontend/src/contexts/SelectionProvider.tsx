import { useState } from "react";
import { SelectionContext } from "./SelectionContext";
import { useBeams } from "./useBeams";
import type { Beam } from "../types/beamTypes";
import type { ParamBounds } from "../types/contextTypes";

export function SelectionProvider({ children }: { children: React.ReactNode }) {
    const [selectedBeamId, setSelectedBeamId] = useState<number | null>(null);
    const [paramBounds, setParamBounds] = useState<ParamBounds>({ lower: 0, upper: 1 });
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
        <SelectionContext.Provider
            value={{
                selectedBeamId,
                setSelectedBeamId,
                getSelectedBeam,
                updateSelectedBeam,
                paramBounds,
                setParamBounds,
            }}
        >
            {children}
        </SelectionContext.Provider>
    );
}
