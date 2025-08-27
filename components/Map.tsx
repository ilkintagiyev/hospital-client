"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const narimanovCoords: LatLngTuple = [40.3835, 49.8249];

const Map: React.FC = () => {
  return (
    <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg mb-10">
      <MapContainer
        center={narimanovCoords}
        zoom={15}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={narimanovCoords}>
          <Popup>Nərimanov metrosu</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
