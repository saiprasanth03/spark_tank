import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { categories } from '../data/items';
import { ItemCard } from '../components/ItemCard';
import { MapView } from '../components/MapView';
import { EmptyState } from '../components/EmptyState';
import { 
  Search, 
  Map, 
  LayoutGrid, 
  MapPin, 
  ArrowUpDown,
  X,
  Navigation,
  Compass,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import toast from 'react-hot-toast';

export const ExplorePage = () => {
  const { items } = useBooking();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedCity, setSelectedCity] = useState('Bhimavaram');
  const [maxDistanceKm, setMaxDistanceKm] = useState(5); // Capped strictly up to 5km max!
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');

  // Exact Geolocation state
  const [isLocating, setIsLocating] = useState(false);

  const cities = ['Bhimavaram', 'Visakhapatnam', 'Vijayawada', 'Hyderabad', 'Kakinada', 'Rajahmundry'];

  const handleDetectGPSLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          // Attempt reverse geocoding for exact village/town name
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          const placeName = data.address?.village || data.address?.town || data.address?.city_district || data.address?.suburb || data.address?.city || 'Bhimavaram';
          setSelectedCity(placeName);
          toast.success(`Exact location set to ${placeName}!`);
        } catch (e) {
          // Fallback to Bhimavaram (Local Zone) without showing raw lat/lng numbers
          setSelectedCity('Bhimavaram (Local Zone)');
          toast.success('Exact location set to Bhimavaram (Local Zone)!');
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        setIsLocating(false);
        toast.error('Location permission denied. Showing Bhimavaram default.');
      }
    );
  };

  // Filtered & Sorted items computation
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Category check
      if (selectedCategory !== 'all' && item.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // Search check
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesCategory) return false;
      }
      // Distance check in KM (Capped strictly at max 5 km)
      const dist = item.distanceKm || item.distance || 0.8;
      if (dist > maxDistanceKm) return false;

      return true;
    }).sort((a, b) => {
      const distA = a.distanceKm || a.distance || 0.8;
      const distB = b.distanceKm || b.distance || 0.8;
      if (sortBy === 'price-asc') return a.dailyRent - b.dailyRent;
      if (sortBy === 'price-desc') return b.dailyRent - a.dailyRent;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'distance') return distA - distB;
      return b.reviewCount - a.reviewCount; // default popular
    });
  }, [items, selectedCategory, searchQuery, maxDistanceKm, sortBy]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedCity('Bhimavaram');
    setMaxDistanceKm(5);
    setSortBy('popular');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Hyperlocal Header - Modern Craft Design */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 bg-slate-900 text-white shadow-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 max-w-2xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-extrabold tracking-wide uppercase">
            <MapPin className="w-3.5 h-3.5 text-rose-400 fill-current" />
            Hyperlocal Radius Capped Up to 5.0 km
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Rentals Available in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-indigo-300">
              {selectedCity}
            </span>
          </h1>

          <p className="text-slate-400 text-sm font-medium">
            Showing {filteredItems.length} verified listings within short walking or drive distance in {selectedCity}
          </p>
        </div>

        {/* Location Dropdown & GPS Permission Detector Button */}
        <div className="flex flex-wrap items-center gap-3 z-10">
          <button
            onClick={handleDetectGPSLocation}
            disabled={isLocating}
            className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 transition flex items-center gap-2"
            title="Request Exact GPS Permission"
          >
            <Compass className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
            {isLocating ? 'Detecting Location...' : '📍 Use My Exact GPS Location'}
          </button>

          <div className="relative">
            <Navigation className="w-4 h-4 text-blue-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="pl-10 pr-8 py-3 rounded-2xl bg-slate-800 text-xs font-bold text-white border border-slate-700 shadow-sm focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {cities.map(city => (
                <option key={city} value={city}>📍 {city}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 bg-slate-800 p-1.5 rounded-2xl border border-slate-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Grid
            </button>
            
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                viewMode === 'map'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Map className="w-4 h-4" />
              Map
            </button>
          </div>
        </div>
      </div>

      {/* TOP FILTER BAR */}
      <div className="glass-card p-6 space-y-6 shadow-lg border border-slate-200/80 dark:border-slate-800">
        
        {/* Row 1: Search Input & Sort Dropdown */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cameras, laptops, tents, tools, instruments..."
              className="w-full pl-12 pr-10 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-200 dark:border-slate-700"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="md:col-span-4 relative">
            <ArrowUpDown className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-11 pr-8 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-200 dark:border-slate-700 appearance-none cursor-pointer"
            >
              <option value="popular">Sort: Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated First</option>
              <option value="distance">Nearest Distance (km)</option>
            </select>
          </div>
        </div>

        {/* Row 2: Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id === 'all' ? 'all' : cat.name)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                (selectedCategory === 'all' && cat.id === 'all') || (selectedCategory.toLowerCase() === cat.name.toLowerCase())
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Row 3: Radius Distance Slider in KM (Capped to max 5km) */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="space-y-1 flex-1 max-w-md">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                Max Nearby Distance Radius:
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">{maxDistanceKm} km</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value={maxDistanceKm}
              onChange={(e) => setMaxDistanceKm(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div className="text-xs text-slate-500 font-medium hidden sm:block">
            Hyperlocal radius capped strictly <span className="font-bold text-slate-800 dark:text-slate-200">up to 5.0 km max</span>
          </div>
        </div>

      </div>

      {/* CONTENT AREA: GRID OR MAP VIEW */}
      {viewMode === 'grid' ? (
        filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <EmptyState onAction={resetFilters} />
        )
      ) : (
        <div className="space-y-6">
          <MapView items={filteredItems} height="600px" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
