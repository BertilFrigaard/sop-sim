import { useEffect, useMemo, useState } from "react";
import type { BeamDataPoint } from "../../types/beamTypes";
import { Chart, type AxisOptions } from "react-charts";
import { getDeflection } from "../../lib/physics/beamCalculations";

export function BeamGraph({ F, E, I, L }: { F: number; E: number; I: number; L: number }) {
    const [dataPoints, setDataPoints] = useState<BeamDataPoint[]>([]);

    useEffect(() => {
        const steps = 1000;
        setDataPoints(
            Array.from(
                { length: steps },
                (_, i) => ({ x: (L / steps) * i, y: -1 * getDeflection((L / steps) * i, F, E, I, L) } as BeamDataPoint)
            )
        );
    }, [F, E, I, L]);

    const primaryAxis = useMemo((): AxisOptions<BeamDataPoint> => ({ getValue: (point) => point.x }), []);
    const secondaryAxes = useMemo((): AxisOptions<BeamDataPoint>[] => [{ getValue: (point) => point.y }], []);
    return (
        <>
            {dataPoints.length !== 0 && (
                <Chart options={{ data: [{ label: "test", data: dataPoints }], primaryAxis, secondaryAxes }} />
            )}
        </>
    );
}
