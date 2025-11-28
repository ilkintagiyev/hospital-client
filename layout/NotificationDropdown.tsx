"use client"
import { useState, useRef, useEffect } from 'react';
import { CheckCircleIcon, ExclamationTriangleIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { BellIcon, StarIcon } from '@heroicons/react/24/solid';
import { io } from "socket.io-client";
import api from '@/constants/api';

export default function NotificationDropdown() {
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([])
    const [render, setRender] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        api.get("/appointments").then(res => {
            setNotifications(res?.data)
        })
    }, [render])


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleAccept = async (id: number) => {
        try {
            setLoading(true);
            const res = await api.post("/appointments/accept", { appointmentId: id });
            setLoading(false);
            setRender(!render)
        } catch (err) {
            console.error("Qəbul edilərkən xəta:", err);
        }
    };


    return (
        <div className="relative text-[20px]" ref={dropdownRef}>
            <div className="relative inline-block">
                <BellIcon
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-6 h-6 mt-[8px] text-gray-700 cursor-pointer hover:text-blue-600 transition-transform duration-200 hover:scale-110 "
                />
                {notifications.length > 0 && (
                    <span className="absolute -top-1 right-[-5px] bg-red-600 text-white text-xs font-bold w-[16px] h-[16px] flex items-center justify-center rounded-full animate-pulse">
                        {notifications.length}
                    </span>
                )}
            </div>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-126 p-5 bg-white rounded-xl shadow-xl z-50 border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Bildirişlər</h4>
                    <ul className="space-y-4 max-h-80 overflow-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-100">
                        {notifications.length > 0 ? (
                            notifications.map((notif: any, index: number) => (
                                <li
                                    key={index}
                                    className="flex justify-between items-center space-x-3 cursor-pointer p-3 bg-gray-50 rounded-md hover:bg-blue-50 transition"
                                >
                                    <StarIcon className="w-7 h-7 text-yellow-500 " />
                                    <div className="text-sm text-gray-700 leading-snug">
                                        <p>
                                            <strong>{notif.user_name} {notif.user_surname}</strong> adlı xəstə
                                        </p>
                                        <p className="text-blue-500 text-xs mt-1">
                                            {new Date(notif.appointment_date).toLocaleString()}
                                        </p>
                                        <p className="text-xs text-gray-500">Görüş təyin edilib</p>
                                    </div>
                                    <button
                                        onClick={() => handleAccept(notif?.appointment_id
                                        )}
                                        className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200 shadow-sm hover:shadow-md">
                                        Qəbul Et
                                    </button>
                                </li>
                            ))
                        ) : (
                            <div className="flex items-center space-x-3 text-sm text-gray-500">
                                <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
                                <span>Heç bir bildiriş yoxdur</span>
                            </div>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
