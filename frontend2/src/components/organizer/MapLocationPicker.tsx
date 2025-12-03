import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default Marker icon
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

export default function MapLocationPicker({ onSelect }) {
  const [position, setPosition] = useState(null);

  // Detect click on map
  function LocationSelector() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);

        // return selected coordinates to parent component
        onSelect({ lat, lng });
      },
    });
    return null;
  }

  return (
    <div className="w-full h-[400px] rounded-md overflow-hidden mb-4">
      <MapContainer
        center={[19.076, 72.8777]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* show marker after clicking */}
        {position && <Marker position={position}></Marker>}

        <LocationSelector />
      </MapContainer>
    </div>
  );
}
