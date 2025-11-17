import "./App.css";
import { BeamInspector } from "./components/control/BeamInspector";
import { BeamList } from "./components/control/BeamList";
import { BeamGraph } from "./components/graphs/BeamGraph";
import { BeamsProvider } from "./contexts/BeamsProvider";
import { SelectionProvider } from "./contexts/SelectionProvider";
import { useSelection } from "./contexts/useSelection";

function AppContent() {
    const { selectedBeamId } = useSelection();
    return (
        <div className="p-2">
            <div className="h-150 flex space-x-2">
                <div className="h-full w-full flex-2">
                    <BeamGraph />
                </div>
                <div className="h-full w-full min-w-50 flex-1">
                    <BeamList />
                </div>
            </div>
            <div className="mt-2">{selectedBeamId !== null && <BeamInspector />}</div>
        </div>
    );
}

function App() {
    return (
        <BeamsProvider>
            <SelectionProvider>
                <AppContent />
            </SelectionProvider>
        </BeamsProvider>
    );
}

export default App;
