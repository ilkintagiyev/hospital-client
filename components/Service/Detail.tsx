"use client"

import React, { useState } from 'react'
import { MapPinIcon, ClockIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

const Detail = ({ serviceData }: any) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const maxIndex = serviceData?.doctors.length - 2; // 2 box göstəririk

    const prev = () => {
        setCurrentIndex((i) => (i <= 0 ? maxIndex : i - 1));
    };

    const next = () => {
        setCurrentIndex((i) => (i >= maxIndex ? 0 : i + 1));
    };

    return (
        <section className="py-12 bg-white w-full mt-[5px]">
            <div className="w-[90%] mx-auto px-6 flex flex-col lg:flex-row gap-12">
                {/* Sol tərəf: Xidmət adı, təsvir, şəkillər */}
                <div className="lg:w-1/3 w-full flex flex-col">
                    <h2 className="text-4xl font-bold text-blue-800 mb-4">
                        {serviceData?.service?.name}
                    </h2>
                    <p className="text-gray-600 text-lg mb-6">
                        {serviceData?.service?.description}
                    </p>

                    {serviceData?.images?.length > 0 && (
                        <div className="grid grid-cols-2 gap-4">
                            {serviceData.images.map((img: any) => (
                                <div key={img.id} className="rounded-lg overflow-hidden shadow">
                                    <img
                                        src={img.image_url}
                                        alt={img.alt_text || serviceData?.service?.name}
                                        className="w-full h-40 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Orta sütun: About uzun mətn */}
                <div className={`${ serviceData?.doctors?.length > 0 ? "lg:w-1/3" : "lg:w-1/2"} w-full flex flex-col items-center`}>
                    <div className="text-gray-700 text-base leading-relaxed px-4">
                        {serviceData?.service?.about ? (
                            <p>{serviceData.service.about}</p>
                        ) : (
                            <p>Şöbə haqqında ətraflı məlumat yoxdur.</p>
                        )}
                    </div>
                    
                </div>

                {
                    serviceData?.doctors?.length > 0 && (
                        <div className="lg:w-1/3 w-full max-w-sm mx-auto">
                            {/* Navigation */}
                            <div className="flex justify-between items-center rounded-t-lg py-2 mb-4">
                                <button
                                    onClick={prev}
                                    className="text-white bg-blue-700 rounded-[5px] hover:text-blue-300 transition"
                                    aria-label="Previous"
                                >
                                    <ChevronLeftIcon className="h-6 w-6" />
                                </button>
                                <button
                                    onClick={next}
                                    className="text-white bg-blue-700 rounded-[5px] hover:text-blue-300 transition"
                                    aria-label="Next"
                                >
                                    <ChevronRightIcon className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="flex space-x-4 overflow-hidden rounded-b-lg border border-t-0 border-gray-200">
                                {serviceData?.doctors
                                    .slice(currentIndex, currentIndex + 2)
                                    .map((doctor: any) => (
                                        <div
                                            key={doctor.id}
                                            className="bg-gray-50 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-48"
                                        >
                                            <img
                                                src={doctor.photo}
                                                alt={doctor.name}
                                                className="w-full h-40 object-cover cursor-pointer"
                                            />
                                            <div className="p-3 text-center">
                                                <h4 className="text-md font-semibold text-blue-800">{doctor.name + " " + doctor?.surname}</h4>
                                                <p className="text-sm text-gray-500 mt-1">{doctor?.serviceName} üzrə mütəxəssis</p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )
                }
            </div>
        </section>
    )
}

export default Detail