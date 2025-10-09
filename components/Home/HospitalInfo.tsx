"use client"

import React from "react";
import { easeOut, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function HospitalInfo() {

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
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
        >
            <section
                className="relative bg-cover bg-center bg-no-repeat h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] flex items-center justify-center"
                style={{
                    backgroundImage:
                        "url('https://www.livhospital.az/uploads/5392c694-ab5d-4347-89e9-705af9638546_hastane%2012.webp')",
                }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div className="relative max-w-3xl text-center px-4 sm:px-6 md:px-8 lg:px-12">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3 sm:mb-4">
                        Sizin Sağlamlığınız Bizim Üçün Önəmlidir
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed">
                        Bizim hospital geniş tibbi xidmətlər təqdim edir, peşəkar həkimlər və müasir avadanlıqlarla sizin sağlamlığınızı qorumaq üçün buradayıq. Hər bir xəstə bizim prioritetimizdir.
                    </p>
                </div>
            </section>
        </motion.div>
    );
}
