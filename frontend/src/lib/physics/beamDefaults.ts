import type { Beam } from "../../types/beamTypes";

export const defaultElasticModulus = [
    // In GPa
    {
        name: "Diamant ",
        value: 1220e9,
    },
    {
        name: "Jern",
        value: 210e9,
    },
    {
        name: "Glas",
        value: 75e9,
    },
    {
        name: "Beton",
        value: 17e9,
    },
    {
        name: "Træ", // Oak Wood, Along Grain
        value: 11e9,
    },
    {
        name: "Plast (PP)", // Polypropylene
        value: 1.75e9,
    },
];

export const defaultInertias = [
    // In m^4
    {
        name: "HEA 700", //
        value: 2.2e-3,
    },
    {
        name: "HEA 400",
        value: 4.5e-4,
    },
    {
        name: "HEA 200",
        value: 3.7e-5,
    },
    {
        name: "Hea 100",
        value: 3.5e-6,
    },
    {
        name: "C 140x1.5",
        value: 1.4e-6,
    },
    {
        name: "CHS 48.3x2.9", // Celsius 355 CHS 48.3x2.9
        value: 1.1e-7,
    },
];

export function getDefaultBeam(id: number) {
    return { id: id, F: 2000, E: defaultElasticModulus[1].value, I: defaultInertias[1].value, L: 8 } as Beam;
}
