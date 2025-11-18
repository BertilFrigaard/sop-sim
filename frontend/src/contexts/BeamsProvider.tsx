import { useState } from "react";
import type { Beam } from "../types/beamTypes";
import { BeamsContext } from "./BeamsContext";

export function BeamsProvider({ children }: { children: React.ReactNode }) {
    const [beams, setBeams] = useState<Beam[]>([]);

    const getUniqueBeamId = () => {
        const ids = beams.map((beam) => {
            return beam.id;
        });

        // if beams ids are still chronological then id beams.length will be free
        // Otherwise search for the id that is unused and return that
        for (let i = beams.length; i >= 0; i--) {
            if (ids.includes(i)) {
                continue;
            } else {
                return i;
            }
        }
        // Should never happen
        throw new Error("getUniqueBeamId failed to find a new uniqe id");
    };

    const addBeam = (beam: Beam) => {
        setBeams((beams) => [...beams, beam]);
    };

    return (
        <BeamsContext.Provider value={{ beams, setBeams, addBeam, getUniqueBeamId }}>{children}</BeamsContext.Provider>
    );
}
