import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icons
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
  const [mapInstance, setMapInstance] = useState(null);
  const [searchText, setSearchText] = useState("");

  function LocationSelector() {
    const map = useMap();
    if (!mapInstance) setMapInstance(map);

    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        onSelect({ lat, lng });
      },
    });

    return null;
  }

  // Handle Locate Me button
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        onSelect({ lat: latitude, lng: longitude });
        if (mapInstance) mapInstance.flyTo([latitude, longitude], 15);
        console.log("My location:", { latitude, longitude });
      },
      () => alert("Unable to retrieve your location")
    );
  };

  // Handle search
  const handleSearch = async () => {
    if (!searchText) return;
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({ query: searchText });
    if (results.length > 0) {
      const { x: lng, y: lat } = results[0];
      setPosition([lat, lng]);
      onSelect({ lat, lng });
      if (mapInstance) mapInstance.flyTo([lat, lng], 15);
    } else {
      alert("Location not found");
    }
  };

  return (
    <div>
      {/* Controls outside the map */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search location..."
          style={{ flex: 1, padding: "6px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "6px 12px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
        <button
          onClick={handleLocateMe}
          style={{
            padding: "6px 12px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Locate Me
        </button>
      </div>

      {/* Map */}
      <MapContainer
        center={[18.5204, 73.8567]}
        zoom={12}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {position && <Marker position={position} />}
        <LocationSelector />
      </MapContainer>
    </div>
  );
}
