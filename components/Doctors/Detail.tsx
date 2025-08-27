"use client";

import React, { useState } from "react";
import Modal from "../Modal";
import AppointmentPage from "../Appointment/page";
import { useSelector } from "react-redux";

const Detail = ({ doctor }: any) => {
  const { user } = useSelector((state: any) => state.global);

  const [appointmentModal, setAppointmentModal] = useState<boolean>(false);

  return (
    <>
      <Modal modalVisible={appointmentModal} setModalVisible={setAppointmentModal}>
        <AppointmentPage closeModal={setAppointmentModal} doctor={doctor} />
      </Modal>
      <div className="w-full p-4 md:p-8">
        <div className="flex items-center justify-center bg-white ">
          <div className="shadow-2xl w-full flex flex-col md:flex-row overflow-hidden">
            {/* Solda şəkil */}
            <div className="md:w-1/2 relative">
              <img
                src={doctor.photo}
                alt={`${doctor.name} ${doctor.surname}`}
                className="object-cover w-full h-full md:h-[600px]"
              />
            </div>

            {/* Sağda məlumatlar */}
            <div className="md:w-2/3 p-4 md:p-10 flex flex-col justify-between">
              <div className="flex flex-col gap-4 font-semibold text-sm md:text-lg">
                {/* hər row */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-blue-900 w-40">Ad Soyad:</span>
                  <span>{doctor.name} {doctor.surname}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-blue-900 w-40">Email:</span>
                  <span>{doctor.email}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-blue-900 w-40">Telefon:</span>
                  <span>{doctor.telephone}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-blue-900 w-40">Təcrübə illəri:</span>
                  <span>{doctor.experience_years ?? "Qeyd olunmayıb"}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-blue-900 w-40">Bakalavr dərəcəsi:</span>
                  <span>{doctor.bachelor_degree ?? "Qeyd olunmayıb"}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-blue-900 w-40">Magistr dərəcəsi:</span>
                  <span>{doctor.master_degree ?? "Qeyd olunmayıb"}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-blue-900 w-40">Cinsi:</span>
                  <span>
                    {doctor.gender === "female"
                      ? "Qadın"
                      : doctor.gender === "male"
                      ? "Kişi"
                      : "Qeyd olunmayıb"}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-blue-900 w-40">İş günləri:</span>
                  <span>{doctor.work_days ?? "Qeyd olunmayıb"}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-blue-900 w-40">Facebook:</span>
                  <div className="flex items-center gap-2">
                    <img
                      className="w-5 h-5"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png"
                    />
                    <a
                      className="text-blue-500 text-sm md:text-base"
                      href={doctor.facebook_url}
                    >
                      {doctor.facebook_url ?? "Qeyd olunmayıb"}
                    </a>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-blue-900 w-40">Instagram:</span>
                  <div className="flex items-center gap-2">
                    <img
                      className="w-5 h-5"
                      src="https://www.logo.wine/a/logo/Instagram/Instagram-Logo.wine.svg"
                    />
                    <a
                      className="text-blue-500 text-sm md:text-base"
                      href={doctor.instagram_url}
                    >
                      {doctor.instagram_url ?? "Qeyd olunmayıb"}
                    </a>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-blue-900 w-40">Xidmət növü:</span>
                  <span>{doctor.service_name ?? "Qeyd olunmayıb"}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-blue-900 w-40">Reytinq:</span>
                  <span>{doctor.rating ?? "Qeyd olunmayıb"}</span>
                </div>

                {user?.role !== "doctor" && (
                  <button
                    onClick={() => setAppointmentModal(true)}
                    className="w-full sm:w-[210px] text-sm md:text-lg mt-4 bg-blue-600 hover:bg-blue-800 active:bg-blue-900 transition duration-300 text-white font-semibold py-2 px-4 md:px-8 rounded-xl shadow-lg hover:shadow-2xl"
                  >
                    Görüş Təyin Et
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {doctor?.bio && (
          <div className="mt-6 md:mt-10 text-justify whitespace-pre-line leading-relaxed text-sm md:text-lg">
            <h3 className="font-bold text-blue-900 text-xl md:text-2xl mb-2 md:mb-4 border-b-2 border-blue-400 pb-1 md:pb-2">
              Haqqında
            </h3>
            {doctor.bio}
          </div>
        )}
      </div>
    </>
  );
};

export default Detail;
