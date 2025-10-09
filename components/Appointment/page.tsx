"use client";

import React, { useState } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import Modal from "../Modal";
import Success from "../Success";
import ErrorPage from "../Error";
import api from "@/constants/api";
import { DatePicker } from "antd";

interface IProps {
    closeModal: (val: boolean) => void;
    doctor: any;
}

const AppointmentPage = ({ doctor, closeModal }: IProps) => {
    const { user } = useSelector((state: any) => state.global);

    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>("");

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name + " " + user?.surname || "",
        phone: user?.telephone || "",
        date: null as any,
    });

    const close = () => {
        closeModal(false);
        setFormData({
            name: user?.name + " " + user?.surname || "",
            phone: user?.telephone || "",
            date: null,
        });
    };

    const submitButton = async () => {
        if (!formData.date) {
            setErrorMessage("Tarixi seçin");
            setErrorModalVisible(true);
            return;
        }

        const formattedDate = dayjs(formData.date).format("YYYY-MM-DD HH:mm:ss");
        const newData = {
            doctorId: doctor?.doctor_id,
            date: formattedDate,
        };

        try {
            setLoading(true);
            await api.post("/appointments", newData);
            setSuccessMessage("Görüşünüz təyin olundu");
            setSuccessModalVisible(true);
            setLoading(false);
            close();
        } catch (error: any) {
            setErrorMessage(error?.response?.data?.message || "Xəta baş verdi");
            setErrorModalVisible(true);
            setLoading(false);
        }
    };

    return (
        <>
            <Modal modalVisible={errorModalVisible} setModalVisible={setErrorModalVisible}>
                <ErrorPage message={errorMessage} setModalVisible={setErrorModalVisible} />
            </Modal>
            <Modal modalVisible={successModalVisible} setModalVisible={setSuccessModalVisible}>
                <Success message={successMessage} setModalVisible={setSuccessModalVisible} />
            </Modal>

            <div className="font-sans" style={{ fontFamily: '"Inter", sans-serif' }}>
                <div className="flex items-center gap-4 mb-6">
                    <img
                        src={doctor.photo}
                        alt={doctor.name}
                        className="w-20 h-20 rounded-full object-cover shadow"
                    />
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">{doctor.name + " " + doctor?.surname}</h2>
                        <p className="text-gray-600">{doctor.specialty}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {/* Name */}
                    <div className="flex flex-col">
                        <label className="text-gray-500 font-semibold text-sm mb-1">Ad Soyad</label>
                        <input
                            name="name"
                            value={formData.name}
                            disabled
                            className="h-10 px-3 border border-gray-300 rounded-lg bg-gray-200 cursor-not-allowed text-gray-700"
                            placeholder="Ad və soyad"
                        />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col">
                        <label className="text-gray-500 font-semibold text-sm mb-1">Telefon</label>
                        <input
                            name="phone"
                            value={formData.phone}
                            disabled
                            className="h-10 px-3 border border-gray-300 rounded-lg bg-gray-200 cursor-not-allowed text-gray-700"
                            placeholder="+994..."
                        />
                    </div>

                    {/* DatePicker */}
                    <div className="flex flex-col">
                        <label className="text-gray-500 font-semibold text-sm mb-1">Görüş Tarixi</label>
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm"
                            value={formData.date}
                            onChange={(date) => setFormData((prev) => ({ ...prev, date }))}
                            className="h-10 w-full px-3 rounded-lg border border-gray-300"
                            disabledDate={(current) => current && current < dayjs().startOf("day")}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end mt-4 gap-4">
                        <button
                            onClick={close}
                            className="h-9 w-24 bg-black text-white rounded-md hover:bg-gray-700 transition-colors"
                        >
                            Bağla
                        </button>
                        <button
                            onClick={submitButton}
                            className="h-9 w-24 bg-blue-700 text-white rounded-md hover:bg-blue-500 transition-colors"
                        >
                            {loading ? "Gözləyin..." : "Təsdiqlə"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AppointmentPage;
