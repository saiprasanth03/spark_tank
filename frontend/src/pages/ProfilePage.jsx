import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { ItemCard } from '../components/ItemCard';
import { EmptyState } from '../components/EmptyState';
import { DigitalAgreementModal } from '../components/DigitalAgreementModal';
import { ReviewModal } from '../components/ReviewModal';
import { PickupInspectionModal } from '../components/PickupInspectionModal';
import { RenterPaymentModal } from '../components/RenterPaymentModal';
import { ReturnHandoverModal } from '../components/ReturnHandoverModal';
import { WebsiteFeedbackModal } from '../components/WebsiteFeedbackModal';
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
  FileText,
  AlertTriangle,
  ClipboardCheck,
  CreditCard,
  ArrowRight,
  Sparkles,
  Zap,
  Check,
  MessageSquare,
  Send
} from 'lucide-react';
import toast from 'react-hot-toast';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, logout } = useAuth();
  const { 
    items, 
    myBookings, 
    myListings, 
    wishlist, 
    isWishlisted, 
    productReviews,
    websiteFeedbacks,
    acceptBookingRequest,
    declineBookingRequest,
    submitPickupInspection,
    renterAcceptAndPay,
    initiateReturn,
    submitReturnHandover,
    cancelBooking 
  } = useBooking();

  // Active Modals
  const [selectedAgreementBooking, setSelectedAgreementBooking] = useState(null);
  const [selectedReviewBooking, setSelectedReviewBooking] = useState(null);
  const [inspectionBooking, setInspectionBooking] = useState(null);
  const [paymentBooking, setPaymentBooking] = useState(null);
  const [returnHandoverBooking, setReturnHandoverBooking] = useState(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [userReviewsList, setUserReviewsList] = useState(user?.reviews || []);

  const activeTab = searchParams.get('tab') || 'bookings';
  const [bookingRoleView, setBookingRoleView] = useState('renter'); // 'renter' or 'owner'

  const setTab = (tabName) => {
    searchParams.set('tab', tabName);
    setSearchParams(searchParams);
  };

  const wishlistedItems = items.filter(i => isWishlisted(i.id));

  const displayListings = items.filter(item => 
    myListings.some(l => l.id === item.id) ||
    item.id.startsWith('item-178') ||
    item.id.startsWith('item-17') ||
    (item.owner?.email && user?.email && item.owner.email.toLowerCase() === user.email.toLowerCase()) ||
    (item.owner?.name && user?.name && item.owner.name.toLowerCase() === user.name.toLowerCase())
  );

  const handleAddReview = (newReview) => {
    setUserReviewsList(prev => [newReview, ...prev]);
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Please log in to view your profile</h2>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold cursor-pointer"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const initialLetter = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  // Stepper helper
  const getStageIndex = (stage) => {
    switch (stage) {
      case 'REQUESTED': return 1;
      case 'ACCEPTED': return 2;
      case 'INSPECTION_PENDING_RENTER': return 3;
      case 'ACTIVE': return 4;
      case 'RETURN_INITIATED': return 4;
      case 'COMPLETED': return 5;
      case 'DECLINED':
      case 'CANCELLED': return 0;
      default: return 1;
    }
  };

  const pendingIncomingOwnerRequests = myBookings.filter(b => b.stage === 'REQUESTED');
  const pendingOwnerCount = pendingIncomingOwnerRequests.length;

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
                {user.phone || '+91 98765 43210'}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                {user.location || 'Bhimavaram, AP'}
              </span>
            </div>

            <div className="pt-1 flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span className="text-blue-600 font-bold bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Escrow Guarantee
              </span>
              <span>•</span>
              <span>Member since {user.joined || 'August 2026'}</span>
            </div>
          </div>
        </div>

        {/* Profile Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setIsFeedbackModalOpen(true)}
            className="px-4 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md shadow-amber-500/25 flex items-center justify-center gap-1.5 transition cursor-pointer"
            title="Give Website Feedback"
          >
            <MessageSquare className="w-4 h-4" />
            Website Feedback
          </button>

          <button
            onClick={() => navigate('/list-item')}
            className="flex-1 sm:flex-initial px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            Post Product
          </button>
          
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
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
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-extrabold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'bookings'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Rental Bookings & Handover ({myBookings.length})
        </button>

        <button
          onClick={() => setTab('listings')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-extrabold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'listings'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          My Listings ({displayListings.length})
        </button>

        <button
          onClick={() => setTab('wishlist')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-extrabold transition-all whitespace-nowrap cursor-pointer ${
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
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-extrabold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'reviews'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Star className="w-4 h-4" />
          Reviews & Feedback ({userReviewsList.length + websiteFeedbacks.length})
        </button>
      </div>

      {/* TAB CONTENT AREA */}

      {/* TAB 1: RENTALS & BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          
          {/* Incoming Owner Requests Alert Banner */}
          {pendingOwnerCount > 0 && (
            <div className="p-5 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in slide-in-from-top-2">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-amber-500 text-white shadow-md animate-pulse">
                  <Zap className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    {pendingOwnerCount} Incoming Rental {pendingOwnerCount === 1 ? 'Request' : 'Requests'} Received!
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-black">
                      Action Required
                    </span>
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    A user has requested dates for your product. Click below to review dates and approve the rental.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setBookingRoleView('owner')}
                className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md shadow-amber-500/25 transition flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
              >
                <span>Switch to Owner View & Accept</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Sub-view Switcher: Renter vs Owner View */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                Peer-to-Peer Rental Lifecycle Hub
                {bookingRoleView === 'owner' ? (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                    Lender / Owner Perspective
                  </span>
                ) : (
                  <span className="text-xs font-bold text-blue-600 bg-blue-100 dark:bg-blue-950/60 px-2 py-0.5 rounded-full">
                    Borrower / Renter Perspective
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-500">
                {bookingRoleView === 'owner'
                  ? 'Manage incoming booking requests from other users, log pickup inspections, and settle return deposits.'
                  : 'Manage items you are borrowing, review owner condition inspections, pay deposit into Escrow, and initiate returns.'}
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700 flex-shrink-0">
              <button
                onClick={() => setBookingRoleView('renter')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  bookingRoleView === 'renter'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                👤 As Renter (My Borrowed Gear)
              </button>
              <button
                onClick={() => setBookingRoleView('owner')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  bookingRoleView === 'owner'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <span>🏷️ As Owner</span>
                {pendingOwnerCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px] font-black animate-pulse">
                    {pendingOwnerCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Bookings List */}
          {myBookings.length > 0 ? (
            <div className="space-y-6">
              {myBookings.map(bk => {
                const stageIndex = getStageIndex(bk.stage);
                const isRenterView = bookingRoleView === 'renter';

                return (
                  <div
                    key={bk.id}
                    className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-6"
                  >
                    
                    {/* Top Row: Item Details & Current Status Badges */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-4">
                        <img
                          src={bk.itemImage}
                          alt={bk.itemTitle}
                          className="w-20 h-20 rounded-2xl object-cover"
                        />
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                              bk.stage === 'COMPLETED'
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                                : bk.stage === 'ACTIVE'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                                : bk.stage === 'REQUESTED'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                                : 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300'
                            }`}>
                              {bk.status}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              {bk.escrowStatus}
                            </span>
                          </div>

                          <h3 className="font-bold text-slate-900 dark:text-white text-base">
                            {bk.itemTitle}
                          </h3>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                              <Calendar className="w-3.5 h-3.5 text-blue-500" />
                              {bk.startDate} to {bk.endDate} ({bk.days} {bk.days === 1 ? 'day' : 'days'})
                            </span>
                            <span>•</span>
                            <span>{isRenterView ? `Owner: ${bk.ownerName} (${bk.ownerPhone})` : `Renter: ${bk.renterName} (${bk.renterPhone})`}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-left md:text-right space-y-0.5">
                        <span className="text-xs text-slate-400 block">Total Escrow Funds</span>
                        <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                          ₹{bk.totalPaid || (bk.totalRent + bk.deposit)}
                        </span>
                        <span className="text-xs font-semibold text-emerald-600 block">
                          (₹{bk.totalRent} Rent + ₹{bk.deposit} Deposit)
                        </span>
                      </div>
                    </div>

                    {/* Stepper Progress Bar */}
                    <div className="space-y-2">
                      <div className="grid grid-cols-5 gap-2 text-center text-[11px] font-bold">
                        <span className={stageIndex >= 1 ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}>
                          1. Date Requested
                        </span>
                        <span className={stageIndex >= 2 ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}>
                          2. Owner Accepted
                        </span>
                        <span className={stageIndex >= 3 ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}>
                          3. Inspect & Pay
                        </span>
                        <span className={stageIndex >= 4 ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}>
                          4. Active Rental
                        </span>
                        <span className={stageIndex >= 5 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}>
                          5. Returned & Settled
                        </span>
                      </div>

                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden flex">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full transition-all duration-500 rounded-full"
                          style={{ width: `${(Math.max(1, stageIndex) / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Pre-Rental Inspection Notes Badge */}
                    {bk.pickupInspection && (
                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <ClipboardCheck className="w-4 h-4 text-emerald-500" />
                          <span className="font-bold text-slate-800 dark:text-slate-200">Physical Working Inspection Logged:</span>
                          <span className="text-slate-500 truncate max-w-md">{bk.pickupInspection.notes}</span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600">✓ 4/4 Checks Passed</span>
                      </div>
                    )}

                    {/* Return Settlement Badge */}
                    {bk.returnInspection && (
                      <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-emerald-800 dark:text-emerald-200 font-bold">
                        <span>
                          {bk.returnInspection.hasDamage
                            ? `⚠️ Damage Settled: ₹${bk.returnInspection.damageAmount} paid to owner. ₹${bk.returnInspection.refundAmount} refunded to renter.`
                            : `✓ Verified Safe Return: 100% of ₹${bk.deposit} security deposit refunded to renter.`}
                        </span>
                        <span className="text-[10px] text-slate-500 font-normal">
                          {new Date(bk.returnInspection.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    )}

                    {/* Dynamic Action Buttons per Role & Stage */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                      
                      {/* Left: View Digital Agreement */}
                      <button
                        onClick={() => setSelectedAgreementBooking(bk)}
                        className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 border border-slate-300 dark:border-slate-700 transition cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-blue-500" />
                        Digital Rental Agreement
                      </button>

                      {/* Right: Stage-Specific Lifecycle Actions */}
                      <div className="flex flex-wrap items-center gap-2">
                        
                        {/* OWNER ACTIONS */}
                        {!isRenterView && (
                          <>
                            {bk.stage === 'REQUESTED' && (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => acceptBookingRequest(bk.id)}
                                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 transition cursor-pointer hover:scale-105"
                                >
                                  <Check className="w-4 h-4" />
                                  Accept Dates & Request
                                </button>
                                <button
                                  onClick={() => declineBookingRequest(bk.id)}
                                  className="px-4 py-2 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 hover:bg-rose-100 font-bold text-xs transition cursor-pointer"
                                >
                                  Decline
                                </button>
                              </div>
                            )}

                            {bk.stage === 'ACCEPTED' && (
                              <button
                                onClick={() => setInspectionBooking(bk)}
                                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition cursor-pointer"
                              >
                                <ClipboardCheck className="w-4 h-4" />
                                Log Working Condition Inspection
                              </button>
                            )}

                            {bk.stage === 'INSPECTION_PENDING_RENTER' && (
                              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-3 py-1.5 rounded-xl border border-amber-200">
                                ⏳ Waiting for Renter to Accept & Pay Escrow
                              </span>
                            )}

                            {(bk.stage === 'ACTIVE' || bk.stage === 'RETURN_INITIATED') && (
                              <button
                                onClick={() => setReturnHandoverBooking(bk)}
                                className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-teal-600/20 transition cursor-pointer"
                              >
                                <RotateCcw className="w-4 h-4" />
                                Perform Return Handover & Settle Deposit
                              </button>
                            )}
                          </>
                        )}

                        {/* RENTER ACTIONS */}
                        {isRenterView && (
                          <>
                            {bk.stage === 'REQUESTED' && (
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-3 py-1.5 rounded-xl border border-amber-200">
                                  ⏳ Request with Owner ({bk.ownerName})
                                </span>
                                <button
                                  onClick={() => setBookingRoleView('owner')}
                                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow transition flex items-center gap-1 cursor-pointer"
                                  title="Switch to Owner view to approve this request"
                                >
                                  <span>Accept as Owner</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => cancelBooking(bk.id)}
                                  className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 hover:bg-rose-100 font-bold text-xs transition cursor-pointer"
                                >
                                  Cancel
                                </button>
                              </div>
                            )}

                            {bk.stage === 'ACCEPTED' && (
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-3 py-1.5 rounded-xl border border-blue-200">
                                  📍 Owner accepted! Meet owner at {bk.ownerLocation || 'Bhimavaram'} for working inspection
                                </span>
                                <button
                                  onClick={() => setBookingRoleView('owner')}
                                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow transition flex items-center gap-1 cursor-pointer"
                                  title="Switch to Owner view to log inspection"
                                >
                                  <span>Inspect as Owner</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}

                            {bk.stage === 'INSPECTION_PENDING_RENTER' && (
                              <button
                                onClick={() => setPaymentBooking(bk)}
                                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-blue-500/25 transition cursor-pointer animate-bounce"
                              >
                                <CreditCard className="w-4 h-4" />
                                Review Inspection & Pay Escrow (₹{bk.totalPaid})
                              </button>
                            )}

                            {bk.stage === 'ACTIVE' && (
                              <button
                                onClick={() => initiateReturn(bk.id)}
                                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                Initiate Return to Owner
                              </button>
                            )}

                            {bk.stage === 'RETURN_INITIATED' && (
                              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 px-3 py-1.5 rounded-xl border border-teal-200">
                                🔄 Return in progress — Owner is verifying final working condition
                              </span>
                            )}

                            {bk.stage === 'COMPLETED' && (
                              <button
                                onClick={() => setSelectedReviewBooking(bk)}
                                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                              >
                                <Star className="w-3.5 h-3.5 fill-current" />
                                Write Verified Review
                              </button>
                            )}
                          </>
                        )}

                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="No active bookings yet"
              message="Explore items in Bhimavaram and send your first date-range booking request to an owner."
              actionText="Explore Marketplace"
              onAction={() => navigate('/explore')}
            />
          )}

        </div>
      )}

      {/* TAB 2: MY LISTINGS */}
      {activeTab === 'listings' && (
        <div className="space-y-6">
          {displayListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayListings.map(item => (
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

      {/* TAB 4: REVIEWS & FEEDBACK */}
      {activeTab === 'reviews' && (
        <div className="space-y-8">
          
          {/* Top Row: Feedback Header & Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-blue-600/10 via-teal-600/10 to-amber-500/10 border border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 fill-current" />
                Community Feedback & Verified Reviews
              </h3>
              <p className="text-xs text-slate-500">
                View verified equipment reviews and platform feedback from the Bhimavaram community.
              </p>
            </div>

            <button
              onClick={() => setIsFeedbackModalOpen(true)}
              className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer flex-shrink-0"
            >
              <MessageSquare className="w-4 h-4" />
              Give Website Feedback
            </button>
          </div>

          {/* Section 1: User Rental & Product Reviews */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Verified Equipment & Rental Handover Reviews
            </h4>

            {userReviewsList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userReviewsList.map(rev => (
                  <div key={rev.id} className="glass-card p-5 rounded-2xl space-y-3 border border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                          {rev.reviewer ? rev.reviewer.charAt(0) : 'U'}
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-900 dark:text-white text-xs">{rev.reviewer}</h5>
                          <span className="text-[10px] text-slate-400">{rev.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-lg">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {rev.rating}.0
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-xs italic">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No verified rental reviews yet.</p>
            )}
          </div>

          {/* Section 2: Platform & Website Feedback */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-500" />
              Platform & Website Feedback
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {websiteFeedbacks.map(fb => (
                <div key={fb.id} className="glass-card p-5 rounded-2xl space-y-3 border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px] font-bold">
                      {fb.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {fb.rating}.0
                    </div>
                  </div>

                  <div>
                    <h5 className="font-extrabold text-slate-900 dark:text-white text-xs">{fb.title}</h5>
                    <p className="text-slate-600 dark:text-slate-300 text-xs mt-1 leading-relaxed">
                      "{fb.message}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex justify-between text-[10px] text-slate-400">
                    <span>By {fb.submittedBy}</span>
                    <span>{fb.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

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

      {inspectionBooking && (
        <PickupInspectionModal
          booking={inspectionBooking}
          onClose={() => setInspectionBooking(null)}
          onSubmitInspection={submitPickupInspection}
        />
      )}

      {paymentBooking && (
        <RenterPaymentModal
          booking={paymentBooking}
          onClose={() => setPaymentBooking(null)}
          onConfirmPayment={renterAcceptAndPay}
        />
      )}

      {returnHandoverBooking && (
        <ReturnHandoverModal
          booking={returnHandoverBooking}
          onClose={() => setReturnHandoverBooking(null)}
          onSubmitReturnHandover={submitReturnHandover}
        />
      )}

      {isFeedbackModalOpen && (
        <WebsiteFeedbackModal
          isOpen={isFeedbackModalOpen}
          onClose={() => setIsFeedbackModalOpen(false)}
        />
      )}

    </div>
  );
};
