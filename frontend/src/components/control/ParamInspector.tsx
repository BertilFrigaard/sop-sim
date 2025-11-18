import { useGraphState } from "../../contexts/useGraphState";
import { useEffect, useState } from "react";
import type { Beam } from "../../types/beamTypes";
import { getBeamKeyFromState } from "../../lib/utils/stateConverters";
import { ParamBoundInput } from "./inputs/ParamBoundInput";
export function ParamInspector() {
    const [beamParam, setBeamParam] = useState<keyof Beam | null>(null);
    const { graphState } = useGraphState();

    useEffect(() => {
        const param = getBeamKeyFromState(graphState);

        if (param == null) {
            return;
        }

        setBeamParam(param);
    }, [graphState]);

    return (
        <div className="bg-gray-50 border-2 border-gray-200 p-5">
            <h2 className="text-2xl font-bold">Param Inspector (Param: {beamParam ? beamParam : "?"})</h2>
            <div className="space-y-5 p-5">
                {beamParam ? (
                    <>
                        <ParamBoundInput title="Øvre Loft" param={beamParam} bound="upper" />
                        <ParamBoundInput title="Nedre Loft" param={beamParam} bound="lower" />
                    </>
                ) : (
                    <h1 className="pt-20 text-xl font-semibold">Loading</h1>
                )}
            </div>
        </div>
    );
}
