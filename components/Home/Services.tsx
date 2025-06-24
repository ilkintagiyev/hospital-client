"use client"

import React, { useState } from 'react';
import { IServices } from '@/types/services';
import {
    HeartIcon,
    UserGroupIcon,
    CalendarIcon,
    BeakerIcon,
    EyeIcon,
    SparklesIcon,
    SunIcon,
    CpuChipIcon,
    ShieldCheckIcon,
    PuzzlePieceIcon,
    BoltIcon,
    FireIcon,
    StarIcon,
    CameraIcon,
    ArrowPathIcon,
    HomeIcon,
    ChartBarIcon,
    ShieldExclamationIcon
} from '@heroicons/react/24/outline';

import type { FC, SVGProps } from 'react';
import { useRouter } from 'next/navigation';

const iconMap: Record<number, FC<SVGProps<SVGSVGElement>>> = {
    1: HeartIcon,
    2: UserGroupIcon,
    3: CalendarIcon,
    4: BeakerIcon,
    5: EyeIcon,
    6: SparklesIcon,
    8: SunIcon,
    9: CpuChipIcon,
    10: ShieldCheckIcon,
    11: PuzzlePieceIcon,
    12: BoltIcon,
    13: FireIcon,
    14: StarIcon,
    15: CameraIcon,
    16: ArrowPathIcon,
    17: HomeIcon,
    19: ChartBarIcon,
    20: ShieldExclamationIcon,
};

interface IProps {
    services: IServices[];
}

const Services = ({ services }: IProps) => {

    const router = useRouter();

    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 10;

    const next = () => {
        setCurrentIndex((prev) =>
            prev + itemsPerPage >= services.length ? 0 : prev + itemsPerPage
        );
    };

    const prev = () => {
        setCurrentIndex((prev) =>
            prev - itemsPerPage < 0
                ? Math.max(services.length - itemsPerPage, 0)
                : prev - itemsPerPage
        );
    };

    const visibleServices = services.slice(
        currentIndex,
        currentIndex + itemsPerPage
    );

    return (
        <section className="py-6 px-6 w-[100%] lg:w-[85%] mx-auto relative">
            <div className="text-center mb-12">
                <h1 className="
               text-xl lg:text-3xl font-semibold text-blue-700 mb-4 relative inline-block text-blue-500 
                after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] 
                after:w-0 after:bg-blue-500 after:transition-all 
                after:duration-300 hover:after:w-full">
                    Şöbələrimiz
                </h1>
            </div>

            <div className="flex items-center relative">
                <button
                    onClick={prev}
                    aria-label="Previous"
                    className="absolute left-0 z-10 bg-white rounded-full shadow-md p-2 hover:bg-blue-100 transition"
                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <div className="flex flex-grow justify-between gap-4 overflow-hidden">
                    {visibleServices.map((service) => {
                        const Icon = iconMap[service.id] || HeartIcon;
                        return (
                            <div
                                onClick={() => router.push(`/services/${service?.id}`)}
                                key={service.id}
                                className="
                                     bg-white rounded-lg p-6 shadow-lg flex flex-col items-center cursor-pointer
                                     hover:scale-105 transform transition flex-1 min-w-[180px]
                                     hover:bg-blue-500 group
                                   "
                            >
                                <Icon className="h-12 w-12 text-blue-500 mb-4 group-hover:text-white transition" />
                                <h3 className="text-xl font-semibold text-gray-900 text-center group-hover:text-white transition">
                                    {service.name}
                                </h3>
                            </div>
                        );
                    })}
                </div>

                <button
                    onClick={next}
                    aria-label="Next"
                    className="absolute right-0 z-10 bg-white rounded-full shadow-md p-2 hover:bg-blue-100 transition"
                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default Services;
