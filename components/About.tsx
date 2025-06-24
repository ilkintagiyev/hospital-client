"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const narimanovCoords = [40.3835, 49.8249];

const AboutPage = () => {
  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-10 lg:p-12 flex flex-col items-center">
      <section className="shadow-xl p-4 sm:p-6 md:p-10 lg:p-12 text-blue-900 w-full max-w-6xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-center">
          Haqqımızda
        </h1>

        <p className="text-base sm:text-lg md:text-xl leading-relaxed whitespace-pre-line mb-8">
          Bizim klinika peşəkar və təcrübəli həkim komandası ilə xidmət göstərir. Məqsədimiz
          pasiyentlərə ən yüksək səviyyədə tibbi yardım göstərmək və onların sağlamlığını qorumaqdır.

          {'\n\n'}Müasir diaqnostika və müalicə üsullarından istifadə edərək, hər bir xəstəyə fərdi yanaşma təmin edirik.
          Klinikamız geniş çeşiddə xidmətlər təklif edir və komfortlu şəraitdə müalicə imkanı yaradır.
        </p>

        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Ünvanımız və Nərimanov Metrosu istiqaməti</h2>

        <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg mb-10">
          <MapContainer center={narimanovCoords} zoom={15} scrollWheelZoom={false} className="w-full h-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={narimanovCoords}>
              <Popup>Nərimanov metrosu</Popup>
            </Marker>
          </MapContainer>
        </div>

        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Əlaqə</h2>
        <ul className="space-y-2 text-base sm:text-lg md:text-xl">
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
