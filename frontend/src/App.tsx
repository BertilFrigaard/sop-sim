import "./App.css";
import { BeamInspector } from "./components/control/BeamInspector";
import { BeamList } from "./components/control/BeamList";
import { ParamInspector } from "./components/control/ParamInspector";
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

    return (
        <div className="p-2">
            <div className="h-150 flex space-x-2">
                <div className="h-full w-full flex-2">{graphState == "XY" ? <BeamGraph /> : <ParamGraph />}</div>
                <div className="h-full w-full min-w-50 flex-1">
                    <BeamList />
                </div>
            </div>
            <div className="flex space-x-2 mt-2">
                <ViewSelector />
                {graphState !== "XY" && <ParamInspector />}
                {selectedBeamId !== null && <BeamInspector />}
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
