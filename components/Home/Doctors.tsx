"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { useInView } from "react-intersection-observer";
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { setScrollTarget } from '@/store/slices/global'
import Modal from '../Modal'
import AppointmentPage from '../Appointment/page'
import { IDoctors } from '@/types/doctors';
import { easeOut } from "framer-motion";

const Doctors = ({ doctors }: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { target } = useSelector((state: any) => state.global);
  const doctorRef = useRef<HTMLDivElement>(null);

  const { user } = useSelector((state: any) => state.global);

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const [index, setIndex] = useState(5)
  const [selectedDoctor, setSelectedDoctor] = useState<IDoctors>();
  const [appointmentModal, setAppointmentModal] = useState<boolean>(false)

  useEffect(() => {
    if (target === "doctors" && doctorRef.current) {
      doctorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      dispatch(setScrollTarget(null));
    }
  }, [target, dispatch]);


  const handleToggle = () => {
    setIndex(index + 5)
  }

  const containerVariants = {
    hidden: { x: -100 },
    visible: {
      x: 0,
      transition: { duration: 1, ease: easeOut },
    },
  };


  return (
    <>
      <Modal modalVisible={appointmentModal} setModalVisible={setAppointmentModal}>
        <AppointmentPage closeModal={setAppointmentModal} doctor={selectedDoctor} />
      </Modal>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <div ref={doctorRef} className="w-[95%] mx-auto py-10 ">
          <h1 className="
              text-xl lg:text-3xl font-semibold text-blue-600 mb-4 relative inline-block text-blue-500 
                after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] 
                after:w-0 after:bg-blue-500 after:transition-all 
                after:duration-300 hover:after:w-full">
            Həkimlər
          </h1>
          <div className="mt-[10px] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <AnimatePresence>
              {doctors.slice(0, index).map((doctor: IDoctors) => (
                <motion.div
                  key={doctor.email}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.4 }}
                  layout
                  className="relative group bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <p className="cursor-pointer text-lg font-semibold text-gray-800 hover:text-blue-500">
                      {doctor.name + " " + doctor?.surname}
                    </p>
                    <p className="text-sm text-gray-600">{doctor.service_name}</p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0  flex flex-col justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    {user?.role !== "doctor" && (
                      <button
                        onClick={() => {
                          setSelectedDoctor(doctor)
                          setAppointmentModal(true)
                        }}
                        className="px-2 py-2 bg-blue-500 text-white text-[14px] rounded hover:bg-blue-600 transition">
                        Görüş təyin et
                      </button>
                    )}
                    <button
                      onClick={() => router.push(`/doctors/${doctor?.user_id}`)}
                      className="px-2 py-2 bg-white text-gray-800 text-[14px]  rounded hover:bg-gray-200 transition">
                      Ətraflı bax
                    </button>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {doctors.length > index && (
            <div className="mt-6 text-center">
              <button
                onClick={handleToggle}
                className="relative w-[110px] py-1 sm:py-1 md:py-2 overflow-hidden bg-blue-500 font-semibold rounded-lg border border-blue-500 text-white transition-all duration-300 group"
              >
                <span className="relative z-10 text-white-500 text-[15px] group-hover:text-blue-600">
                  Daha çox
                </span>
                <span
                  className="absolute right-0 top-0 h-full w-0 bg-white transition-all duration-500 group-hover:w-full"
                ></span>
              </button>
            </div>
          )}
        </div>
      </motion.div>

    </>
  )
}

export default Doctors
