import { useContext, useState } from "react";
import { BeamsContext } from "../../contexts/BeamsContext";
import { ForceInput } from "./inputs/ForceInput";
import { InertiaInput } from "./inputs/InertiaInput";

export function BeamList() {
    const [addBeam, setAddBeam] = useState(false);
    const beams = useContext(BeamsContext);

    return (
        <div>
            <h2 className="text-2xl font-bold">Beams</h2>
            <button
                className="bg-teal-300 px-5 rounded-lg"
                onClick={() => {
                    setAddBeam(!addBeam);
                }}
            >
                Add
            </button>
            {addBeam && (
                <div>
                    <ForceInput />
                    <InertiaInput />
                    <button
                        className="bg-teal-100 px-5 rounded-lg"
                        onClick={() => {
                            console.log("CLICK");
                        }}
                    >
                        Add Beam
                    </button>
                </div>
            )}
            <ul>
                {beams.map((beam, i) => (
                    <li>
                        {i}: {beam.F}
                    </li>
                ))}
            </ul>
        </div>
    );
}
