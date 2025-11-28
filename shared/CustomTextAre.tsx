export function CustomTextarea({
    label,
    name,
    value,
    onChange,
    required = false,
    rows = 5,
}: any) {
    return (
        <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">{label}</label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                rows={rows}
                className="w-full px-4 py-3 text-sm border border-blue-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
        </div>
    );
}