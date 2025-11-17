import { useState } from "react";
import type { Beam } from "../types/beamTypes";
import { BeamsContext } from "./BeamsContext";

export function BeamsProvider({ children }: { children: React.ReactNode }) {
    const [beams, setBeams] = useState<Beam[]>([]);

    const getUniqueBeamId = () => {
        // When a beam is removed a id will be freed, this loop will therefore do the following
        // 1. If there is no id-gap then use the id beams.length
        //    * I do this by starting the loop at id beams.length, therefore if there is at least one
        //    * id-gap the id beams.length will be taken
        // 2. If there is a id-gap decrementally search till the gap is found and then return the gap-id
        for (let i = beams.length; i >= 0; i--) {
            let found = false;
            for (let j = 0; j < beams.length; j++) {
                if (beams[j].id == i) {
                    found = true;
                    continue;
                }
                return i;
            }
            if (!found) {
                return i;
            }
        }
        throw new Error("getUniqueBeamId failed to find a new uniqe id");
    };

    const addBeam = (beam: Beam) => {
        setBeams((beams) => [...beams, beam]);
    };

    return (
        <BeamsContext.Provider value={{ beams, setBeams, addBeam, getUniqueBeamId }}>{children}</BeamsContext.Provider>
    );
}
