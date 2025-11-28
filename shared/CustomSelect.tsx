import { Select } from "antd";
const { Option } = Select;

interface CustomSelectProps {
    label: string;
    value?: any;
    onChange?: (value: any) => void;
    options: { label: string; value: any }[];
    placeholder?: string;
    disabled?: boolean;
    error?: string;
}

export function CustomSelect({
    label,
    value,
    onChange,
    options,
    placeholder = "Seçin",
    disabled = false,
    error,
}: CustomSelectProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">{label}</label>
            <Select
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`w-full transition
                    ${error ? "border-red-500 focus:border-red-400" : "border-blue-200 focus:border-blue-400"}
                `}
            >
                {options.map((opt) => (
                    <Option key={opt.value} value={opt.value}>
                        {opt.label}
                    </Option>
                ))}
            </Select>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}
