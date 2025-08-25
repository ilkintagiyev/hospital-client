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
                className="relative bg-cover bg-center bg-no-repeat h-[400px] flex items-center justify-center"
                style={{
                    backgroundImage:
                        "url('https://www.livhospital.az/uploads/5392c694-ab5d-4347-89e9-705af9638546_hastane%2012.webp')",
                }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div className="relative max-w-3xl text-center px-6">
                    <h1 className="text-4xl font-extrabold text-white mb-4">
                        Sizin Sağlamlığınız Bizim Üçün Önəmlidir
                    </h1>
                    <p className="text-white text-lg md:text-xl leading-relaxed">
                        Bizim hospital geniş tibbi xidmətlər təqdim edir, peşəkar həkimlər və müasir avadanlıqlarla sizin sağlamlığınızı qorumaq üçün buradayıq. Hər bir xəstə bizim prioritetimizdir.
                    </p>
                </div>
            </section>
        </motion.div>
    );
}
