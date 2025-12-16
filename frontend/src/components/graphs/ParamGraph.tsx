import { useEffect, useMemo, useState } from "react";
import type { Beam, DataPoint } from "../../types/beamTypes";
import { type AxisOptions, type UserSerie } from "react-charts";
import { getDeflection } from "../../lib/physics/beamCalculations";
import { useBeams } from "../../contexts/useBeams";
import { useSelection } from "../../contexts/useSelection";
import { useGraphState } from "../../contexts/useGraphState";
import { getBeamKeyFromState } from "../../lib/utils/stateConverters";
import { formatElasticity, formatInertia, formatMeters, formatNewtons } from "../../lib/physics/unitFormatters";
import { Graph } from "./Graph";
import { STEPS } from "../../lib/Constants";

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

        // Liste af serie af datapunkter
        // Cast til type som er kompatibel med react-charts
        const seriesBuild = [] as UserSerie<DataPoint>[];

        // Lav en serie af datapunkter for hver bjælke
        for (let i = 0; i < beams.length; i++) {
            const beam = beams[i];

            // Bestem incrementet baseret på den variables interval
            const increment = (paramBounds.upper - paramBounds.lower) / STEPS;
            const data = {
                label: "Bjælke " + beam.id,
                data: Array.from(
                    { length: STEPS },
                    (_, i) =>
                        ({
                            x: paramBounds.lower + increment * i,
                            y:
                                // Gang med -1 for at vende y-aksen
                                // Tal formatering sker i unitFormatters MANGLER
                                -1 *
                                // Hold 3 parametrer konstante, og brug den sidste som variabel
                                // Undlad parameter L da funktionen så returnere maksimal nedbøjning
                                getDeflection(
                                    beamParam == "L" ? paramBounds.lower + increment * i : beam.L,
                                    beamParam == "F" ? paramBounds.lower + increment * i : beam.F,
                                    beamParam == "E" ? paramBounds.lower + increment * i : beam.E,
                                    beamParam == "I" ? paramBounds.lower + increment * i : beam.I
                                ),
                        } as DataPoint)
                ),
            };

            // Tilføj serie af datapunkter til liste af serier
            seriesBuild.push(data);
        }

        setSeries(seriesBuild);
    }, [beams, beamParam, paramBounds]);

    const primaryAxis = useMemo(
        (): AxisOptions<DataPoint> => ({
            getValue: (point: DataPoint) => point.x,
            formatters:
                beamParam === "F"
                    ? {
                          scale: formatNewtons,
                          tooltip: formatNewtons,
                      }
                    : beamParam === "E"
                    ? {
                          scale: formatElasticity,
                          tooltip: formatElasticity,
                      }
                    : beamParam === "I"
                    ? {
                          scale: formatInertia,
                          tooltip: formatInertia,
                      }
                    : beamParam === "L"
                    ? {
                          scale: formatMeters,
                          tooltip: formatMeters,
                      }
                    : undefined,
        }),
        [beamParam]
    );

    const secondaryAxes = useMemo(
        (): AxisOptions<DataPoint>[] => [
            { getValue: (point) => point.y, formatters: { scale: formatMeters, tooltip: formatMeters } },
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

    if (beamParam == null) {
        return (
            <div className="text-center h-full bg-gray-50 border-2 border-gray-200">
                <p className="pt-20 text-xl font-semibold">Loader</p>
            </div>
        );
    }

    return (
        <Graph
            series={series}
            primaryAxis={primaryAxis}
            secondaryAxes={secondaryAxes}
            primaryAxisTitle={
                beamParam === "F"
                    ? "Belastning F"
                    : beamParam === "E"
                    ? "Elasticitetsmodul E"
                    : beamParam === "I"
                    ? "Inertimoment I"
                    : beamParam === "L"
                    ? "Længde L"
                    : "Undefined"
            }
            secondaryAxesTitle="Maksimal Nedbøjning v_max"
            styles="-left-22"
        />
    );
}
