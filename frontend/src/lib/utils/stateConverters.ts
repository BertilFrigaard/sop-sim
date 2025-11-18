import type { Beam } from "../../types/beamTypes";
import type { GraphState } from "../../types/contextTypes";

export function getBeamKeyFromState(graphState: GraphState): keyof Beam | null {
    switch (graphState) {
        case "XY":
            return null;
        case "F_VMAX":
            return "F";
        case "E_VMAX":
            return "E";
        case "I_VMAX":
            return "I";
        case "L_VMAX":
            return "L";
    }
}
