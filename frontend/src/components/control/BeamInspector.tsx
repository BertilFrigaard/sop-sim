import { useEffect, useState } from "react";
import { useSelection } from "../../contexts/useSelection";
import { ForceInput } from "./inputs/ForceInput";
import { InertiaInput } from "./inputs/InertiaInput";
import type { Beam } from "../../types/beamTypes";

export function BeamInspector() {
    const [beam, setBeam] = useState<Beam | null>(null);
    const { getSelectedBeam } = useSelection();

    useEffect(() => {
        setBeam(getSelectedBeam());
    }, [getSelectedBeam]);

    return (
        <div>
            <h1>Beam Inspector (Beam ID: {beam ? beam.id : "Loading"})</h1>
            <div className="flex gap-5 p-5">
                <ForceInput />
                <InertiaInput />
            </div>
        </div>
    );
}
