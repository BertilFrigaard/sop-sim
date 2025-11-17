import { useState } from "react";

const inertiaOptions = [
    { name: "H-profil (HEA 160)", value: 1.673e-5 },
    { name: "H-profil på siden (HEA 160)", value: 5.48e-6 },
    { name: "Firkant massiv (100×100 mm)", value: 8.33e-5 },
    { name: "Rør (Ø100 mm, t=5 mm)", value: 2.46e-5 },
    { name: "U-profil (UPN 160)", value: 1.04e-5 },
];

export function InertiaInput() {
    const [inertia, setInertia] = useState(1000);
    return (
        <div>
            <p className="font-bold">I | Inertimoment </p>
            <select
                className="block"
                value={inertia}
                onChange={(event) => {
                    setInertia(Number(event.target.value));
                }}
            >
                {inertiaOptions.map((v) => (
                    <option key={v.name} value={v.value}>
                        {v.name}
                    </option>
                ))}
                {inertia !== 10 && inertia !== 20 && <option value={inertia}>Brugerdefineret</option>}
            </select>
            <input
                className="bg-gray-100"
                type="number"
                value={inertia}
                onChange={(event) => {
                    setInertia(Number(event.target.value));
                }}
            />
        </div>
    );
}
