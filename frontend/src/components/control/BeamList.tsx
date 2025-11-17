import { useSelection } from "../../contexts/useSelection";
import { getDefaultBeam } from "../../lib/physics/beamDefaults";
import { useBeams } from "../../contexts/useBeams";

export function BeamList() {
    const { setSelectedBeamId } = useSelection();
    const { beams, addBeam, getUniqueBeamId } = useBeams();

    return (
        <div className="bg-gray-50 border-2 border-gray-200 p-5 h-full">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold">Bjælke Liste</h2>
                <button
                    className="bg-white border-2 border-gray-200 px-5 rounded-md cursor-pointer hover:scale-98"
                    onClick={() => {
                        const beamId = getUniqueBeamId();
                        addBeam(getDefaultBeam(beamId));
                        setSelectedBeamId(beamId);
                    }}
                >
                    Tilføj ny bjælke
                </button>
            </div>
            <ul className="mt-5 space-y-2 overflow-y-scroll max-h-[90%]">
                {beams.map((beam) => (
                    <li
                        key={beam.id}
                        className="bg-white border-2 border-gray-200 px-5 rounded-md cursor-pointer hover:border-gray-300"
                        onClick={() => {
                            setSelectedBeamId(beam.id);
                        }}
                    >
                        Beam {beam.id} F: {beam.F} E: {beam.E} I: {beam.I} L : {beam.L}
                    </li>
                ))}
            </ul>
        </div>
    );
}
