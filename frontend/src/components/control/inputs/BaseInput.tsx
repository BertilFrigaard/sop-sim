import type { InputOptions } from "../../../types/componentTypes";

export function BaseInput({
    title,
    options,
    value,
    updateValue,
}: {
    title: string;
    options: InputOptions | null;
    value: number;
    updateValue: (v: number) => void;
}) {
    return (
        <div className="bg-white p-2 rounded-md border-2 border-gray-200 space-y-2">
            <p className="font-bold">{title}</p>
            {options && (
                <select
                    className="block border-2 border-gray-200 rounded-md"
                    value={value}
                    onChange={(event) => {
                        updateValue(Number(event.target.value));
                    }}
                >
                    {options.map((v) => (
                        <option key={v.name} value={v.value}>
                            {v.name}
                        </option>
                    ))}
                    {!options.find((v) => v.value == value) && <option value={value}>Brugerdefineret</option>}
                </select>
            )}
            <input
                className="border-2 border-gray-200 rounded-md w-full"
                type="number"
                value={value}
                onChange={(event) => {
                    updateValue(Number(event.target.value));
                }}
            />
        </div>
    );
}
