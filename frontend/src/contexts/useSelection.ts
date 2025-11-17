import { useContext } from "react";
import { SelectionContext } from "./SelectionContext";

export function useSelection() {
    const ctx = useContext(SelectionContext);

    if (ctx == null) {
        throw new Error("useSelection must be used inside a SelectionProvider");
    }

    return ctx;
}
