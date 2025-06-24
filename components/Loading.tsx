import React from "react";
import { Spin } from "antd";

const Loading = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center text-red-600">
            <Spin size="large" />
        </div>
    );
};

export default Loading;
