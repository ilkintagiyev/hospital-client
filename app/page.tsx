import ErrorPage from "@/components/Error";
import Doctors from "@/components/Home/Doctors";
import Hero from "@/components/Home/Hero";
import HospitalInfo from "@/components/Home/HospitalInfo";
import News from "@/components/Home/News";
import ServicesPage from "@/components/Home/Services";
import api from "@/constants/api";
import Main from "@/layout/Main";
import { IDoctors } from "@/types/doctors";
import { INews } from "@/types/news";
import { IServices } from "@/types/services";
import Image from "next/image";
import { useState } from "react";

export default async function Home() {

  try {
    const [doctorsRes, servicesRes, newsRes] = await Promise.allSettled([
      api.get<IDoctors[]>("/doctors"),
      api.get<IServices[]>("/services"),
      api.get<INews[]>("/news")
    ]);

    const doctors = doctorsRes.status === "fulfilled" ? doctorsRes.value.data : [];
    const services = servicesRes.status === "fulfilled" ? servicesRes.value.data : [];
    const news = newsRes.status === "fulfilled" ? newsRes.value.data : [];

    return (
      <Main>
        <Hero doctors={doctors} />
        <ServicesPage services={services} />
        <HospitalInfo />
        <Doctors doctors={doctors} />
        <News news={news} />
      </Main>
    );
  } catch (error) {
    console.log(error);
  }
}
