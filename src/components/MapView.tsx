import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { HealthService } from '../types';

const customPinkIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
  className: 'pink-icon'
});

interface MapViewProps {
  services: HealthService[];
}

const MapView: React.FC<MapViewProps> = ({ services }) => {
  return (
    <div className="h-[768px] rounded-xl overflow-hidden border border-pink-200 shadow-sm"> {/* Dynamically set height */}
      <MapContainer
        center={[28.6139, 77.2090]} // Delhi coordinates
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"  // Ensure the map fills the container
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {services.map((service) => (
          <Marker
            key={service.id}
            position={[
              28.6139 + Math.random() * 0.02,
              77.2090 + Math.random() * 0.02,
            ]}
            icon={customPinkIcon}
          >
            <Popup>
              {service.name}<br />
              {service.address}<br />
              {service.phone}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
