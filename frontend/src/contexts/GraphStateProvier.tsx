import { useState } from "react";
import { GraphStateContext } from "./GraphStateContext";
import type { GraphState } from "../types/contextTypes";
import { useSelection } from "./useSelection";
import { defaultElasticModulus, defaultInertias } from "../lib/physics/beamDefaults";

export function GraphStateProvider({ children }: { children: React.ReactNode }) {
    const [graphState, setGraphState] = useState<GraphState>("XY");

    const { setParamBounds } = useSelection();

    const updateGraphState = (s: GraphState) => {
        switch (s) {
            case "F_VMAX":
                setParamBounds({ lower: 1, upper: 4000 });
                break;
            case "E_VMAX":
                setParamBounds({ lower: defaultElasticModulus[4].value, upper: defaultElasticModulus[0].value });
                break;
            case "I_VMAX":
                setParamBounds({ lower: defaultInertias[4].value, upper: defaultInertias[0].value });
                break;
            case "L_VMAX":
                setParamBounds({ lower: 1, upper: 20 });
                break;
        }

        setGraphState(s);
    };

    return <GraphStateContext.Provider value={{ graphState, updateGraphState }}>{children}</GraphStateContext.Provider>;
}
