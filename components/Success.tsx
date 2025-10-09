import { CheckCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'

interface IProps {
    message: string;
    setModalVisible: (val: boolean) => void;
}

const Success = ({ message }: IProps) => {
    return (
        <div className="flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 text-center rounded-xl">
            <CheckCircleIcon className="text-green-600 mb-4 h-16 w-16 sm:h-20 sm:w-20 md:h-28 md:w-28" />
            <p className="text-green-600 mt-2 text-lg sm:text-xl md:text-2xl font-medium">{message}</p>
        </div>
    )
}

export default Success
