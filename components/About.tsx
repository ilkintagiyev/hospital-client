"use client";

import React from "react";
import dynamic from "next/dynamic";

// SSR-i dayandırmaq üçün Map komponentini dinamik import et
const Map = dynamic(() => import("./Map"), { ssr: false });

const AboutPage: React.FC = () => {
  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-10 lg:p-12 flex flex-col items-center">
      <section className="shadow-xl p-4 sm:p-6 md:p-10 lg:p-12 text-blue-900 w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-center">
          Haqqımızda
        </h1>

        <p className="text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line mb-8">
          Bizim klinika peşəkar və təcrübəli həkim komandası ilə xidmət göstərir. Məqsədimiz
          pasiyentlərə ən yüksək səviyyədə tibbi yardım göstərmək və onların sağlamlığını qorumaqdır.

          {"\n\n"}Müasir diaqnostika və müalicə üsullarından istifadə edərək, hər bir xəstəyə fərdi yanaşma təmin edirik.
          Klinikamız geniş çeşiddə xidmətlər təklif edir və komfortlu şəraitdə müalicə imkanı yaradır.
        </p>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
          Ünvanımız və Nərimanov Metrosu istiqaməti
        </h2>
        <Map />

        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">Əlaqə</h2>
        <ul className="space-y-2 text-sm sm:text-base md:text-lg">
          <li><strong>Telefon:</strong> +994 12 123 45 67</li>
          <li><strong>Email:</strong> info@klinika.az</li>
          <li><strong>Ünvan:</strong> Bakı şəhəri, Nərimanov rayonu, Nərimanov metrosu yaxınlığı</li>
          <li><strong>İş saatları:</strong> Həftəiçi 09:00 - 18:00, Şənbə 10:00 - 14:00, Bazar - Qapalı</li>
        </ul>
      </section>
    </main>

  );
};

export default AboutPage;
