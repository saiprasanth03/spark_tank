import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, ShieldCheck, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const ItemCard = ({ item }) => {
  const navigate = useNavigate();
  const { isWishlisted, toggleWishlist } = useBooking();
  const wishlisted = isWishlisted(item.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="glass-card overflow-hidden group flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-300"
    >
      <div>
        {/* Item Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-900/80 text-white backdrop-blur-md shadow">
              {item.category}
            </span>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(item.id);
              }}
              className={`pointer-events-auto p-2 rounded-full backdrop-blur-md shadow-lg transition-transform active:scale-90 ${
                wishlisted
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-white'
              }`}
              title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Condition & Distance Badges */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-600/90 text-white backdrop-blur-md flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              {item.condition}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-600/90 text-white backdrop-blur-md flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {item.distance} mi
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-3">
          
          {/* Rating & Owner */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{item.rating}</span>
              <span className="text-slate-400 dark:text-slate-500 font-normal">({item.reviewCount})</span>
            </div>

            <div className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
              <img
                src={item.owner.avatar}
                alt={item.owner.name}
                className="w-4 h-4 rounded-full object-cover"
              />
              <span className="truncate max-w-[100px]">{item.owner.name}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-900 dark:text-white text-base line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {item.title}
          </h3>

          {/* Price & Deposit */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-baseline justify-between">
            <div>
              <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                ₹{item.dailyRent}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium"> / day</span>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 dark:text-slate-500 block">Deposit</span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-0.5 justify-end">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
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
          className="w-full py-2 px-3 text-center text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition"
        >
          Details
        </Link>
        <button
          onClick={() => navigate(`/book/${item.id}`)}
          className="w-full py-2 px-3 flex items-center justify-center gap-1 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition active:scale-95"
        >
          Book Now
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

    </motion.div>
  );
};
