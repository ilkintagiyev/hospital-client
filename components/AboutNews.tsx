"use client";

import React from "react";
import { INews } from "@/types/news";
import { useRouter } from "next/navigation";

interface IProps {
    newsItem: INews;
}

const AboutNews = ({ newsItem }: IProps) => {

    const router = useRouter();

    return (
        <section className="w-[90%] mx-auto my-12 p-5 bg-white rounded-lg shadow-lg">
            <button
                onClick={() => router.back()}
                className="mb-6 text-blue-500 hover:text-blue-700 transition-colors duration-200"
            >
                ← Geri
            </button>

            <h1 className="text-3xl font-bold mb-4">{newsItem.title}</h1>

            <img
                src={newsItem.image_url}
                alt={newsItem.title}
                className="w-full h-72 object-cover rounded-lg mb-6"
                loading="lazy"
            />

            <p className="text-gray-800 text-lg whitespace-pre-line">{newsItem.content}</p>

        </section>
    )
}

export default AboutNews