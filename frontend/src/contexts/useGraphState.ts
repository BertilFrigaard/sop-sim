import { useContext } from "react";
import { GraphStateContext } from "./GraphStateContext";

export function useGraphState() {
    const ctx = useContext(GraphStateContext);

    if (ctx == null) {
        throw new Error("useSelection must be used inside a GraphStateProvider");
    }

    return ctx;
}
