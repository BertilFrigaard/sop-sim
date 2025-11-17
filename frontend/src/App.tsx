import "./App.css";
import { BeamList } from "./components/control/BeamList";
import { BeamGraph } from "./components/graphs/BeamGraph";
import { BeamsProvider } from "./contexts/BeamsProvider";

function App() {
    return (
        <BeamsProvider>
            <div className="h-150 flex">
                <div className="h-full w-full flex-2">
                    <BeamGraph F={2000} E={2.1 * 10 ** 11} I={4.26 * 10 ** -5} L={18} />
                </div>
                <div className="h-full w-full min-w-50 flex-1">
                    <BeamList />
                </div>
            </div>
        </BeamsProvider>
    );
}

export default App;
