'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Modal from '@/components/Modal';
import ErrorPage from '@/components/Error';
import { CustomInput } from '@/shared/CustomInput';
import { CustomPassword } from '@/shared/CustomPassword';
import CustomButton from '@/shared/CustomButton';
import hospital from '@/assets/hospital.jpg';
import api from '@/constants/api';

export default function RegisterPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        telephone: '',
        password: '',
        role: 'patient',
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
        surname: '',
        email: '',
        telephone: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value.trimStart() }));
        setFormErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const newErrors = {
            name: !formData.name ? 'Ad boş ola bilməz.' : '',
            surname: !formData.surname ? 'Soyad boş ola bilməz.' : '',
            email: !formData.email ? 'E-poçt boş ola bilməz.' : '',
            telephone: !formData.telephone ? 'Telefon boş ola bilməz.' : '',
            password: !formData.password ? 'Şifrə boş ola bilməz.' : '',
        };

        setFormErrors(newErrors);

        if (Object.values(newErrors).some(err => err)) {
            setLoading(false);
            return;
        }

        try {
            const { data } = await api.post('/register', formData);
            if (data?.token) {
                Cookies.set('token', data.token, {
                    expires: 7,
                    secure: true,
                    sameSite: 'strict',
                });
                router.push('/');
            }
        } catch (error: any) {
            setErrorMessage(error?.response?.data?.message ?? 'Xəta baş verdi.');
            setErrorVisible(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal modalVisible={errorVisible} setModalVisible={setErrorVisible}>
                <ErrorPage message={errorMessage} setModalVisible={setErrorVisible} />
            </Modal>

            <div
                className="relative min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${hospital.src})` }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-md p-10 md:p-12"
                >
                    <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
                        Qeydiyyat
                    </h1>

                    <form noValidate onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <CustomInput
                                label="Ad"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                error={formErrors.name}
                            />
                            <CustomInput
                                label="Soyad"
                                name="surname"
                                type="text"
                                value={formData.surname}
                                onChange={handleChange}
                                error={formErrors.surname}
                            />
                        </div>

                        <CustomInput
                            label="E-poçt ünvanı"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={formErrors.email}
                        />

                        <CustomInput
                            label="Telefon nömrəsi"
                            name="telephone"
                            type="text"
                            value={formData.telephone}
                            onChange={handleChange}
                            error={formErrors.telephone}
                        />

                        <CustomPassword
                            label="Şifrə"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                            error={formErrors.password}
                        />

                        <div className="mt-4">
                            <label className="text-gray-700 font-semibold">Rol</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={e =>
                                    setFormData(prev => ({ ...prev, role: e.target.value }))
                                }
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                            >
                                <option value="patient">Pasiyent</option>
                                <option value="doctor">Həkim</option>
                            </select>
                        </div>

                        <CustomButton type="submit" loading={loading} className="w-full mt-6">
                            Qeydiyyat
                        </CustomButton>
                    </form>
                </motion.div>
            </div>
        </>
    );
}
