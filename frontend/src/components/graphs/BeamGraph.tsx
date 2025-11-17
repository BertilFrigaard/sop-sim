import { useEffect, useMemo, useState } from "react";
import type { BeamDataPoint } from "../../types/beamTypes";
import { Chart, type AxisOptions, type UserSerie } from "react-charts";
import { getDeflection } from "../../lib/physics/beamCalculations";
import { useBeams } from "../../contexts/useBeams";

const STEPS = 100;

export function BeamGraph() {
    const [series, setSeries] = useState<UserSerie<BeamDataPoint>[]>([]);

    const { beams } = useBeams();

    useEffect(() => {
        const seriesBuild = [] as UserSerie<BeamDataPoint>[];

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
                        } as BeamDataPoint)
                ),
            };
            seriesBuild.push(data);
        }

        setSeries(seriesBuild);
    }, [beams]);

    /* useEffect(() => {
        const steps = 1000;
        setDataPoints(
            Array.from(
                { length: steps },
                (_, i) => ({ x: (L / steps) * i, y: -1 * getDeflection((L / steps) * i, F, E, I, L) } as BeamDataPoint)
            )
        );
    }, [F, E, I, L]); */

    const primaryAxis = useMemo((): AxisOptions<BeamDataPoint> => ({ getValue: (point) => point.x }), []);
    const secondaryAxes = useMemo((): AxisOptions<BeamDataPoint>[] => [{ getValue: (point) => point.y }], []);
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
