import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Star, MapPin, ArrowRight, Compass } from 'lucide-react';

// Custom Leaflet Item Pin Icon
const itemIcon = L.divIcon({
  className: 'custom-leaflet-pin',
  html: `<div style="background-color: #2563eb; color: white; width: 34px; height: 34px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 14px rgba(37,99,235,0.5); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px; cursor: pointer;">B</div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
  popupAnchor: [0, -34]
});

// Custom Current Location Pulse Pin
const userLocationIcon = L.divIcon({
  className: 'custom-user-location-pin',
  html: `<div style="position: relative; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px;">
    <div style="position: absolute; width: 32px; height: 32px; border-radius: 50%; background-color: rgba(16, 185, 129, 0.4); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
    <div style="width: 18px; height: 18px; border-radius: 50%; background-color: #10b981; border: 3px solid #ffffff; box-shadow: 0 0 10px rgba(16, 185, 129, 0.8); position: relative; z-index: 2;"></div>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16]
});

// Map Controller Helper to recenter and trigger invalidateSize smoothly
const MapController = ({ center, zoom = 13 }) => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
      if (center && center[0] && center[1]) {
        map.setView(center, zoom, { animate: true });
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [map, center, zoom]);
  return null;
};

// Default Bhimavaram town center coordinates
const DEFAULT_BHIMAVARAM_COORDS = [16.5449, 81.5212];

export const MapView = ({ items = [], height = '500px', userCoords = null, showUserMarker = true }) => {
  // Always prioritize userCoords or default to Bhimavaram
  const activeCenter = userCoords && userCoords[0] && userCoords[1]
    ? userCoords
    : (items.length === 1 && items[0]?.location?.lat
        ? [items[0].location.lat, items[0].location.lng]
        : DEFAULT_BHIMAVARAM_COORDS);

  const currentUserLocation = userCoords || DEFAULT_BHIMAVARAM_COORDS;

  return (
    <div style={{ height }} className="w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 relative z-10 bg-slate-100 dark:bg-slate-900">
      
      {/* Current location badge overlay */}
      <div className="absolute top-4 right-4 z-[400] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-md flex items-center gap-1.5 pointer-events-none">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        Centered on Current Location
      </div>

      <MapContainer
        center={activeCenter}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <MapController center={activeCenter} zoom={13} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Current User Location Marker */}
        {showUserMarker && (
          <Marker position={currentUserLocation} icon={userLocationIcon}>
            <Popup className="borrowbridge-map-popup">
              <div className="p-2 text-center space-y-1">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  <Compass className="w-3 h-3" />
                  Your Location
                </div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Current Hyperlocal Center (Bhimavaram)
                </p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Rental Items Pins */}
        {items.map(item => {
          if (!item.location || !item.location.lat || !item.location.lng) return null;
          
          return (
            <Marker
              key={item.id}
              position={[item.location.lat, item.location.lng]}
              icon={itemIcon}
            >
              <Popup className="borrowbridge-map-popup">
                <div className="w-56 p-1 space-y-2">
                  <img
                    src={item.images && item.images[0] ? item.images[0] : 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80'}
                    alt={item.title}
                    className="w-full h-28 object-cover rounded-xl"
                  />
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">
                      {item.category}
                    </span>
                    <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-current" />
                      {item.rating || 5.0}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm line-clamp-1">
                    {item.title}
                  </h4>

                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-500 flex-shrink-0" />
                    <span className="truncate">{item.location.address || 'Bhimavaram'}</span>
                  </p>

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
          );
        })}
      </MapContainer>
    </div>
  );
};
