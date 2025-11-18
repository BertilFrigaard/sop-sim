import { useEffect, useState } from "react";
import { useSelection } from "../../contexts/useSelection";
import type { Beam } from "../../types/beamTypes";
import { BeamInput } from "./inputs/BeamInput";
import { defaultElasticModulus, defaultInertias } from "../../lib/physics/beamDefaults";
import { useBeams } from "../../contexts/useBeams";

export function BeamInspector() {
    const [beam, setBeam] = useState<Beam | null>(null);
    const { getSelectedBeam, setSelectedBeamId } = useSelection();
    const { setBeams } = useBeams();

    useEffect(() => {
        setBeam(getSelectedBeam());
    }, [getSelectedBeam]);

    return (
        <div className="bg-gray-50 border-2 border-gray-200 p-5 w-full">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold">Beam Inspector (Beam ID: {beam ? beam.id : "Loading"})</h2>
                {beam && (
                    <button
                        className="bg-white border-2 border-gray-200 px-5 rounded-md cursor-pointer hover:scale-98"
                        onClick={() => {
                            setSelectedBeamId(null);
                            setBeams((prev) => {
                                return prev.filter((v) => v.id !== beam.id);
                            });
                        }}
                    >
                        Slet bjælke
                    </button>
                )}
            </div>
            <div className="flex gap-5 pt-5 flex-wrap">
                <BeamInput title="F | Belastning [N]" param="F" options={null} />
                <BeamInput title="L | Længde [M]" param="L" options={null} />
                <BeamInput title="E | Elasticitetsmodul [Pa]" param="E" options={defaultElasticModulus} />
                <BeamInput title="I | Inertimoment [kg*m^4]" param="I" options={defaultInertias} />
            </div>
        </div>
    );
}
