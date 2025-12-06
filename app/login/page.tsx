"use client";

import api from "@/constants/api";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Spinner from "@/shared/Loading";
import Modal from "@/components/Modal";
import ErrorPage from "@/shared/Error";
import { CustomInput } from "@/shared/CustomInput";
import { CustomPassword } from "@/shared/CustomPassword";
import CustomButton from "@/shared/CustomButton";
import hospital from "@/assets/hospital.jpg";

export default function Login() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [formErrors, setFormErrors] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value.trimStart(),
        }));

        setFormErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const newErrors = {
            email: !formData.email.trim() ? "E-poçt boş ola bilməz." : "",
            password: !formData.password.trim() ? "Şifrə boş ola bilməz." : "",
        };

        setFormErrors(newErrors);

        if (newErrors.email || newErrors.password) {
            setLoading(false);
            return;
        }

        try {
            const { data } = await api.post("/login", formData);

            if (data?.token) {
                Cookies.set("token", data.token, {
                    expires: 7,
                    secure: true,
                    sameSite: "strict",
                });
                router.push("/");
                setLoading(false)
            }
        } catch (error: any) {
            setErrorMessage(error?.response?.data?.message ?? "Xəta baş verdi.");
            setErrorVisible(true);
        }
    };

    return (
        <>
            <Modal
                modalVisible={errorVisible}
                setModalVisible={setErrorVisible}
                okText="Close"
            >
                <ErrorPage
                    message={errorMessage}
                    setModalVisible={setErrorVisible}
                />
            </Modal>

            <div
                className="relative min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${hospital.src})` }}
            >
                {loading && <Spinner />}

                <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-md p-8">
                    <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
                        Giriş
                    </h1>

                    <form noValidate onSubmit={handleSubmit} className="space-y-5">

                        <CustomInput
                            label="E-poçt ünvanı"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={formErrors.email}
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

                        <CustomButton type="submit" loading={loading}>
                            Daxil ol
                        </CustomButton>
                    </form>

                    <p className="mt-6 text-center text-sm text-blue-600">
                        <span className="text-blue-400 cursor-pointer hover:underline transition-all duration-200">
                            Hesabın yoxdur?
                        </span>

                        <button
                            type="button"
                            onClick={() => {
                                setLoading(true);
                                router.push("/register");
                            }}
                            className="font-semibold hover:underline text-blue-700 ml-[10px]"
                        >
                            Qeydiyyatdan keç
                        </button>
                    </p>
                </div>
            </div>
        </>
    );
}
