'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input, Button, Form, Typography } from 'antd';
import { REQUIRED_FIELD } from '@/constants/forms';
import Modal from '@/components/Modal';
import ErrorPage from '@/components/Error';
import { useForm } from 'antd/es/form/Form';
import { useRouter } from 'next/navigation';
import { LoginForms } from '../register/types';
import api from '@/constants/api';
import Cookies from 'js-cookie';

const { Title } = Typography;

const LoginPage = () => {
    const router = useRouter();
    const [form] = useForm();

    const [formState, setFormState] = useState<Pick<LoginForms, 'email' | 'password'>>({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (changedValues: Pick<LoginForms, 'email' | 'password'>) => {
        setFormState({ ...formState, ...changedValues });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await api.post('/login', formState);
            Cookies.set('token', response?.data?.token, { expires: 7, secure: true, path: '/' });
            setLoading(false);
            router.push('/');
        } catch (error: any) {
            console.log(error);
            setErrorModalVisible(true);
            setErrorMessage(error?.response?.data?.message || 'Xəta baş verdi');
            setLoading(false);
        }
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
                    className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md border border-gray-200"
                >
                    <Title level={2} className="!text-center">
                        Giriş
                    </Title>

                    <Form
                        layout="vertical"
                        onFinish={handleSubmit}
                        onValuesChange={(changed) => handleChange(changed)}
                        requiredMark={false}
                        form={form}
                    >
                        <Form.Item
                            label={<span className="text-gray-700 font-[600] text-[16px]">Elektron poçt</span>}
                            name="email"
                            rules={REQUIRED_FIELD('Elektron poçt yazılmalıdır')}
                        >
                            <Input size="large" type="email" placeholder="Elektron poçt" />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700 font-[600] text-[16px]">Parol</span>}
                            name="password"
                            rules={REQUIRED_FIELD('Parol yazılmalıdır')}
                        >
                            <Input.Password size="large" placeholder="Parol" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                loading={loading}
                                className="w-full rounded-xl"
                            >
                                {loading ? 'Giriş edilir...' : 'Giriş'}
                            </Button>
                        </Form.Item>
                    </Form>
                </motion.div>
            </div>
        </>
    );
};

export default LoginPage;
