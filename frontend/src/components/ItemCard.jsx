import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, ShieldCheck, Heart, ArrowRight, CheckCircle2, Trash2 } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { isAdminEmail } from '../data/adminEmails';

export const ItemCard = ({ item }) => {
  const navigate = useNavigate();
  const { isWishlisted, toggleWishlist, deleteItem, productReviews } = useBooking();
  const { user } = useAuth();

  // Compute rating only from real submitted reviews — never use hardcoded item.rating
  const realReviews = (productReviews && productReviews[item.id]) || [];
  const hasRealReviews = realReviews.length > 0;
  const avgRating = hasRealReviews
    ? (realReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / realReviews.length).toFixed(1)
    : null;
  const wishlisted = isWishlisted(item.id);

  const isAdmin = user && isAdminEmail(user.email);
  const isOwner = user && (user.email === item.owner?.email || user.name === item.owner?.name);
  const canDelete = isAdmin || isOwner;

  const distanceText = item.distanceKm ? `${item.distanceKm} km away` : `${item.distance || 0.8} km away`;
  const locationCity = (() => {
    if (item.location?.city && item.location.city !== 'Bhimavaram') return item.location.city;
    if (item.location?.address) {
      const parts = item.location.address.split(',').map(s => s.trim());
      const matched = parts.find(p => /visakhapatnam|vizag|bhimavaram|hyderabad|vijayawada|kakinada|rajahmundry|guntur|tirupati|bengaluru/i.test(p));
      if (matched) return matched;
      if (parts.length >= 3) return parts[parts.length - 3] || parts[1];
      return parts[0];
    }
    return item.location?.city || 'Local Area';
  })();

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to permanently remove "${item.title}"?`)) {
      deleteItem(item.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="glass-card overflow-hidden group flex flex-col justify-between shadow-sm hover:shadow-2xl hover:border-blue-500/30 dark:hover:border-blue-500/40 transition-all duration-300 rounded-2xl"
    >
      <div>
        {/* Item Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-900">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          {/* Gradient Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-extrabold uppercase tracking-wide bg-slate-950/80 text-white backdrop-blur-md border border-white/10 shadow">
              {item.category}
            </span>

            <div className="flex items-center gap-1.5">
              {/* Admin / Owner Quick Remove Button */}
              {canDelete && (
                <button
                  onClick={handleDelete}
                  className="pointer-events-auto p-2 rounded-full bg-rose-600/90 text-white hover:bg-rose-700 backdrop-blur-md shadow-lg transition-transform active:scale-90 cursor-pointer"
                  title="Remove Listing (Admin/Owner Action)"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Wishlist Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleWishlist(item.id);
                }}
                className={`pointer-events-auto p-2 rounded-full backdrop-blur-md shadow-lg transition-transform active:scale-90 cursor-pointer ${
                  wishlisted
                    ? 'bg-rose-500 text-white'
                    : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-white'
                }`}
                title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Condition & Distance Overlay Badges */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-600/90 text-white backdrop-blur-md flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              {item.condition}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-600/90 text-white backdrop-blur-md flex items-center gap-1 shadow">
              <MapPin className="w-3 h-3" />
              {distanceText}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-3">
          
          {/* Location & Star Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-semibold truncate max-w-[140px]">
              <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
              <span className="truncate">{locationCity}</span>
            </div>

            {hasRealReviews ? (
              <div className="flex items-center gap-1 text-amber-500 font-extrabold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{avgRating}</span>
                <span className="text-slate-400 dark:text-slate-500 font-normal">({realReviews.length})</span>
              </div>
            ) : (
              <span className="text-slate-400 dark:text-slate-600 text-[10px] font-medium">No reviews yet</span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-heading font-extrabold text-slate-900 dark:text-white text-base line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {item.title}
          </h3>

          {/* Owner Info */}
          <div className="flex items-center gap-2 pt-1">
            <img
              src={item.owner.avatar}
              alt={item.owner.name}
              className="w-5 h-5 rounded-full object-cover ring-1 ring-blue-500"
            />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">
              {item.owner.name}
            </span>
          </div>

          {/* Price & Deposit Breakdown */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-baseline justify-between">
            <div>
              <span className="font-heading text-2xl font-black text-blue-600 dark:text-blue-400">
                ₹{item.dailyRent}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium"> / day</span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 block uppercase font-bold tracking-wider">Safety Deposit</span>
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 justify-end">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                ₹{item.deposit}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
        <Link
          to={`/item/${item.id}`}
          className="w-full py-2 px-3 text-center text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition"
        >
          View Details
        </Link>
        <button
          onClick={() => navigate(`/book/${item.id}`)}
          className="w-full py-2 px-3 flex items-center justify-center gap-1 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition active:scale-95 cursor-pointer"
        >
          Book Now
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

    </motion.div>
  );
};
