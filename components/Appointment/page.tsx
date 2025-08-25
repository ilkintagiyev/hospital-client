import api from '@/constants/api';
import { REQUIRED_FIELD } from '@/constants/forms';
import { Button, DatePicker, Form, Input } from 'antd'
import dayjs from 'dayjs';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Modal from '../Modal';
import Success from '../Success';
import ErrorPage from '../Error';

const { Item } = Form;

interface IProps {
    closeModal: (val: boolean) => void;
    doctor: any
}

const AppointmentPage = ({ doctor, closeModal }: IProps) => {
    const { user } = useSelector((state: any) => state.global);

    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string>("")

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const close = () => {
        closeModal(false)
        form.resetFields();
    }


    const submitButton = async () => {
        const value = form.getFieldsValue();
        const formattedDate = dayjs(value?.date).format("YYYY-MM-DD HH:mm:ss");

        const newData = {
            doctorId: doctor?.doctor_id,
            date: formattedDate
        }
        try {
            setLoading(true);
            await api.post("/appointments", newData)
            setSuccessMessage("Görüşünüz təyin olundu")
            setSuccessModalVisible(true)
            setLoading(false);
            closeModal(false)
            form.resetFields();
        } catch (error: any) {
            setErrorMessage(error?.response?.data?.message)
            setErrorModalVisible(true);
            setLoading(false);
        }
    }


    return (
        <>
            <Modal modalVisible={errorModalVisible} setModalVisible={setErrorModalVisible}>
                <ErrorPage message={errorMessage} setModalVisible={setErrorModalVisible} />
            </Modal>
            <Modal modalVisible={successModalVisible} setModalVisible={setSuccessModalVisible}>
                <Success message={successMessage} setModalVisible={setSuccessModalVisible} />
            </Modal>
            <div className="flex items-center gap-4 mb-6">
                <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-20 h-20 rounded-full object-cover shadow"
                />
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">{doctor.name}</h2>
                    <p className="text-gray-600">{doctor.specialty}</p>
                </div>
            </div>

            <Form form={form} layout="vertical">
                <Item
                    initialValue={user?.name + " " + user?.surname}
                    label="Ad Soyad"
                    name="name"
                >
                    <Input disabled className='h-[40px]' placeholder="Ad və soyad" />
                </Item>

                <Item
                    initialValue={user?.telephone}
                    label="Telefon"
                    name="phone"
                >
                    <Input disabled className='h-[40px]' placeholder="+994..." />
                </Item>

                <Item
                    label="Görüş Tarixi"
                    name="date"
                    rules={REQUIRED_FIELD("Tarixi seçin")}
                >
                    <DatePicker
                        showTime
                        format="YYYY-MM-DD HH:mm"
                        className='h-[40px] w-full'
                        disabledDate={(current) => current && current < dayjs().startOf("day")}
                    />
                </Item>
                <div className='flex justify-end'>
                    <button onClick={close} className='h-[35px] bg-[black] hover:bg-[gray] text-[white] w-[100px] rounded-[5px] mr-[15px]'>Bağla</button>
                    <button onClick={submitButton} className='h-[35px] bg-blue-700 hover:bg-blue-400 text-[white] w-[100px] rounded-[5px]'>
                        {loading ? "Gözləyin..." : "Təsdiqlə"}
                    </button>
                </div>
            </Form>
        </>
    )
}

export default AppointmentPage