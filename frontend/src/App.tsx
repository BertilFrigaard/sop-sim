import "./App.css";
import { BeamGraph } from "./components/graphs/BeamGraph";
import { BeamsProvider } from "./contexts/BeamsProvider";

function App() {
    return (
        <BeamsProvider>
            <div className="h-150">
                <BeamGraph F={2000} E={2.1 * 10 ** 11} I={4.26 * 10 ** -5} L={18} />
            </div>
        </BeamsProvider>
    );
}

export default App;
