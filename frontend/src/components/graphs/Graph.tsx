import { Chart, type AxisOptions, type UserSerie } from "react-charts";
import type { DataPoint } from "../../types/beamTypes";

export function Graph({
    series,
    primaryAxis,
    secondaryAxes,
    primaryAxisTitle = "X-akse",
    secondaryAxesTitle = "Y-akse",
    styles = "",
}: {
    series: UserSerie<DataPoint>[];
    primaryAxis: AxisOptions<DataPoint>;
    secondaryAxes: AxisOptions<DataPoint>[];
    primaryAxisTitle?: string;
    secondaryAxesTitle?: string;
    styles?: string;
}) {
    return (
        <div className="border-2 border-gray-200 bg-gray-50 h-full flex flex-col pr-5 pt-2">
            <div className="flex-1 flex relative pl-12">
                <div className={"absolute top-1/2 transform -translate-y-1/2 " + styles}>
                    <p className="transform -rotate-90 text-lg text-gray-900">{secondaryAxesTitle}</p>
                </div>
                <div className="flex-1 h-full">
                    <Chart options={{ data: series, primaryAxis, secondaryAxes }} />
                </div>
            </div>
            <div className="text-center pb-2">
                <p className="text-lg text-gray-900">{primaryAxisTitle}</p>
            </div>
        </div>
    );
}
