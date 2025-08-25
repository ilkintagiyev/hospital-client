import Detail from '@/components/Doctors/Detail'
import Doctors from '@/components/Home/Doctors'
import api from '@/constants/api'
import Main from '@/layout/Main'
import React from 'react'
import { notFound } from 'next/navigation'


export const dynamic = 'force-dynamic' 

const Page = async ({ params }: any) => {
    try {
        const doctorResponse = await api.get(`/aboutDoctor/${params.id}`);
        const doctor = doctorResponse.data;

        const relatedResponse = await api.get(`/relatedDoctors/${doctor.service_id}`);
        const relatedDoctors = relatedResponse.data.filter(
            (item: any) => item.doctor_id !== doctor?.doctor_id
        );

        return (
            <Main>
                <Detail doctor={doctor || []} />
                <Doctors doctors={relatedDoctors || []} />
            </Main>
        );
    } catch (err) {
        console.error("Error loading doctor detail:", err);
        return notFound();
    }
};

export default Page;
