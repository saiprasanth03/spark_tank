import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import { Star, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';

// Custom Leaflet Pin Icon
const customIcon = L.divIcon({
  className: 'custom-leaflet-pin',
  html: `<div style="background-color: #2563eb; color: white; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 12px rgba(37,99,235,0.4); display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px;">B</div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

export const MapView = ({ items, height = '500px' }) => {
  const center = items.length > 0
    ? [items[0].location.lat, items[0].location.lng]
    : [37.7749, -122.4194]; // Default SF coordinates

  return (
    <div style={{ height }} className="w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 relative z-10">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {items.map(item => (
          <Marker
            key={item.id}
            position={[item.location.lat, item.location.lng]}
            icon={customIcon}
          >
            <Popup className="borrowbridge-map-popup">
              <div className="w-56 p-1 space-y-2">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-28 object-cover rounded-xl"
                />
                
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">
                    {item.category}
                  </span>
                  <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                    <Star className="w-3 h-3 fill-current" />
                    {item.rating}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm line-clamp-1">
                  {item.title}
                </h4>

                <div className="flex items-baseline justify-between pt-1 border-t border-slate-100">
                  <div>
                    <span className="text-base font-extrabold text-blue-600">
                      ₹{item.dailyRent}
                    </span>
                    <span className="text-xs text-slate-500">/day</span>
                  </div>

                  <Link
                    to={`/item/${item.id}`}
                    className="px-3 py-1 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center gap-1 hover:bg-blue-700 transition"
                  >
                    View
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
