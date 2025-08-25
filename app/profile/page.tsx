"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { Form, Input, Button, Select, InputNumber, message, Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Main from "@/layout/Main";
import api from "@/constants/api";
import { useServices } from "@/hooks/useServices";
import { setUptadeRender } from "@/store/slices/global";
import Loading from "@/components/Loading";

const { Option } = Select;
const { TextArea } = Input;

interface Service {
    id: number;
    name: string;
}

interface ProfileData {
    name: string;
    surname: string;
    email: string;
    telephone: string;
    gender: string;
    experience_years: number;
    work_days: string;
    service_id: number;
    bachelor_degre: string;
    master_degree: string;
    bio: string;
    facebook_url: string;
    instagram_url: string;
    linkedin_url: string;
    photo_url: string;
}

export default function MyProfile() {
    const dispatch = useDispatch();

    const { services } = useServices();

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { user, updateRender } = useSelector((state: any) => state.global);

    useEffect(() => {

        api.get(`/aboutDoctor/${user?.id}`).then(res => {
            form.setFieldsValue({
                service_id: res?.data?.service_id,
                photo: res?.data?.photo,
                experience_years: res?.data?.experience_years,
                gender: res?.data?.gender,
                work_days: res?.data?.work_days,
                rating: res?.data?.rating,
                bio: res?.data?.bio,
                bachelor_degree: res?.data?.bachelor_degree,
                master_degree: res?.data?.master_degree,
                instagram_url: res?.data?.instagram_url,
                facebook_url: res?.data.facebook_url
            })
        })

        form.setFieldsValue({
            name: user?.name,
            surname: user?.surname,
            email: user?.email,
            telephone: user?.telephone
        });
    }, [form, user, updateRender]);


    const onFinish = async (values: ProfileData) => {
        setLoading(true);

        try {
            await api.put("/doctors", values);
            dispatch(setUptadeRender(!updateRender))
        } catch (error) {
            message.error("Yeniləmə zamanı xəta baş verdi.");
        }
        setLoading(false);
    };

    if (loading) return <Loading />

    return (
        <Main>
            <div style={{ padding: 24 }}>
                <h1 className="text-2xl font-semibold mb-6">Profili Redaktə Et</h1>
                <div>
                    <Form
                        className="w-full mt-5"
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{}}
                    >
                        <div className="flex flex-wrap gap-6 mb-4">
                            <div className="flex-1 min-w-[150px] max-w-[calc(33.333%-1.5rem)]">
                                <Form.Item name="name" label="Ad">
                                    <Input style={{ height: "50px" }} />
                                </Form.Item>
                            </div>
                            <div className="flex-1 min-w-[150px] max-w-[calc(33.333%-1.5rem)]">
                                <Form.Item name="surname" label="Soyad">
                                    <Input style={{ height: "50px" }} />
                                </Form.Item>
                            </div>
                            <div className="flex-1 min-w-[150px] max-w-[calc(33.333%-1.5rem)]">
                                <Form.Item name="email" label="Email">
                                    <Input style={{ height: "50px" }} />
                                </Form.Item>
                            </div>
                            <div className="flex-1 min-w-[150px] max-w-[calc(33.333%-1.5rem)]">
                                <Form.Item name="telephone" label="Telefon">
                                    <Input style={{ height: "50px" }} />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-6 mb-4">

                            <div className="flex-1 min-w-[150px] max-w-[calc(33.333%-1.5rem)]">
                                <Form.Item name="gender" label="Cinsiyyət">
                                    <Select style={{ height: "50px" }}>
                                        <Option value="male">Kişi</Option>
                                        <Option value="female">Qadın</Option>
                                        <Option value="other">Digər</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="flex-1 min-w-[150px] max-w-[calc(33.333%-1.5rem)]">
                                <Form.Item name="bachelor_degree" label="Bakalavr dərəcəsi">
                                    <Input
                                        style={{ height: "50px" }}
                                        placeholder="Bakalavr dərəcəsini daxil edin"
                                    />
                                </Form.Item>
                            </div>
                            <div className="flex-1 min-w-[150px] max-w-[calc(33.333%-1.5rem)]">
                                <Form.Item name="master_degree" label="Magistr dərəcəsi">
                                    <Input
                                        style={{ height: "50px" }}
                                        placeholder="Magistr dərəcəsini daxil edin"
                                    />
                                </Form.Item>
                            </div>
                            <div className="flex-1 min-w-[150px] max-w-[calc(33.333%-1.5rem)]">
                                <Form.Item name="experience_years" label="Təcrübə (il)">
                                    <InputNumber
                                        style={{ height: "50px", width: "100%" }}
                                        min={0}
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-6 mb-4">
                            <div className="flex-1 min-w-[150px] max-w-[calc(33.333%-1.5rem)]">
                                <Form.Item name="work_days" label="İş günləri">
                                    <Input placeholder="Məs: Mon,Wed,Fri" style={{ height: "50px" }} />
                                </Form.Item>
                            </div>
                            <div className="flex-1 min-w-[150px] max-w-[calc(33.333%-1.5rem)]">
                                <Form.Item
                                    name="service_id"
                                    label="Xidmət"
                                >
                                    <Select options={services} style={{ height: "50px" }} />
                                </Form.Item>
                            </div>
                            <div className="flex-1 min-w-[150px] max-w-[calc(33.333%-1.5rem)]">
                                <Form.Item name="facebook_url" label="Facebook linki">
                                    <Input style={{ height: "50px" }} />
                                </Form.Item>
                            </div>
                            <div className="flex-1 min-w-[150px] max-w-[calc(33.333%-1.5rem)]">
                                <Form.Item name="instagram_url" label="Instagram linki">
                                    <Input style={{ height: "50px" }} />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-6 mb-4">
                            <div className="flex-1 min-w-[150px] max-w-[calc(50%-0.75rem)]">
                                <Form.Item name="photo_url" label="Şəkil URL">
                                    <TextArea disabled rows={4} />
                                </Form.Item>
                            </div>
                            <div className="flex-1 min-w-[150px] max-w-[calc(50%-0.75rem)]">
                                <Form.Item name="bio" label="Haqqımda">
                                    <TextArea rows={4} />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button
                                className="w-[200px]!"
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                block
                            >
                                Yenilə
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>

        </Main>
    );
}
