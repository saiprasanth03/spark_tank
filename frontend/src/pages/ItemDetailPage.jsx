import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { MapView } from '../components/MapView';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  Heart, 
  Phone, 
  MessageSquare, 
  UserCheck, 
  Share2, 
  ArrowLeft,
  ArrowRight,
  Info,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2
} from 'lucide-react';
import toast from 'react-hot-toast';

export const ItemDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, isWishlisted, toggleWishlist } = useBooking();

  const item = items.find(i => i.id === id) || items[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [slideshowOpen, setSlideshowOpen] = useState(false);
  const wishlisted = isWishlisted(item.id);

  // Date selection calculation preview
  const [selectedDays, setSelectedDays] = useState(3);
  const totalRent = item.dailyRent * selectedDays;
  const totalDue = totalRent + item.deposit;

  const imagesList = item.images && item.images.length > 0 ? item.images : [
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80'
  ];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % imagesList.length);
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Listings
      </button>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (Images, Owner, Specs, Map) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Image Gallery */}
          <div className="space-y-3">
            <div 
              onClick={() => setSlideshowOpen(true)}
              className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-xl group cursor-pointer"
            >
              <img
                src={imagesList[activeImageIndex]}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 rounded-full bg-slate-900/80 text-white text-xs font-bold backdrop-blur-md shadow flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5" />
                  Click to Expand Slideshow
                </span>
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare();
                  }}
                  className="p-3 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 backdrop-blur-md shadow hover:scale-105 transition"
                  title="Share Item"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(item.id);
                  }}
                  className={`p-3 rounded-full backdrop-blur-md shadow hover:scale-105 transition ${
                    wishlisted ? 'bg-rose-500 text-white' : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Navigation Arrows Overlay on Main Image */}
              {imagesList.length > 1 && (
                <div className="absolute inset-y-0 inset-x-3 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={prevImage}
                    className="pointer-events-auto p-2.5 rounded-full bg-slate-900/80 text-white backdrop-blur-md hover:bg-blue-600 transition shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="pointer-events-auto p-2.5 rounded-full bg-slate-900/80 text-white backdrop-blur-md hover:bg-blue-600 transition shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Product Thumbnails Gallery Strip */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
              {imagesList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 h-16 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-blue-600 scale-105 shadow-md ring-2 ring-blue-500/40'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Product Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Title & Category Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold text-xs">
                {item.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {item.condition}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                {item.distanceKm || item.distance || 0.8} km away
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {item.title}
            </h1>
          </div>

          {/* Owner Profile Card */}
          <div className="glass-card p-5 rounded-2xl flex items-center justify-between border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <img
                src={item.owner.avatar}
                alt={item.owner.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-500"
              />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-1.5">
                  Lender: {item.owner.name}
                  {item.owner.verified && <UserCheck className="w-4 h-4 text-blue-500 fill-blue-500/20" />}
                </h4>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {item.owner.rating} Rating
                  </span>
                  <span>•</span>
                  <span>{item.owner.responseRate} Response Rate</span>
                  <span>•</span>
                  <span>{item.owner.location}</span>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <a
                href={`tel:${item.owner.phone}`}
                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 transition"
                title="Call Lender"
              >
                <Phone className="w-5 h-5" />
              </a>
              <button
                onClick={() => toast.success(`Chat opened with ${item.owner.name}`)}
                className="p-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-md shadow-blue-500/20"
                title="Message Lender"
              >
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Description & Specs */}
          <div className="space-y-6 glass-card p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Item Description
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {item.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Key Specifications & Included Accessories
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {item.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Location Map */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              Pickup Location Neighborhood
            </h3>
            <p className="text-xs text-slate-500">{item.location.address}</p>
            <MapView items={[item]} height="320px" />
          </div>

        </div>

        {/* Right Column (Sticky Booking Widget) */}
        <div className="lg:col-span-4">
          <div className="glass-card p-6 rounded-3xl space-y-6 sticky top-28 border border-slate-200/80 dark:border-slate-800 shadow-xl">
            
            {/* Price Header */}
            <div className="flex items-baseline justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                  ₹{item.dailyRent}
                </span>
                <span className="text-xs text-slate-500 font-medium"> / day</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Security Deposit</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 justify-end">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  ₹{item.deposit}
                </span>
              </div>
            </div>

            {/* Quick Duration Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-500" />
                Select Rental Duration:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 3, 5, 7].map(d => (
                  <button
                    key={d}
                    onClick={() => setSelectedDays(d)}
                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                      selectedDays === d
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {d} {d === 1 ? 'Day' : 'Days'}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Summary Breakdown (Updated Platform Fee to ₹9) */}
            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between">
                <span>Rental (₹{item.dailyRent} × {selectedDays} days)</span>
                <span className="font-semibold text-slate-900 dark:text-white">₹{totalRent}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  Refundable Deposit
                  <Info className="w-3 h-3 text-slate-400" title="Returned immediately upon item return" />
                </span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">₹{item.deposit}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee (Non-refundable)</span>
                <span className="font-bold text-slate-900 dark:text-white">₹9</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-base font-extrabold text-slate-900 dark:text-white">
                <span>Estimated Total</span>
                <span className="text-blue-600 dark:text-blue-400">₹{totalDue + 9}</span>
              </div>
            </div>

            {/* Book Now Button */}
            <button
              onClick={() => navigate(`/book/${item.id}?days=${selectedDays}`)}
              className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base shadow-xl shadow-blue-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Proceed to Booking
              <ArrowRight className="w-5 h-5" />
            </button>

          </div>
        </div>

      </div>

      {/* FULLSCREEN IMAGE SLIDESHOW LIGHTBOX MODAL WITH < > NAVIGATION BUTTONS */}
      {slideshowOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          
          <button
            onClick={() => setSlideshowOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-50"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button < */}
          {imagesList.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-6 p-4 rounded-full bg-white/10 hover:bg-blue-600 text-white backdrop-blur-md transition shadow-2xl z-50"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {/* Main Slideshow Image */}
          <div className="max-w-5xl max-h-[80vh] flex flex-col items-center gap-4">
            <img
              src={imagesList[activeImageIndex]}
              alt={item.title}
              className="max-w-full max-h-[70vh] rounded-3xl object-contain shadow-2xl border border-white/10"
            />
            <span className="text-white font-bold text-sm bg-slate-900/80 px-4 py-1.5 rounded-full border border-white/20">
              Image {activeImageIndex + 1} of {imagesList.length}
            </span>
          </div>

          {/* Next Button > */}
          {imagesList.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-6 p-4 rounded-full bg-white/10 hover:bg-blue-600 text-white backdrop-blur-md transition shadow-2xl z-50"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

        </div>
      )}

    </div>
  );
};
