import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Star, MapPin, ArrowRight } from 'lucide-react';

// Custom Leaflet Pin Icon with DivIcon
const customIcon = L.divIcon({
  className: 'custom-leaflet-pin',
  html: `<div style="background-color: #2563eb; color: white; width: 34px; height: 34px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 14px rgba(37,99,235,0.5); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; cursor: pointer;">B</div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
  popupAnchor: [0, -34]
});

// Map Controller Helper to trigger invalidateSize when Map is mounted or resized
const MapController = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
      if (center) {
        map.setView(center, map.getZoom());
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [map, center]);
  return null;
};

export const MapView = ({ items = [], height = '500px' }) => {
  const center = items.length > 0
    ? [items[0].location.lat, items[0].location.lng]
    : [37.7749, -122.4194]; // Default SF coordinates

  return (
    <div style={{ height }} className="w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 relative z-10 bg-slate-100 dark:bg-slate-900">
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <MapController center={center} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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
