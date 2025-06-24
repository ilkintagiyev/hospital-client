'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input, Select, Button, Form, Typography } from 'antd';
import { REQUIRED_FIELD } from '@/constants/forms';
import { LoginForms } from './types';
import Modal from '@/components/Modal';
import ErrorPage from '@/components/Error';
import { useForm } from 'antd/es/form/Form';
import { useRouter } from 'next/navigation';
import api from '@/constants/api';
import Cookies from 'js-cookie';

const { Title } = Typography;
const { Option } = Select;

const RegisterPage = () => {

    const router = useRouter();

    const [form] = useForm();

    const [formState, setFormState] = useState<LoginForms>({
        name: '',
        surname: "",
        email: '',
        telephone: "",
        password: '',
        role: 'patient',
    });

    const [loading, setLoading] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")

    const handleChange = (changedValues: LoginForms) => {
        setFormState({ ...formState, ...changedValues });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await api.post("/register", formState)
            Cookies.set('token', response?.data?.token, { expires: 7, secure: true, path: '/' });
            setLoading(false);
            router.push("/");
        } catch (error: any) {
            setErrorModalVisible(true);
            setErrorMessage(error?.response?.data?.message)
        }
        setLoading(false);
        form.resetFields();
    };

    return (
        <>
            <Modal modalVisible={errorModalVisible} setModalVisible={setErrorModalVisible}>
                <ErrorPage setModalVisible={setErrorModalVisible} message={errorMessage} />
            </Modal>
            <div className="flex items-center justify-center min-h-screen bg-blue-100 transition-all duration-500">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white  shadow-2xl rounded-3xl p-10 w-full max-w-md border border-gray-200 "
                >
                    <Title level={2} className="!text-center">
                        Qeydiyyat
                    </Title>

                    <Form
                        layout="vertical"
                        onFinish={handleSubmit}
                        onValuesChange={(changed) => handleChange(changed)}
                        requiredMark={false}
                        className=''
                    >
                        {/* 1-ci sıra: Ad və Soyad */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-[50px]">
                            <Form.Item
                                label={<span className="text-gray-700 font-[600] text-[16px]">Ad</span>}
                                name="name"
                                rules={REQUIRED_FIELD("Ad yazılmalıdır")}
                            >
                                <Input size="large" placeholder="Ad" />
                            </Form.Item>

                            <Form.Item
                                label={<span className="text-gray-700 font-[600] text-[16px]">Soyad</span>}
                                name="surname"
                                rules={REQUIRED_FIELD("Soyad yazılmalıdır")}
                            >
                                <Input size="large" placeholder="Soyad" />
                            </Form.Item>
                        </div>

                        {/* 2-ci sıra: Email və Telefon */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item
                                label={<span className="text-gray-700 font-[600] text-[16px]">Elektron poçt</span>}
                                name="email"
                                rules={REQUIRED_FIELD("Elektron poçt")}
                            >
                                <Input size="large" type="email" placeholder="Elektron poçt" />
                            </Form.Item>

                            <Form.Item
                                label={<span className="text-gray-700 font-[600] text-[16px]">Telefon nömrəsi</span>}
                                name="telephone"
                                rules={REQUIRED_FIELD("Telefon nömrəsi")}
                            >
                                <Input size="large" type="text" placeholder="Telefon nömrəsi" />
                            </Form.Item>
                        </div>

                        {/* 3-cü sıra: Parol və Rol */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item
                                label={<span className="text-gray-700 font-[600] text-[16px]">Parol</span>}
                                name="password"
                                rules={REQUIRED_FIELD("Parol yazılmalıdır")}
                            >
                                <Input.Password size="large" placeholder="Parol" />
                            </Form.Item>

                            <Form.Item
                                label={<span className="text-gray-700 font-[600] text-[16px]">Rol</span>}
                                name="role"
                                initialValue="patient"
                            >
                                <Select size="large">
                                    <Option value="patient">Pasiyent</Option>
                                    <Option value="doctor">Həkim</Option>
                                </Select>
                            </Form.Item>
                        </div>

                        {/* Submit Button */}
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                loading={loading}
                                className="w-full rounded-xl"
                            >
                                {loading ? 'Qeydiyyat olunur...' : 'Qeydiyyat'}
                            </Button>
                        </Form.Item>
                    </Form>
                </motion.div>
            </div>
        </>
    );
};

export default RegisterPage;
