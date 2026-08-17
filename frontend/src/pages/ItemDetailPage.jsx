import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { isAdminEmail } from '../data/adminEmails';
import { MapView } from '../components/MapView';
import { EditProductModal } from '../components/EditProductModal';
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
  Maximize2,
  Send,
  Sparkles,
  ThumbsUp,
  Trash2,
  Edit3
} from 'lucide-react';
import toast from 'react-hot-toast';

export const ItemDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, isWishlisted, toggleWishlist, getProductReviews, addProductReview, deleteItem, updateItem } = useBooking();
  const { user, isAuthenticated } = useAuth();

  const item = items.find(i => i.id === id) || items[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [slideshowOpen, setSlideshowOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const isAdmin = user && isAdminEmail(user.email);
  const isOwner = user && (user.email === item?.owner?.email || user.name === item?.owner?.name);
  const canModify = isAdmin || isOwner;

  // Product Feedback Form State
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const wishlisted = isWishlisted(item.id);

  // Date selection calculation preview
  const [selectedDays, setSelectedDays] = useState(3);
  const totalRent = item.dailyRent * selectedDays;
  const totalDue = totalRent + item.deposit;

  const imagesList = item.images && item.images.length > 0 ? item.images : [
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80'
  ];

  const productReviewsList = getProductReviews(item.id);

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

  const handleProductFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedbackComment.trim()) {
      toast.error('Please write your feedback comment.');
      return;
    }

    setIsSubmittingReview(true);
    setTimeout(() => {
      addProductReview(item.id, {
        reviewer: user?.name || 'Verified Renter',
        rating: feedbackRating,
        comment: feedbackComment.trim()
      });
      setIsSubmittingReview(false);
      setFeedbackComment('');
      setIsReviewModalOpen(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Listings
      </button>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (Images, Owner, Specs, Location Map, Product Feedback) */}
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
                  className="p-3 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 backdrop-blur-md shadow hover:scale-105 transition cursor-pointer"
                  title="Share Item"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(item.id);
                  }}
                  className={`p-3 rounded-full backdrop-blur-md shadow hover:scale-105 transition cursor-pointer ${
                    wishlisted ? 'bg-rose-500 text-white' : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Navigation Arrows Overlay */}
              {imagesList.length > 1 && (
                <div className="absolute inset-y-0 inset-x-3 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={prevImage}
                    className="pointer-events-auto p-2.5 rounded-full bg-slate-900/80 text-white backdrop-blur-md hover:bg-blue-600 transition shadow-lg cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="pointer-events-auto p-2.5 rounded-full bg-slate-900/80 text-white backdrop-blur-md hover:bg-blue-600 transition shadow-lg cursor-pointer"
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
                  className={`relative w-24 h-16 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-blue-600 scale-105 shadow-md ring-2 ring-blue-500/40'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Title & Key Highlights */}
          <div className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-extrabold text-xs uppercase tracking-wide">
                {item.category}
              </span>
              {productReviewsList.length > 0 ? (
                <div className="flex items-center gap-1.5 text-amber-500 font-extrabold text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span>
                    {(productReviewsList.reduce((sum, r) => sum + (r.rating || 0), 0) / productReviewsList.length).toFixed(1)}
                  </span>
                  <span className="text-slate-400 font-normal">({productReviewsList.length} verified {productReviewsList.length === 1 ? 'review' : 'reviews'})</span>
                </div>
              ) : (
                <span className="text-slate-400 dark:text-slate-500 text-xs font-medium">No reviews yet</span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {item.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 pt-1">
              <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-rose-500" />
                {item.location.address} ({item.distanceKm || 0.8} km away)
              </span>
              <span>•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                Condition: {item.condition || 'Excellent'}
              </span>
              <span>•</span>
              <span className="text-blue-600 dark:text-blue-400">
                Est. Value: ₹{item.marketValue?.toLocaleString('en-IN') || '40,000'}
              </span>
            </div>
          </div>

          {/* Owner Profile Card */}
          <div className="glass-card p-6 rounded-3xl flex items-center justify-between border border-slate-200/80 dark:border-slate-800 shadow-md">
            <div className="flex items-center gap-4">
              <img
                src={item.owner.avatar}
                alt={item.owner.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500/20"
              />
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {item.owner.name}
                  </h3>
                  {item.owner.verified && (
                    <span className="p-0.5 rounded-full bg-emerald-500 text-white" title="Verified ID & Escrow Member">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {item.owner.rating || 5.0}
                  </span>
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
                onClick={() => toast.success(`Chat opened with owner: ${item.owner.name}`)}
                className="p-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-md shadow-blue-500/20 cursor-pointer"
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

          {/* Exact Pickup Location Map */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-rose-500" />
              Exact Pickup Location ({item.location?.city || (item.location?.address ? item.location.address.split(',')[0] : 'Local Area')})
            </h3>
            <p className="text-xs text-slate-500">{item.location?.address || 'Bhimavaram Zone'}</p>
            <MapView items={[item]} height="320px" />
          </div>

          {/* PRODUCT FEEDBACK & USER REVIEWS SECTION */}
          <div className="space-y-6 glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500 fill-current" />
                  Renter Reviews & Product Feedback
                </h3>
                <p className="text-xs text-slate-500">
                  Verified reviews and equipment condition feedback from community renters
                </p>
              </div>

              {/* Leave Product Review Button */}
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition flex items-center gap-1.5 cursor-pointer flex-shrink-0"
              >
                <Sparkles className="w-4 h-4 text-amber-300 fill-current" />
                Leave Product Feedback
              </button>
            </div>

            {/* List of Product Reviews */}
            {productReviewsList.length > 0 ? (
              <div className="space-y-4">
                {productReviewsList.map(rev => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                          {rev.reviewer ? rev.reviewer.charAt(0) : 'U'}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                            {rev.reviewer}
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                              Verified Renter
                            </span>
                          </h4>
                          <span className="text-[10px] text-slate-400">{rev.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-lg">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {rev.rating}.0
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed pt-1">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-center space-y-2">
                <p className="text-xs text-slate-500">No public feedback yet for this product. Be the first to share your rental experience!</p>
              </div>
            )}

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
                    className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
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

            {/* Price Summary Breakdown */}
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

            {/* Book Now Button or Owner Badge */}
            {isOwner ? (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 text-xs font-extrabold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    You are the Owner of this Listing
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    This is your published product. Renters can view and submit booking requests to you.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Listing
                  </button>
                  <Link
                    to="/profile?tab=listings"
                    className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs transition flex items-center justify-center gap-1.5"
                  >
                    My Dashboard
                  </Link>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate(`/book/${item.id}?days=${selectedDays}`)}
                className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base shadow-xl shadow-blue-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Proceed to Booking Request
                <ArrowRight className="w-5 h-5" />
              </button>
            )}

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-0.5">
              <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                🔒 Escrow Protected Deposit
              </p>
              <p className="text-[10px] text-slate-400">
                Direct pickup & working inspection in {item.location?.city || 'Local Area'}
              </p>
            </div>

            {/* OWNER & ADMIN EDIT / DELETE ACTION CONTROLS */}
            {canModify && (
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  {isAdmin ? '🛡️ Admin Master Controls' : '👤 Owner Listing Controls'}
                </span>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="py-2.5 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-600 dark:text-blue-400 font-bold text-xs transition border border-blue-200 dark:border-blue-800 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Product</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to permanently remove "${item.title}" from the marketplace?`)) {
                        deleteItem(item.id);
                        navigate('/explore');
                      }
                    }}
                    className="py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-600 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:text-white font-bold text-xs transition border border-rose-200 dark:border-rose-900/50 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* FULLSCREEN IMAGE LIGHTBOX MODAL */}
      {slideshowOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <button
            onClick={() => setSlideshowOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-50 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {imagesList.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-6 p-4 rounded-full bg-white/10 hover:bg-blue-600 text-white backdrop-blur-md transition shadow-2xl z-50 cursor-pointer"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

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

          {imagesList.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-6 p-4 rounded-full bg-white/10 hover:bg-blue-600 text-white backdrop-blur-md transition shadow-2xl z-50 cursor-pointer"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}
        </div>
      )}

      {/* PRODUCT FEEDBACK MODAL */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg glass-card bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500 text-white">
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base">Product Feedback & Review</h3>
                  <p className="text-xs text-slate-400">{item.title}</p>
                </div>
              </div>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProductFeedbackSubmit} className="p-6 space-y-6">
              <div className="space-y-2 text-center">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Product Rating
                </label>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setFeedbackRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition transform hover:scale-110 cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          (hoverRating || feedbackRating) >= star
                            ? 'text-amber-500 fill-current'
                            : 'text-slate-300 dark:text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  How was the product performance & working condition?
                </label>
                <textarea
                  rows={4}
                  required
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                  placeholder="e.g. The camera performed exceptionally well during our 2-day shoot. Battery lasted long, lenses were clear, and handover was prompt."
                  className="w-full p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSubmittingReview ? 'Submitting...' : 'Submit Product Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        item={item}
        onSave={updateItem}
        isSuperAdmin={isAdmin}
      />

    </div>
  );
};
