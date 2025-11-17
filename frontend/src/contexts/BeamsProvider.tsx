import { useState } from "react";
import type { Beam } from "../types/beamTypes";
import { BeamsContext } from "./BeamsContext";

export function BeamsProvider({ children }: { children: React.ReactNode }) {
    const [beams] = useState<Beam[]>([]);

    return <BeamsContext value={beams}>{children}</BeamsContext>;
}
