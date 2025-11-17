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
        <>
            <div className="h-150 flex">
                <div className="h-full w-full flex-2">
                    <BeamGraph F={2000} E={2.1 * 10 ** 11} I={4.26 * 10 ** -5} L={18} />
                </div>
                <div className="h-full w-full min-w-50 flex-1">
                    <BeamList />
                </div>
            </div>
            <div>{selectedBeamId !== null && <BeamInspector />}</div>
        </>
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
