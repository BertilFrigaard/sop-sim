import type { Beam } from "../../types/beamTypes";

export function getDefaultBeam(id: number) {
    return { id: id, F: 2000, E: 200, I: 10, L: 18 } as Beam;
}
