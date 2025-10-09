"use client";

import React, { useState } from "react";
import Modal from "../Modal";
import AppointmentPage from "../Appointment/page";
import { useSelector } from "react-redux";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Detail = ({ doctor }: any) => {
  const { user } = useSelector((state: any) => state.global);
  const [appointmentModal, setAppointmentModal] = useState<boolean>(false);

  return (
    <>
      <Modal modalVisible={appointmentModal} setModalVisible={setAppointmentModal}>
        <AppointmentPage closeModal={setAppointmentModal} doctor={doctor} />
      </Modal>

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Solda şəkil */}
          <div className="md:w-1/2 relative group overflow-hidden rounded-t-3xl md:rounded-t-none md:rounded-l-3xl">
            <img
              src={doctor.photo}
              alt={`${doctor.name} ${doctor.surname}`}
              className="object-cover w-full h-80 sm:h-96 md:h-full transform transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Sağda info */}
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900">{doctor.name} {doctor.surname}</h1>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg">{doctor.bio ?? "Haqqında məlumat yoxdur."}</p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoChip label="Email" value={doctor.email} />
                <InfoChip label="Telefon" value={doctor.telephone} />
                <InfoChip label="Təcrübə illəri" value={doctor.experience_years ?? "Qeyd olunmayıb"} />
                <InfoChip label="Bakalavr" value={doctor.bachelor_degree ?? "Qeyd olunmayıb"} />
                <InfoChip label="Magistr" value={doctor.master_degree ?? "Qeyd olunmayıb"} />
                <InfoChip label="Cinsi" value={
                  doctor.gender === "female" ? "Qadın" : doctor.gender === "male" ? "Kişi" : "Qeyd olunmayıb"
                } />
                <InfoChip label="İş günləri" value={doctor.work_days ?? "Qeyd olunmayıb"} />
                <InfoChip label="Xidmət növü" value={doctor.service_name ?? "Qeyd olunmayıb"} />
                <InfoChip label="Reytinq" value={doctor.rating ?? "Qeyd olunmayıb"} />
              </div>

              {/* Sosial düymələr */}
              <div className="flex gap-4 mt-6">
                <SocialButton url={doctor.facebook_url} Icon={FaFacebookF} />
                <SocialButton url={doctor.instagram_url} Icon={FaInstagram} />
              </div>

              {/* Görüş button */}
              {user?.role !== "doctor" && (
                <button
                  onClick={() => setAppointmentModal(true)}
                  className="mt-8 w-full sm:w-1/2 py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-2xl shadow-lg hover:scale-105 hover:from-blue-700 hover:to-blue-900 transition-all duration-300"
                >
                  Görüş Təyin Et
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const InfoChip = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col bg-gray-50 p-2 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
    <span className="text-xs sm:text-sm font-semibold text-gray-500 uppercase">{label}</span>
    <span className="mt-1 text-gray-800 font-medium text-sm sm:text-base">{value}</span>
  </div>
);

const SocialButton = ({ url, Icon }: { url?: string; Icon: any }) => (
  <a
    href={url}
    target="_blank"
    className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 text-white hover:bg-blue-800 hover:scale-110 transition-all duration-300"
  >
    <Icon size={16} />
  </a>
);

export default Detail;
