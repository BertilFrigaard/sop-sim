import { useState } from "react";

export function ForceInput() {
    const [force, setForce] = useState(1000);
    return (
        <div>
            <p>F | Force </p>
            <input
                className="bg-gray-100"
                type="number"
                value={force}
                onChange={(event) => {
                    setForce(Number(event.target.value));
                }}
            />
        </div>
    );
}
