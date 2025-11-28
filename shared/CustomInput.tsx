interface CustomInputProps {
    label: string;
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    error?: string;
}

export function CustomInput({
    label,
    name,
    value,
    onChange,
    type = "text",
    error,
}: CustomInputProps) {
    return (
        <div >
            <label className="block text-sm font-medium text-blue-700 mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full px-3 py-2 text-sm border rounded-xl text-blue-600 focus:outline-none focus:ring-2 transition
                    ${error ? "border-red-500 focus:ring-red-400 focus:border-red-400" : "border-blue-200 focus:ring-blue-400 focus:border-blue-400"}
                `}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}
