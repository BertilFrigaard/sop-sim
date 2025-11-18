import type { GraphState } from "./contextTypes";

export type View = {
    name: string;
    graphState: GraphState;
};

export type InputOption = {
    name: string;
    value: number;
};

export type InputOptions = InputOption[];
