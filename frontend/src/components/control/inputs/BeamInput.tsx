import { useEffect, useState } from "react";
import { useSelection } from "../../../contexts/useSelection";
import type { Beam } from "../../../types/beamTypes";
import type { InputOptions } from "../../../types/componentTypes";

export function BeamInput({
    title,
    param,
    options,
}: {
    title: string;
    param: keyof Beam;
    options: InputOptions | null;
}) {
    const [value, setValue] = useState(0);
    const { getSelectedBeam, updateSelectedBeam } = useSelection();

    const selectedBeam = getSelectedBeam();

    useEffect(() => {
        if (!selectedBeam) {
            throw new Error(
                "getSelectedBeam returned no beam inside input. Input components should only be loaded when selectedBeam != null"
            );
        }
        setValue(selectedBeam[param]);
    }, [selectedBeam, param]);

    const updateValue = (newValue: number) => {
        setValue(newValue);
        if (!selectedBeam) {
            throw new Error(
                "getSelectedBeam returned no beam inside input. Input components should only be loaded when selectedBeam != null"
            );
        }
        selectedBeam[param] = newValue;
        updateSelectedBeam(selectedBeam);
    };

    return (
        <div className="bg-white p-2 rounded-md border-2 border-gray-200 space-y-2">
            <p className="font-bold">{title}</p>
            {options && (
                <select
                    className="block border-2 border-gray-200 rounded-md"
                    value={value}
                    onChange={(event) => {
                        updateValue(Number(event.target.value));
                    }}
                >
                    {options.map((v) => (
                        <option key={v.name} value={v.value}>
                            {v.name}
                        </option>
                    ))}
                    {!options.find((v) => v.value == value) && <option value={value}>Brugerdefineret</option>}
                </select>
            )}
            <input
                className="border-2 border-gray-200 rounded-md w-full"
                type="number"
                value={value}
                onChange={(event) => {
                    updateValue(Number(event.target.value));
                }}
            />
        </div>
    );
}
