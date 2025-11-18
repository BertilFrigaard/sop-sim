import { useEffect, useMemo, useState } from "react";
import type { Beam, DataPoint } from "../../types/beamTypes";
import { Chart, type AxisOptions, type UserSerie } from "react-charts";
import { getDeflection } from "../../lib/physics/beamCalculations";
import { useBeams } from "../../contexts/useBeams";
import { useSelection } from "../../contexts/useSelection";
import { useGraphState } from "../../contexts/useGraphState";
import { getBeamKeyFromState } from "../../lib/utils/stateConverters";

const STEPS = 100;

export function ParamGraph() {
    const [series, setSeries] = useState<UserSerie<DataPoint>[]>([]);
    const [beamParam, setBeamParam] = useState<keyof Beam | null>(null);

    const { beams } = useBeams();
    const { paramBounds } = useSelection();
    const { graphState } = useGraphState();

    useEffect(() => {
        setBeamParam(getBeamKeyFromState(graphState));
    }, [graphState]);

    useEffect(() => {
        if (beamParam == null) {
            return;
        }
        const seriesBuild = [] as UserSerie<DataPoint>[];

        for (let i = 0; i < beams.length; i++) {
            const beam = beams[i];

            const increment = (paramBounds.upper - paramBounds.lower) / STEPS;
            const data = {
                label: "Beam " + beam.id,
                data: Array.from(
                    { length: STEPS },
                    (_, i) =>
                        ({
                            x: paramBounds.lower + increment * i,
                            y:
                                -1 *
                                getDeflection(
                                    beamParam == "L" ? paramBounds.lower + increment * i : beam.L,
                                    beamParam == "F" ? paramBounds.lower + increment * i : beam.F,
                                    beamParam == "E" ? paramBounds.lower + increment * i : beam.E,
                                    beamParam == "I" ? paramBounds.lower + increment * i : beam.I
                                ),
                        } as DataPoint)
                ),
            };
            seriesBuild.push(data);
        }

        setSeries(seriesBuild);
    }, [beams, beamParam, paramBounds]);

    const primaryAxis = useMemo((): AxisOptions<DataPoint> => ({ getValue: (point) => point.x }), []);
    const secondaryAxes = useMemo((): AxisOptions<DataPoint>[] => [{ getValue: (point) => point.y }], []);

    if (series.length == 0) {
        return (
            <div className="text-center h-full bg-gray-50 border-2 border-gray-200">
                <p className="pt-20 text-xl font-semibold">Tilføj en bjælke for at begynde</p>
            </div>
        );
    }

    if (beamParam == null) {
        return (
            <div className="text-center h-full bg-gray-50 border-2 border-gray-200">
                <p className="pt-20 text-xl font-semibold">Loader</p>
            </div>
        );
    }

    return (
        <Chart className="border-2 border-gray-200 bg-gray-50" options={{ data: series, primaryAxis, secondaryAxes }} />
    );
}
