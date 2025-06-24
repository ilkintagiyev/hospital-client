"use client"
import { useState, useRef, useEffect } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function UserDropdown() {

    const { user } = useSelector((state: any) => state.global);

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative text-[20px]" ref={dropdownRef}>
            <UserCircleIcon
                onClick={() => setIsOpen(!isOpen)}
                className="w-6 h-6 text-gray-700 cursor-pointer hover:text-blue-600 transition"
            />

            {isOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white  rounded-xl shadow-lg z-50">
                    <ul className="py-2 text-gray-700">
                        {
                            user?.role === "doctor" && (
                                <li>
                                    <a
                                        onClick={() => router.push("/profile")}
                                        className="block text-[16px] px-4 py-2 hover:bg-gray-100 transition"
                                    >
                                        Profil
                                    </a>
                                </li>
                            )
                        }
                        
                        <li>
                            <button
                                onClick={() => router.push("/login")}
                                className="w-full text-[16px] text-left px-4 py-2 hover:bg-gray-100 transition"
                            >
                                Çıxış et
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
