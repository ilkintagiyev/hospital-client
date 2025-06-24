"use client"

import React, { useState } from 'react'
import Modal from '../Modal';
import AppointmentPage from '../Appointment/page';
import { useSelector } from 'react-redux';

const Detail = ({ doctor }: any) => {

    const { user } = useSelector((state: any) => state.global);

    const [appointmentModal, setAppointmentModal] = useState<boolean>(false)

    return (
        <>
            <Modal modalVisible={appointmentModal} setModalVisible={setAppointmentModal}>
                <AppointmentPage closeModal={setAppointmentModal} doctor={doctor} />
            </Modal>
            <div className=" w-full p-8">
                <div className='flex items-center justify-center bg-white '>
                    <div className="shadow-2xl  w-full flex flex-col md:flex-row overflow-hidden">
                        {/* Solda şəkil */}
                        <div className="md:w-1/2 relative">

                            <img
                                src={doctor.photo}
                                alt={`${doctor.name} ${doctor.surname}`}
                                className="object-cover w-full h-full md:h-[600px]"
                            />
                        </div>

                        {/* Sağda məlumatlar */}
                        <div className="md:w-2/3 p-10 flex flex-col justify-between">
                            <div className="grid grid-cols-2 gap-y-4 gap-x-12  font-semibold text-lg">
                                <div className='text-blue-900'>Ad Soyad</div>
                                <div> {doctor.name} {doctor.surname}</div>

                                <div className='text-blue-900'>Email:</div>
                                <div>{doctor.email}</div>

                                <div className='text-blue-900'>Telefon:</div>
                                <div>{doctor.telephone}</div>

                                <div className='text-blue-900'>Təcrübə illəri:</div>
                                <div>{doctor.experience_years ?? "Qeyd olunmayıb"}</div>

                                <div className='text-blue-900'>Bakalavr dərəcəsi:</div>
                                <div>{doctor.bachelor_degree ?? "Qeyd olunmayıb"}</div>

                                <div className='text-blue-900'>Magistr dərəcəsi:</div>
                                <div>{doctor.master_degree ?? "Qeyd olunmayıb"}</div>

                                <div className='text-blue-900'>Cinsi:</div>
                                <div>
                                    {
                                        doctor.gender === "female"
                                            ? "Qadın"
                                            : doctor.gender === "male"
                                                ? "Kişi"
                                                : "Qeyd olunmayıb"
                                    }
                                </div>
                                <div className='text-blue-900'>İş günləri:</div>
                                <div>{doctor.work_days ?? "Qeyd olunmayıb"}</div>

                                <div className='text-blue-900'>Facebook:</div>
                                <div className='flex items-center'>
                                    <img className='w-[20px] h-[20px] mr-[5px]' src={"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png"} />
                                    <a className='text-blue-500' href={doctor.facebook_url}>
                                        {doctor.facebook_url ?? "Qeyd olunmayıb"}
                                    </a>
                                </div>

                                <div className='text-blue-900'>Instagram:</div>
                                <div className='flex items-center'>
                                    <img className='w-[20px] h-[20px] mr-[5px]' src={"https://www.logo.wine/a/logo/Instagram/Instagram-Logo.wine.svg"} />
                                    <a className='text-blue-500' href={doctor.instagram_url}>
                                        {doctor.instagram_url ?? "Qeyd olunmayıb"}
                                    </a>
                                </div>

                                <div className='text-blue-900'>Xidmət növü:</div>
                                <div>{doctor.service_name ?? "Qeyd olunmayıb"}</div>

                                <div className='text-blue-900'>Reytinq:</div>
                                <div>{doctor.rating ?? "Qeyd olunmayıb"}</div>
                                {
                                    user?.role !== "doctor" && (
                                        <button
                                            onClick={() => setAppointmentModal(true)}
                                            className="w-[190px] text-[17px] mt-4 inline-block bg-blue-600 hover:bg-blue-800 active:bg-blue-900 transition duration-300 text-white text-lg font-semibold py-2 px-8 rounded-xl shadow-lg hover:shadow-2xl"
                                        >
                                            Görüş Təyin Et
                                        </button>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
                {
                    doctor?.bio && (
                        <div className="mt-10 text-justify whitespace-pre-line leading-relaxed text-lg">
                            <h3 className="font-bold text-blue-900 text-2xl mb-4 border-b-2 border-blue-400 pb-2">
                                Haqqında
                            </h3>
                            {doctor.bio}
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default Detail