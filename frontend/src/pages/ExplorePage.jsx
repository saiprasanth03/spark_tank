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
  Sparkles,
  Sliders
} from 'lucide-react';
import toast from 'react-hot-toast';

export const ExplorePage = () => {
  const { items } = useBooking();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedCity, setSelectedCity] = useState('Bhimavaram');
  const [userCoords, setUserCoords] = useState([16.5449, 81.5212]);
  const [maxDistanceKm, setMaxDistanceKm] = useState(5); // Capped strictly up to 5km max!
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState('grid');
  const [isLocating, setIsLocating] = useState(false);

  const cities = ['Bhimavaram', 'Visakhapatnam', 'Vijayawada', 'Hyderabad', 'Kakinada', 'Rajahmundry'];

  const categoryIcons = {
    all: '✨',
    Cameras: '📷',
    Laptops: '💻',
    Projectors: '📽️',
    Tools: '🛠️',
    Camping: '⛺',
    Sports: '⚽',
    Music: '🎸',
    Drones: '🛸',
    Electronics: '🔌',
    Books: '📚'
  };

  const handleDetectGPSLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserCoords([latitude, longitude]);

        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          const placeName = data.address?.village || data.address?.town || data.address?.city_district || data.address?.suburb || data.address?.city || 'Bhimavaram';
          setSelectedCity(placeName);
          toast.success(`Location set to ${placeName}!`);
        } catch (e) {
          setSelectedCity('Bhimavaram (Local Zone)');
          toast.success('Location set to Bhimavaram (Local Zone)!');
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
    const isAllCategory = !selectedCategory || selectedCategory.toLowerCase() === 'all' || selectedCategory.toLowerCase() === 'all categories';

    return items.filter(item => {
      if (!isAllCategory && item.category && item.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title?.toLowerCase().includes(q);
        const matchesDesc = item.description?.toLowerCase().includes(q);
        const matchesCategory = item.category?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesCategory) return false;
      }
      const dist = item.distanceKm || item.distance || 0.8;
      if (dist > maxDistanceKm) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'latest') {
        const isCustomA = a.id.startsWith('item-17') ? 1 : 0;
        const isCustomB = b.id.startsWith('item-17') ? 1 : 0;
        if (isCustomA !== isCustomB) return isCustomB - isCustomA;
        return 0;
      }
      if (sortBy === 'popular') {
        const isCustomA = a.id.startsWith('item-17') ? 1 : 0;
        const isCustomB = b.id.startsWith('item-17') ? 1 : 0;
        if (isCustomA !== isCustomB) return isCustomB - isCustomA;
        return b.reviewCount - a.reviewCount;
      }
      const distA = a.distanceKm || a.distance || 0.8;
      const distB = b.distanceKm || b.distance || 0.8;
      if (sortBy === 'price-asc') return a.dailyRent - b.dailyRent;
      if (sortBy === 'price-desc') return b.dailyRent - a.dailyRent;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'distance') return distA - distB;
      return 0;
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
      
      {/* Human-Designed Hero Header */}
      <div className="relative rounded-3xl p-6 sm:p-10 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 text-xs font-bold border border-teal-200/60 dark:border-teal-800/60">
            <MapPin className="w-3.5 h-3.5 text-teal-600 fill-current" />
            Hyperlocal Radius: Max 5.0 km
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Rent Anything in{' '}
            <span className="text-teal-600 dark:text-teal-400">
              {selectedCity}
            </span>
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            Discover verified cameras, tools, laptops, and outdoor gear within walking or short driving distance.
          </p>
        </div>

        {/* GPS Permission Detector Button */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleDetectGPSLocation}
            disabled={isLocating}
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs shadow-sm hover:opacity-90 transition flex items-center gap-2 cursor-pointer"
            title="Request Exact GPS Permission"
          >
            <Compass className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
            {isLocating ? 'Detecting...' : '📍 Use My GPS Location'}
          </button>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Grid
            </button>
            
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'map'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              Map
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl space-y-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        
        {/* Row 1: Search Input & Sort Dropdown */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cameras, laptops, tents, tools, instruments..."
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 border border-slate-200 dark:border-slate-700"
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
              className="w-full pl-11 pr-8 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 cursor-pointer appearance-none"
            >
              <option value="latest">Sort: 🆕 Newly Added (Latest First)</option>
              <option value="popular">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated First</option>
              <option value="distance">Nearest Distance (km)</option>
            </select>
          </div>
        </div>

        {/* Row 2: Category Tab Selectors */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => {
            const icon = categoryIcons[cat.name] || categoryIcons[cat.id] || '📦';
            const isSelected = (selectedCategory === 'all' && cat.id === 'all') || (selectedCategory.toLowerCase() === cat.name.toLowerCase());
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id === 'all' ? 'all' : cat.name)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Row 3: Distance Slider */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="space-y-1 flex-1 max-w-md">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                Distance Radius:
              </span>
              <span className="text-teal-600 dark:text-teal-400 font-extrabold">{maxDistanceKm} km</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value={maxDistanceKm}
              onChange={(e) => setMaxDistanceKm(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
          </div>

          <div className="text-xs text-slate-400 font-medium hidden sm:block">
            Strictly capped up to <span className="font-bold text-slate-700 dark:text-slate-300">5.0 km max</span>
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
          <MapView items={filteredItems} height="600px" userCoords={userCoords} />
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
