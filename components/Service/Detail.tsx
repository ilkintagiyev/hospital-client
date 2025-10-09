"use client"

import React, { useState } from 'react'
import { MapPinIcon, ClockIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

const Detail = ({ serviceData }: any) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const maxIndex = serviceData?.doctors.length - 2; 

    const prev = () => {
        setCurrentIndex((i) => (i <= 0 ? maxIndex : i - 1));
    };

    const next = () => {
        setCurrentIndex((i) => (i >= maxIndex ? 0 : i + 1));
    };

    return (
        <section className="py-8 sm:py-12 bg-white w-full mt-[5px]">
            {/* Container responsive */}
            <div className="w-[98%] sm:w-[95%] lg:w-[90%] mx-auto px-3 sm:px-6 flex flex-col lg:flex-row gap-8 sm:gap-12">

                {/* Service info + images */}
                <div className="lg:w-1/3 w-full flex flex-col">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-800 mb-3 sm:mb-4">
                        {serviceData?.service?.name}
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg mb-4 sm:mb-6">
                        {serviceData?.service?.description}
                    </p>

                    {serviceData?.images?.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            {serviceData.images.map((img: any) => (
                                <div key={img.id} className="rounded-lg overflow-hidden shadow">
                                    <img
                                        src={img.image_url}
                                        alt={img.alt_text || serviceData?.service?.name}
                                        className="w-full h-28 sm:h-36 md:h-40 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* About section */}
                <div className={`${ serviceData?.doctors?.length > 0 ? "lg:w-1/3" : "lg:w-1/2"} w-full flex flex-col items-center`}>
                    <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed px-2 sm:px-4">
                        {serviceData?.service?.about ? (
                            <p>{serviceData.service.about}</p>
                        ) : (
                            <p>Şöbə haqqında ətraflı məlumat yoxdur.</p>
                        )}
                    </div>
                </div>

                {/* Doctors carousel */}
                {serviceData?.doctors?.length > 0 && (
                    <div className="lg:w-1/3 w-full max-w-sm mx-auto">
                        <div className="flex justify-between items-center rounded-t-lg py-2 mb-3 sm:mb-4">
                            <button
                                onClick={prev}
                                className="text-white bg-blue-700 rounded-[5px] hover:text-blue-300 transition"
                                aria-label="Previous"
                            >
                                <ChevronLeftIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                            </button>
                            <button
                                onClick={next}
                                className="text-white bg-blue-700 rounded-[5px] hover:text-blue-300 transition"
                                aria-label="Next"
                            >
                                <ChevronRightIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                            </button>
                        </div>

                        <div className="flex space-x-3 sm:space-x-4 overflow-hidden rounded-b-lg ">
                            {serviceData?.doctors
                                .slice(currentIndex, currentIndex + 2)
                                .map((doctor: any) => (
                                    <div
                                        key={doctor.id}
                                        className="bg-gray-50 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-36 sm:w-44 md:w-48"
                                    >
                                        <img
                                            src={doctor.photo}
                                            alt={doctor.name}
                                            className="w-full h-32 sm:h-36 md:h-40 object-cover cursor-pointer"
                                        />
                                        <div className="p-2 sm:p-3 text-center">
                                            <h4 className="text-sm sm:text-md font-semibold text-blue-800">
                                                {doctor.name + " " + doctor?.surname}
                                            </h4>
                                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                                {doctor?.serviceName} üzrə mütəxəssis
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Detail
