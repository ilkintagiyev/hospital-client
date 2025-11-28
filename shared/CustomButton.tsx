"use client";

interface CustomButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  loading?: boolean;
}

export default function CustomButton({
  children,
  type = "button",
  className = "",
  loading = false,
}: CustomButtonProps) {

  return (
    <button
      type={type}
      disabled={loading}
      className={`relative flex items-center justify-center
        w-full py-2.5 rounded-xl text-white font-semibold text-sm shadow-md transition transform
        ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
        }
        ${className}
      `}
    >
      {/* Yazı loading olanda gizlənir */}
      <span className={`${loading ? "opacity-0" : "opacity-100"} transition`}>
        {children}
      </span>

      {/* Loader */}
      {loading && (
        <span className="absolute animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
      )}
    </button>
  );
}
