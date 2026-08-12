import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { ItemCard } from '../components/ItemCard';
import { EmptyState } from '../components/EmptyState';
import { DigitalAgreementModal } from '../components/DigitalAgreementModal';
import { ReviewModal } from '../components/ReviewModal';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Package, 
  Calendar, 
  Heart, 
  Star, 
  PlusCircle, 
  LogOut,
  Clock,
  XCircle,
  RotateCcw,
  CheckCircle2,
  FileText
} from 'lucide-react';
import toast from 'react-hot-toast';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, logout } = useAuth();
  const { items, myBookings, myListings, wishlist, isWishlisted, cancelBooking, requestReturnAndInspection } = useBooking();

  const [selectedAgreementBooking, setSelectedAgreementBooking] = useState(null);
  const [selectedReviewBooking, setSelectedReviewBooking] = useState(null);
  const [userReviewsList, setUserReviewsList] = useState(user?.reviews || []);

  const activeTab = searchParams.get('tab') || 'bookings'; // 'listings', 'bookings', 'wishlist', 'reviews'

  const setTab = (tabName) => {
    searchParams.set('tab', tabName);
    setSearchParams(searchParams);
  };

  const wishlistedItems = items.filter(i => isWishlisted(i.id));

  const handleAddReview = (newReview) => {
    setUserReviewsList(prev => [newReview, ...prev]);
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Please log in to view your profile</h2>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const initialLetter = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* USER PROFILE HEADER CARD */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full rounded-full object-cover ring-4 ring-blue-600 shadow-lg"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-600 via-teal-500 to-indigo-600 text-white font-extrabold text-3xl sm:text-4xl flex items-center justify-center ring-4 ring-blue-600/30 shadow-lg">
                {initialLetter}
              </div>
            )}

            <span className="absolute bottom-1 right-1 p-1.5 rounded-full bg-emerald-500 text-white shadow" title="Verified Member">
              <ShieldCheck className="w-5 h-5" />
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {user.name}
              </h1>
              <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold text-xs">
                {user.role} Member
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-blue-500" />
                {user.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                {user.phone || 'Not specified'}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                {user.location || 'Bhimavaram, AP'}
              </span>
            </div>

            <div className="pt-1 flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              {user.rating ? (
                <span className="text-amber-500 font-bold flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" /> {user.rating} Rating
                </span>
              ) : (
                <span className="text-blue-600 font-bold bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md">
                  Verified Account
                </span>
              )}
              <span>•</span>
              <span>Member since {user.joined || 'August 2026'}</span>
            </div>
          </div>
        </div>

        {/* Profile Action CTAs */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => navigate('/list-item')}
            className="flex-1 sm:flex-initial px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition"
          >
            <PlusCircle className="w-4 h-4" />
            Post New Product
          </button>
          
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* TABS NAVIGATION */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setTab('bookings')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'bookings'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          My Bookings ({myBookings.length})
        </button>

        <button
          onClick={() => setTab('listings')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'listings'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          My Listings ({myListings.length})
        </button>

        <button
          onClick={() => setTab('wishlist')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'wishlist'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Heart className="w-4 h-4" />
          Wishlist ({wishlistedItems.length})
        </button>

        <button
          onClick={() => setTab('reviews')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'reviews'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Star className="w-4 h-4" />
          Reviews ({userReviewsList.length})
        </button>
      </div>

      {/* TAB CONTENT AREA */}

      {/* TAB 1: MY BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          {myBookings.length > 0 ? (
            myBookings.map(bk => (
              <div
                key={bk.id}
                className="glass-card p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-200/80 dark:border-slate-800 shadow-md"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <img
                    src={bk.itemImage}
                    alt={bk.itemTitle}
                    className="w-24 h-24 rounded-2xl object-cover"
                  />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                        bk.status === 'Cancelled' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300' : bk.status === 'Completed' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                      }`}>
                        {bk.status}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                        {bk.escrowStatus}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {bk.itemTitle}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      {bk.startDate} to {bk.endDate} ({bk.days || 1} day)
                    </p>
                    <p className="text-xs text-slate-500">
                      Seller / Owner: <span className="font-semibold text-slate-700 dark:text-slate-300">{bk.ownerName}</span>
                    </p>
                  </div>
                </div>

                {/* Right Actions & Digital Agreement */}
                <div className="text-right w-full md:w-auto flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 dark:border-slate-800 gap-3">
                  <div>
                    <span className="text-xs text-slate-400 block">Total Paid</span>
                    <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                      ₹{bk.totalPaid || (bk.totalRent + bk.deposit)}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 block mt-0.5">
                      (Includes ₹{bk.deposit} Deposit Escrow)
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* View Digital Agreement Button (Available to both Owner & Consumer) */}
                    <button
                      onClick={() => setSelectedAgreementBooking(bk)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 border border-slate-300 dark:border-slate-700 transition"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-500" />
                      Digital Agreement
                    </button>

                    {bk.status === 'Confirmed' && (
                      <>
                        <button
                          onClick={() => requestReturnAndInspection(bk.id)}
                          className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Return & Request Inspection
                        </button>

                        <button
                          onClick={() => cancelBooking(bk.id)}
                          className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 font-bold text-xs flex items-center gap-1 transition"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Cancel
                        </button>
                      </>
                    )}

                    {/* Post-Handover Review Button: Enabled ONLY after completion */}
                    {bk.status === 'Completed' ? (
                      <button
                        onClick={() => setSelectedReviewBooking(bk)}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs flex items-center gap-1 shadow-sm transition"
                      >
                        <Star className="w-3.5 h-3.5 fill-current" />
                        Write Review
                      </button>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium italic block" title="Reviews can only be written after item return and handover completion">
                        (Review available after handover return)
                      </span>
                    )}
                  </div>
                </div>

              </div>
            ))
          ) : (
            <EmptyState title="No active bookings yet" message="Explore items around you in Bhimavaram and reserve equipment with deposit protection." />
          )}
        </div>
      )}

      {/* TAB 2: MY LISTINGS */}
      {activeTab === 'listings' && (
        <div className="space-y-6">
          {myListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myListings.map(item => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="You haven't listed any items as a seller yet"
              message="Start earning passive income by sharing gear, cameras, tools, or outdoor equipment sitting unused in your home!"
              actionText="List Your First Product"
              onAction={() => navigate('/list-item')}
            />
          )}
        </div>
      )}

      {/* TAB 3: WISHLIST */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          {wishlistedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistedItems.map(item => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState title="Your wishlist is empty" message="Click the heart icon on any rental item card to save it for later." />
          )}
        </div>
      )}

      {/* TAB 4: REVIEWS */}
      {activeTab === 'reviews' && (
        <div>
          {userReviewsList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userReviewsList.map(rev => (
                <div key={rev.id} className="glass-card p-6 rounded-3xl space-y-4 border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">
                        {rev.reviewer ? rev.reviewer.charAt(0) : 'U'}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{rev.reviewer}</h4>
                        <span className="text-xs text-slate-400">{rev.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                      <Star className="w-4 h-4 fill-current" />
                      {rev.rating}.0
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-sm italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="No reviews yet" message="Reviews can strictly be posted after an item return and handover completion is verified." />
          )}
        </div>
      )}

      {/* MODALS */}
      {selectedAgreementBooking && (
        <DigitalAgreementModal
          booking={selectedAgreementBooking}
          onClose={() => setSelectedAgreementBooking(null)}
        />
      )}

      {selectedReviewBooking && (
        <ReviewModal
          booking={selectedReviewBooking}
          onClose={() => setSelectedReviewBooking(null)}
          onSubmitReview={handleAddReview}
        />
      )}

    </div>
  );
};
