import { useEffect, useMemo, useState } from "react";
import type { DataPoint } from "../../types/beamTypes";
import { Chart, type AxisOptions, type UserSerie } from "react-charts";
import { getDeflection } from "../../lib/physics/beamCalculations";
import { useBeams } from "../../contexts/useBeams";
import { useSelection } from "../../contexts/useSelection";

const STEPS = 100;

export function ParamGraph() {
    const [series, setSeries] = useState<UserSerie<DataPoint>[]>([]);

    const { beams } = useBeams();
    const { paramBounds } = useSelection();

    console.log("ParamBounds: ", paramBounds);

    useEffect(() => {
        const seriesBuild = [] as UserSerie<DataPoint>[];

        for (let i = 0; i < beams.length; i++) {
            const beam = beams[i];
            const data = {
                label: "Beam " + beam.id,
                data: Array.from(
                    { length: STEPS },
                    (_, i) =>
                        ({
                            x: (beam.L / STEPS) * i,
                            y: -1 * getDeflection((beam.L / STEPS) * i, beam.F, beam.E, beam.I, beam.L),
                        } as DataPoint)
                ),
            };
            seriesBuild.push(data);
        }

        setSeries(seriesBuild);
    }, [beams]);

    const primaryAxis = useMemo((): AxisOptions<DataPoint> => ({ getValue: (point) => point.x }), []);
    const secondaryAxes = useMemo((): AxisOptions<DataPoint>[] => [{ getValue: (point) => point.y }], []);
    if (series.length == 0) {
        return (
            <div className="text-center h-full bg-gray-50 border-2 border-gray-200">
                <p className="pt-20 text-xl font-semibold">Tilføj en bjælke for at begynde</p>
            </div>
        );
    }

    return (
        <Chart className="border-2 border-gray-200 bg-gray-50" options={{ data: series, primaryAxis, secondaryAxes }} />
    );
}
