import { useContext } from "react";
import { BeamsContext } from "./BeamsContext";

export function useBeams() {
    const ctx = useContext(BeamsContext);

    if (ctx == null) {
        throw new Error("useSelection must be used inside a BeamsProvider");
    }

    return ctx;
}
