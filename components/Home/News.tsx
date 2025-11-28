"use client";

import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { INews } from "@/types/news";
import { useRouter } from "next/navigation";
import { easeOut } from "framer-motion";
import { useDispatch } from "react-redux";
import { setLoading } from "@/store/slices/global";

interface IProps {
  news: INews[];
}

const News = ({ news }: IProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  return (
    <section className="my-12 py-5 w-[95%] mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <motion.h2
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-xl sm:text-2xl lg:text-3xl font-semibold text-blue-600 mb-2 relative inline-block 
            after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] 
            after:w-0 after:bg-blue-500 after:transition-all 
            after:duration-300 hover:after:w-full"
        >
          Ən Son Xəbərlər
        </motion.h2>
        <button

          onClick={() => {
            dispatch(setLoading(true));
            router.push(`/news`);

            setTimeout(() => {
              dispatch(setLoading(false));
            }, 700)
          }
          }
          className="h-[35px] sm:h-[38px] md:h-[35px] w-[90px] sm:w-[100px] md:w-[110px] text-xs sm:text-sm md:text-sm text-white rounded-md bg-blue-600 hover:bg-blue-700 transition duration-200 shadow-sm hover:shadow-md"
        >
          Hamısına bax
        </button>
      </div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-[10px]"
      >
        {news?.slice(0, 4).map(({ id, title, content, image_url }: INews) => (
          <div
            onClick={() => {
              dispatch(setLoading(true));
              router.push(`/news/${id}`)
              setTimeout(() => {
                dispatch(setLoading(false));  // Loading OFF
              }, 700);
            }
            }
            key={id}
            className="cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:bg-blue-500 hover:text-white transition-colors duration-300"
          >
            <img
              src={image_url}
              alt={title}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm line-clamp-3">{content}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </section >
  );
};

export default News;
