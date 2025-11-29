"use client";

import React from "react";
import { motion, useAnimation, easeOut } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function HospitalInfo() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  React.useEffect(() => {
    if (inView) controls.start("visible");
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
    <motion.div ref={ref} initial="hidden" animate={controls} variants={containerVariants}>
      <section
        className="relative h-[320px] sm:h-[380px] md:h-[460px] lg:h-[520px] flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl"
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://www.livhospital.az/uploads/5392c694-ab5d-4347-89e9-705af9638546_hastane%2012.webp')",
          }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        <div className="absolute inset-0 bg-black/50" />

        <motion.div
          className="absolute w-96 h-96 bg-blue-400/20 blur-[120px] rounded-full"
          initial={{ x: -200, y: -150, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 2 }}
        />

        <motion.div
          className="relative max-w-3xl text-center px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg">
            Sizin Sağlamlığınız Bizim Üçün Önəmlidir
          </h1>

          <motion.p
            className="text-sm sm:text-lg md:text-xl text-gray-200 mt-4 leading-relaxed drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            Bizim hospital geniş tibbi xidmətlər təqdim edir, peşəkar
            həkimlər və müasir avadanlıqlarla sizin sağlamlığınızı qorumaq üçün
            buradayıq. Hər bir xəstə bizim prioritetimizdir.
          </motion.p>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
      </section>
    </motion.div>
  );
}
