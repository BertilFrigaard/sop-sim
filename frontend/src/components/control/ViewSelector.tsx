import { useGraphState } from "../../contexts/useGraphState";
import type { View } from "../../types/componentTypes";

const VIEWS: View[] = [
    { name: "x/y", graphState: "XY" },
    { name: "F/vmax", graphState: "F_VMAX" },
    { name: "E/vmax", graphState: "E_VMAX" },
    { name: "I/vmax", graphState: "I_VMAX" },
    { name: "L/vmax", graphState: "L_VMAX" },
];

export function ViewSelector() {
    const { graphState, updateGraphState } = useGraphState();
    return (
        <div className="bg-gray-50 border-2 border-gray-200 p-5">
            <h2 className="text-2xl font-bold">Graf Type</h2>
            <div className="mt-5 space-y-2">
                {VIEWS.map((v) => (
                    <button
                        key={v.graphState}
                        className={
                            "border-2 border-gray-200 px-5 rounded-md cursor-pointer hover:scale-98 w-full " +
                            (graphState == v.graphState ? "bg-amber-50" : "bg-white")
                        }
                        onClick={() => {
                            updateGraphState(v.graphState);
                        }}
                    >
                        {v.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
