import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { categories } from '../data/items';
import { ItemCard } from '../components/ItemCard';
import { MapView } from '../components/MapView';
import { EmptyState } from '../components/EmptyState';
import { 
  Search, 
  SlidersHorizontal, 
  Map, 
  LayoutGrid, 
  IndianRupee, 
  MapPin, 
  ArrowUpDown,
  X,
  Filter
} from 'lucide-react';

export const ExplorePage = () => {
  const { items } = useBooking();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [maxDistance, setMaxDistance] = useState(50);
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'price-asc', 'price-desc', 'rating', 'distance'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'

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
      // Price check
      if (item.dailyRent > maxPrice) return false;
      // Distance check
      if (item.distance > maxDistance) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.dailyRent - b.dailyRent;
      if (sortBy === 'price-desc') return b.dailyRent - a.dailyRent;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'distance') return a.distance - b.distance;
      return b.reviewCount - a.reviewCount; // default popular
    });
  }, [items, selectedCategory, searchQuery, maxPrice, maxDistance, sortBy]);

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
    setMaxPrice(200);
    setMaxDistance(50);
    setSortBy('popular');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Explore Rental Items
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Browse {filteredItems.length} items available for daily borrow in your community
          </p>
        </div>

        {/* View Mode Toggle Switch */}
        <div className="flex items-center gap-2 bg-slate-200/70 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-300 dark:border-slate-700 self-start md:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              viewMode === 'grid'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:text-blue-600'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Grid View
          </button>
          
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              viewMode === 'map'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:text-blue-600'
            }`}
          >
            <Map className="w-4 h-4" />
            Map View
          </button>
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
              placeholder="Search cameras, laptops, tents, tools, guitars..."
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
              <option value="distance">Nearest Distance</option>
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

        {/* Row 3: Sliders (Price & Distance Radius) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100 dark:border-slate-800">
          
          {/* Max Price Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-blue-500" />
                Max Daily Rate:
              </span>
              <span className="text-blue-600 dark:text-blue-400 font-extrabold text-sm">₹{maxPrice}/day</span>
            </div>
            <input
              type="range"
              min="50"
              max="5000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Radius Distance Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                Max Distance Radius:
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">{maxDistance} miles</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
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
