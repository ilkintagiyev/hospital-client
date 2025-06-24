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

export default async function Home() {

  const [doctors, services, news] = await Promise.all([
    api.get<IDoctors[]>("/doctors"),
    api.get<IServices[]>("/services"),
    api.get<INews[]>("/news")
  ])

  return (
    <Main>
      <Hero doctors={doctors?.data} />
      <ServicesPage services={services?.data} />
      <HospitalInfo />
      <Doctors doctors={doctors?.data} />
      <News news={news?.data} />
    </Main>
  );
}
