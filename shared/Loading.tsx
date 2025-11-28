import React from "react";
import { Spin } from "antd";

const Spinner = () => {
    return (
        <div className="absolute inset-0 backdrop-blur-sm bg-white-50 flex items-center justify-center z-50">
            <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full" />
        </div>
    );
};

export default Spinner;
