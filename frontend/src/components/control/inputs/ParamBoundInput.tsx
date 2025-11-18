import { BaseInput } from "./BaseInput";
import type { Beam } from "../../../types/beamTypes";
import { useSelection } from "../../../contexts/useSelection";
import type { ParamBounds } from "../../../types/contextTypes";
import { defaultElasticModulus, defaultInertias } from "../../../lib/physics/beamDefaults";

export function ParamBoundInput({
    title,
    param,
    bound,
}: {
    title: string;
    param: keyof Beam;
    bound: keyof ParamBounds;
}) {
    const { paramBounds, setParamBounds } = useSelection();

    const updateValue = (v: number) => {
        setParamBounds((prev) => {
            return { ...prev, [bound]: v };
        });
    };

    const getOptions = () => {
        switch (param) {
            case "E":
                return defaultElasticModulus;
            case "I":
                return defaultInertias;
            default:
                return null;
        }
    };

    return <BaseInput title={title} options={getOptions()} value={paramBounds[bound]} updateValue={updateValue} />;
}
