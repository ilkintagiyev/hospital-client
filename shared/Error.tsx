import { XCircleIcon } from '@heroicons/react/24/outline';
import React from 'react'

interface IProps {
    message?: any;
    setModalVisible: (val: boolean) => void;
}

const ErrorPage = ({ message, setModalVisible }: IProps) => {
    return (
        <div className="flex flex-col items-center justify-center mt-[50px] p-3">
            <XCircleIcon className="h-32 w-32 text-red-600 mb-2" />
            <p className="text-lg text-red-600  mb-6">{message || 'Naməlum xəta'}</p>
            <button
                onClick={() => setModalVisible(false)}
                className="cursor-pointer px-5 py-3 bg-red-700  text-white rounded-lg hover:bg-red-800 text-[17px] transition"
            >
                Yenidən cəhd et
            </button>
        </div>
    )
}

export default ErrorPage