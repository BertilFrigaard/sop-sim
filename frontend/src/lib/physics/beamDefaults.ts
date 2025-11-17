import type { Beam } from "../../types/beamTypes";

export function getDefaultBeam(id: number) {
    return { id: id, F: 2000, E: 200, I: 1.673e-5, L: 18 } as Beam;
}
