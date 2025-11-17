import { useSelection } from "../../contexts/useSelection";
import { getDefaultBeam } from "../../lib/physics/beamDefaults";
import { useBeams } from "../../contexts/useBeams";

export function BeamList() {
    const { setSelectedBeamId } = useSelection();
    const { beams, addBeam, getUniqueBeamId } = useBeams();

    return (
        <div>
            <h2 className="text-2xl font-bold">Beams</h2>
            <button
                className="bg-teal-300 px-5 rounded-lg"
                onClick={() => {
                    const beamId = getUniqueBeamId();
                    addBeam(getDefaultBeam(beamId));
                    setSelectedBeamId(beamId);
                }}
            >
                Create New Beam
            </button>
            <ul>
                {beams.map((beam) => (
                    <li
                        key={beam.id}
                        className="bg-teal-100 m-2 px-3 py-1 rounded-lg cursor-pointer"
                        onClick={() => {
                            setSelectedBeamId(beam.id);
                        }}
                    >
                        {beam.id}: {beam.F}
                    </li>
                ))}
            </ul>
        </div>
    );
}
