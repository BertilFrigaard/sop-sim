import type { Beam } from "../../types/beamTypes";

export const defaultElasticModulus = [
    {
        name: "Stål",
        value: 210e9, // 210 GPa
    },
    {
        name: "Aluminium",
        value: 70e9, // 70 GPa
    },
    {
        name: "Beton (armeret)",
        value: 30e9, // 30 GPa
    },
    {
        name: "Træ (konstruktion, C24)",
        value: 11e9, // 11 GPa
    },
    {
        name: "Plast (PVC)",
        value: 3e9, // 3 GPa
    },
];

export const defaultInertias = [
    {
        name: "HEA 200 (H-bjælke)",
        value: 3.6e-5, // meget stærk profil
    },
    {
        name: "HEA 100 (lille H-bjælke)",
        value: 4.43e-6,
    },
    {
        name: "RHS 100×50×5 (rektangulært hulprofil)",
        value: 1.42e-6,
    },
    {
        name: "UPN 80 (U-profil)",
        value: 5.36e-7,
    },
    {
        name: "Massiv rund Ø20 mm (rør / stang)",
        value: 1.26e-8, // relativt svag
    },
];

export function getDefaultBeam(id: number) {
    return { id: id, F: 2000, E: defaultElasticModulus[1].value, I: defaultInertias[1].value, L: 18 } as Beam;
}
