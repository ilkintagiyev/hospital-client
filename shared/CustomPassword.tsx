import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export function CustomPassword({
    label,
    name,
    value,
    onChange,
    showPassword,
    setShowPassword,
    error,
}: any) {
    return (
        <div className="relative">
            <label className="block text-sm font-medium text-blue-700 mb-1">{label}</label>

            <input
                type={showPassword ? "text" : "password"}
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full px-3 py-2 text-sm border rounded-xl pr-10 focus:outline-none focus:ring-2 transition
                    ${error ? "border-red-500 focus:ring-red-400 focus:border-red-400" : "border-blue-200 focus:ring-blue-400 focus:border-blue-400"}
                `}
            />

            <button
                type="button"
                onClick={() => setShowPassword((prev: boolean) => !prev)}
                className="absolute right-3 top-8 text-blue-500 hover:text-blue-700"
            >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>

            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}
