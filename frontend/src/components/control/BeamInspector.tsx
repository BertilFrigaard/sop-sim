import { useSelection } from "../../contexts/useSelection";
import { BeamInput } from "./inputs/BeamInput";
import { defaultElasticModulus, defaultInertias } from "../../lib/physics/beamDefaults";
import { useBeams } from "../../contexts/useBeams";
import { getDeflection } from "../../lib/physics/beamCalculations";
import { STEPS } from "../../lib/Constants";
import { download, generateCsv } from "export-to-csv";

export function BeamInspector() {
    const { getSelectedBeam, setSelectedBeamId } = useSelection();
    const { setBeams } = useBeams();

    const beam = getSelectedBeam();

    if (!beam) {
        return null;
    }

    return (
        <div className="bg-gray-50 border-2 border-gray-200 p-5 w-full">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold">Parametre (Bjælke ID: {beam.id})</h2>
                <div className="space-x-5">
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
                    <button
                        className="bg-white border-2 border-gray-200 px-5 rounded-md cursor-pointer hover:scale-98"
                        onClick={() => {
                            const data = Array.from({ length: STEPS }, (_, i) => ({
                                x: (beam.L / STEPS) * i,
                                y: -1 * getDeflection((beam.L / STEPS) * i, beam.F, beam.E, beam.I, beam.L),
                            }));
                            const csv = generateCsv({ useKeysAsHeaders: true })(data);
                            download({ useKeysAsHeaders: true, filename: "Bjælke_" + beam.id })(csv);
                        }}
                    >
                        Eksporter data
                    </button>
                </div>
            </div>
            <div className="flex gap-5 pt-5 flex-wrap">
                <BeamInput title="F | Belastning [N]" param="F" options={null} />
                <BeamInput title="L | Længde [M]" param="L" options={null} />
                <BeamInput title="E | Elasticitetsmodul [Pa]" param="E" options={defaultElasticModulus} />
                <BeamInput title="I | Inertimoment [m^4]" param="I" options={defaultInertias} />
            </div>
        </div>
    );
}
