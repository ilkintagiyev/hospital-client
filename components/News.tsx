"use client";

import { INews } from "@/types/news";
import { useRouter } from "next/navigation";
import React from "react";

interface IProps {
    news: INews[];
}

const News = ({ news }: IProps) => {

    const router = useRouter();

    return (
        <section className="my-12 py-5 w-[95%]  mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {news?.map(({ id, title, content, image_url }: INews) => (
                    <article
                        onClick={() => router?.push(`/news/${id}`)}
                        key={id}
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col"
                    >
                        <img
                            src={image_url}
                            alt={title}
                            className="w-full h-48 object-cover rounded-t-lg"
                            loading="lazy"
                        />
                        <div className="p-5 flex flex-col flex-grow">
                            <h2 className="text-xl font-bold mb-2">{title}</h2>
                            <p className="text-gray-700 line-clamp-4 flex-grow">{content}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default News;
