import { ForceInput } from "./inputs/ForceInput";
import { InertiaInput } from "./inputs/InertiaInput";

export function BeamInspector() {
    return (
        <div>
            <h1>Beam Inspector</h1>
            <div className="flex gap-5 p-5">
                <ForceInput />
                <InertiaInput />
            </div>
        </div>
    );
}
