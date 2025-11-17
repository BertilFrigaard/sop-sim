import { useState } from "react";
import { SelectionContext } from "./SelectionContext";
import { useBeams } from "./useBeams";

export function SelectionProvider({ children }: { children: React.ReactNode }) {
    const [selectedBeamId, setSelectedBeamId] = useState<number | null>(null);
    const { beams } = useBeams();

    const getSelectedBeam = () => {
        const found = beams.find((beam) => beam.id == selectedBeamId);

        if (!found) {
            setSelectedBeamId(null);
            return null;
        }

        return found;
    };

    return (
        <SelectionContext.Provider value={{ selectedBeamId, setSelectedBeamId, getSelectedBeam }}>
            {children}
        </SelectionContext.Provider>
    );
}
