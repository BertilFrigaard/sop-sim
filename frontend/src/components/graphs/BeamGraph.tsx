import { useEffect, useMemo, useState } from "react";
import type { DataPoint } from "../../types/beamTypes";
import { type AxisOptions, type UserSerie } from "react-charts";
import { getDeflection } from "../../lib/physics/beamCalculations";
import { useBeams } from "../../contexts/useBeams";
import { formatMeters } from "../../lib/physics/unitFormatters";
import { Graph } from "./Graph";

const STEPS = 100;

export function BeamGraph() {
    const [series, setSeries] = useState<UserSerie<DataPoint>[]>([]);

    const { beams } = useBeams();

    useEffect(() => {
        // Liste af serie af datapunkter
        // Cast til type som er kompatibel med react-charts
        const seriesBuild = [] as UserSerie<DataPoint>[];

        // Lav en serie af datapunkter for hver bjælke
        for (let i = 0; i < beams.length; i++) {
            const beam = beams[i];

            // lav serie af datapunkter med x som variabel,
            // og F, E, I og L som konstanter
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

            // Tilføj serie af datapunkter til liste af serier
            seriesBuild.push(data);
        }

        setSeries(seriesBuild);
    }, [beams]);

    const primaryAxis = useMemo(
        (): AxisOptions<DataPoint> => ({
            getValue: (point) => point.x,
            formatters: {
                scale: formatMeters,
                tooltip: formatMeters,
            },
        }),
        []
    );
    const secondaryAxes = useMemo(
        (): AxisOptions<DataPoint>[] => [
            {
                getValue: (point) => point.y,
                formatters: {
                    scale: formatMeters,
                    tooltip: formatMeters,
                },
            },
        ],
        []
    );

    if (series.length == 0) {
        return (
            <div className="text-center h-full bg-gray-50 border-2 border-gray-200">
                <p className="pt-20 text-xl font-semibold">Tilføj en bjælke for at begynde</p>
            </div>
        );
    }

    return (
        <Graph
            series={series}
            primaryAxis={primaryAxis}
            secondaryAxes={secondaryAxes}
            primaryAxisTitle="Strækning x"
            secondaryAxesTitle="Nedbøjning v"
            styles="-left-6"
        />
    );
}
