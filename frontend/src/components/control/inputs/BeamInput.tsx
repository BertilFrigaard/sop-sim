import { useEffect, useState } from "react";
import { useSelection } from "../../../contexts/useSelection";
import type { Beam } from "../../../types/beamTypes";
import type { InputOptions } from "../../../types/componentTypes";
import { BaseInput } from "./BaseInput";

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

    return <BaseInput title={title} options={options} value={value} updateValue={updateValue} />;
}
