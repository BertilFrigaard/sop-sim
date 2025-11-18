import "./App.css";
import { BeamInspector } from "./components/control/BeamInspector";
import { BeamList } from "./components/control/BeamList";
import { ViewSelector } from "./components/control/ViewSelector";
import { BeamGraph } from "./components/graphs/BeamGraph";
import { ParamGraph } from "./components/graphs/ParamGraph";
import { BeamsProvider } from "./contexts/BeamsProvider";
import { GraphStateProvider } from "./contexts/GraphStateProvier";
import { SelectionProvider } from "./contexts/SelectionProvider";
import { useGraphState } from "./contexts/useGraphState";
import { useSelection } from "./contexts/useSelection";

function AppContent() {
    // App content is extracted to allow for using contexts
    const { selectedBeamId } = useSelection();
    const { graphState } = useGraphState();

    const getGraph = () => {
        switch (graphState) {
            case "XY":
                return <BeamGraph />;
            case "F_VMAX":
                return <ParamGraph />;
            case "E_VMAX":
                throw new Error("NOT IMPLEMENTED");
            case "I_VMAX":
                throw new Error("NOT IMPLEMENTED");
            case "L_VMAX":
                throw new Error("NOT IMPLEMENTED");
        }
    };

    return (
        <div className="p-2">
            <div className="h-150 flex space-x-2">
                <div className="h-full w-full flex-2">{getGraph()}</div>
                <div className="h-full w-full min-w-50 flex-1">
                    <BeamList />
                </div>
            </div>
            <div className="flex space-x-2 mt-2">
                <div className="flex-1">
                    <ViewSelector />
                </div>
                <div className="flex-5">
                    <div>{selectedBeamId !== null && <BeamInspector />}</div>
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        // SelectionProvider must be inside BeamsProvider
        // GraphStateProvider must be inside SelectionProvider
        <BeamsProvider>
            <SelectionProvider>
                <GraphStateProvider>
                    <AppContent />
                </GraphStateProvider>
            </SelectionProvider>
        </BeamsProvider>
    );
}

export default App;
