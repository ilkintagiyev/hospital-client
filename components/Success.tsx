import { CheckCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'

interface IProps {
    message: string;
    setModalVisible: (val: boolean) => void;
}

const Success = ({ message }: IProps) => {
    return (
        <div className="flex flex-col items-center justify-center p-6 text-center rounded-xl ">
            <CheckCircleIcon className="h-28 w-28 text-green-600 mb-2" />
            <p className="text-green-600 mt-1 text-[25px]">{message}</p>
        </div>
    )
}

export default Success