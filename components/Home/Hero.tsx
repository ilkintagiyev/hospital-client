"use client"

import React, { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Modal from '../Modal';
import AppointmentPage from '../Appointment/page';
import { IDoctors } from '@/types/doctors';
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from 'react-redux';

interface IProps {
    doctors: IDoctors[]
}

const Hero = ({ doctors }: IProps) => {
    const [current, setCurrent] = useState(0);
    const [appointmentModal, setAppointmentModal] = useState<boolean>(false)
    const [selectedDoctor, setSelectedDoctor] = useState<any>();
    const [direction, setDirection] = useState(0);

    const { user } = useSelector((state: any) => state.global);

    const prevSlide = () => {
        setCurrent(current === 0 ? doctors.length - 1 : current - 1);
    };

    const nextSlide = () => {
        setCurrent(current === doctors.length - 1 ? 0 : current + 1);
    };

    const doctor = doctors[current];

    const assignAppointment = (doctor: IDoctors) => {
        setSelectedDoctor(doctor);
        setAppointmentModal(true);
    }

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 700 : -700,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 700 : -700,
            opacity: 0,
            transition: { duration: 0.5 }
        }),
    };

    const handlePrev = () => {
        setDirection(-1);
        prevSlide();
    };

    const handleNext = () => {
        setDirection(1);
        nextSlide();
    };

    return (
        <>
            <Modal modalVisible={appointmentModal} setModalVisible={setAppointmentModal}>
                <AppointmentPage closeModal={setAppointmentModal} doctor={selectedDoctor} />
            </Modal>
            <section className="w-[95%] mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 to-blue-200 shadow-2xl my-8">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between">

                    <div className="md:w-1/2 p-4 sm:p-8 md:p-12 space-y-4 sm:space-y-6">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={doctor?.doctor_id}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="space-y-4 sm:space-y-6"
                            >
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight drop-shadow-md">
                                    {doctor?.name + " " + doctor?.surname}
                                </h1>
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-700 drop-shadow-sm">
                                    {doctor?.service_name}
                                </h2>
                                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                                    Hər xəstəyə xüsusi diqqət və qayğı göstəririk. Sizin sağlamlığınız bizim üçün ən önəmlidir.
                                </p>
                                {
                                    user?.role === "doctor" ? (
                                        <button
                                            className="mt-3 sm:mt-4 inline-block bg-blue-600 hover:bg-blue-800 active:bg-blue-900 transition duration-300 text-white text-base sm:text-lg font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-xl shadow-lg hover:shadow-2xl"
                                        >
                                            Profilə bax
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => assignAppointment(doctor)}
                                            className="mt-3 sm:mt-4 inline-block bg-blue-600 hover:bg-blue-800 active:bg-blue-900 transition duration-300 text-white text-base sm:text-lg font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-xl shadow-lg hover:shadow-2xl"
                                        >
                                            Görüş Təyin Et
                                        </button>
                                    )
                                }
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="relative md:w-1/2 h-[280px] sm:h-[400px] md:h-[520px] bg-gray-200 flex items-center justify-center overflow-hidden shadow-lg">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.img
                                key={doctor?.doctor_id}
                                src={doctor?.photo}
                                alt={doctor?.name}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="w-full h-full object-cover shadow-2xl"
                            />
                        </AnimatePresence>

                        {doctors.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrev}
                                    aria-label="Previous Slide"
                                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-2 sm:p-3 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
                                >
                                    <ChevronLeftIcon className="h-5 sm:h-7 w-5 sm:w-7 text-gray-700" />
                                </button>

                                <button
                                    onClick={handleNext}
                                    aria-label="Next Slide"
                                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-2 sm:p-3 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
                                >
                                    <ChevronRightIcon className="h-5 sm:h-7 w-5 sm:w-7 text-gray-700" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero
