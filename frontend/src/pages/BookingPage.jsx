import React, { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { 
  Calendar, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  CreditCard, 
  ArrowLeft,
  Info
} from 'lucide-react';
import toast from 'react-hot-toast';

export const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { items, createBooking } = useBooking();
  const { user } = useAuth();

  const item = items.find(i => i.id === id) || items[0];

  // Form State
  const [startDate, setStartDate] = useState('2026-08-10');
  const [endDate, setEndDate] = useState('2026-08-13');
  const [deliveryOption, setDeliveryOption] = useState('pickup'); // 'pickup' or 'delivery'
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Date math
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const days = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const totalRent = item.dailyRent * days;
  const deliveryFee = deliveryOption === 'delivery' ? 150.00 : 0.00;
  const platformFee = 9.00; // Non-refundable ₹9 Platform Fee
  const totalAmount = totalRent + deliveryFee + platformFee;
  const totalWithDeposit = totalAmount + item.deposit;

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!agreedToTerms) {
      toast.error('Please accept the Digital Rental Agreement to proceed.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      createBooking({
        itemId: item.id,
        itemTitle: item.title,
        itemImage: item.images[0],
        category: item.category,
        startDate,
        endDate,
        days,
        dailyRent: item.dailyRent,
        totalRent,
        deposit: item.deposit,
        totalPaid: totalWithDeposit,
        pickupType: deliveryOption === 'pickup' ? 'Local Self-Pickup' : 'Doorstep Delivery',
        ownerName: item.owner.name,
        ownerPhone: item.owner.phone
      });

      setIsSubmitting(false);
      navigate('/profile?tab=bookings');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to {item.title}
      </button>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Complete Your Rental Booking
        </h1>
        <p className="text-slate-500 text-sm">
          Review rental dates, pickup choices, deposit terms, and confirm instant reservation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Form Column (8 cols) */}
        <div className="md:col-span-7 space-y-6">
          
          {/* Selected Item Summary Card */}
          <div className="glass-card p-4 rounded-2xl flex items-center gap-4 border border-slate-200/80 dark:border-slate-800">
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div>
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                {item.category}
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-base line-clamp-1">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Lender: <span className="font-semibold text-slate-700 dark:text-slate-300">{item.owner.name}</span> ({item.distance} mi away)
              </p>
            </div>
          </div>

          {/* Date Picker Form */}
          <div className="glass-card p-6 rounded-3xl space-y-4 border border-slate-200/80 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              1. Choose Rental Dates
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Start Date (Pickup)
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  End Date (Return)
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold flex items-center justify-between">
              <span>Total Rental Duration:</span>
              <span className="text-sm font-extrabold">{days} {days === 1 ? 'Day' : 'Days'}</span>
            </div>
          </div>

          {/* Fulfillment Selection */}
          <div className="glass-card p-6 rounded-3xl space-y-4 border border-slate-200/80 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-500" />
              2. Pickup & Delivery Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setDeliveryOption('pickup')}
                className={`p-4 rounded-2xl border-2 text-left space-y-1 transition ${
                  deliveryOption === 'pickup'
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    Local Self-Pickup
                  </span>
                  <span className="text-xs font-extrabold text-emerald-600">FREE</span>
                </div>
                <p className="text-xs text-slate-500">
                  Meet lender at {item.location.address}
                </p>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryOption('delivery')}
                className={`p-4 rounded-2xl border-2 text-left space-y-1 transition ${
                  deliveryOption === 'delivery'
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-purple-500" />
                    Doorstep Delivery
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">+₹150.00</span>
                </div>
                <p className="text-xs text-slate-500">
                  Courier drops off and collects at your door
                </p>
              </button>
            </div>
          </div>

          {/* Digital Agreement Checkbox */}
          <div className="glass-card p-6 rounded-3xl space-y-4 border border-slate-200/80 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-500" />
              3. Digital Rental Agreement
            </h3>

            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-2 max-h-36 overflow-y-auto leading-relaxed border border-slate-200 dark:border-slate-700">
              <p><strong>1. Care & Use:</strong> Renter agrees to operate the equipment standard guidelines and return it in identical condition.</p>
              <p><strong>2. Deposit Authorization:</strong> A temporary deposit hold of ₹{item.deposit} will be authorized and automatically released upon safe return.</p>
              <p><strong>3. Late Fee:</strong> Late returns without owner extension notice incur 1.5x daily rental rate per additional 24 hours.</p>
            </div>

            <label className="flex items-start gap-3 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-xs text-slate-700 dark:text-slate-300 font-semibold">
                I agree to the BorrowBridge Digital Rental Agreement and authorization of the ₹{item.deposit} refundable deposit.
              </span>
            </label>
          </div>

        </div>

        {/* Right Financial Breakdown Column (5 cols) */}
        <div className="md:col-span-5">
          <div className="glass-card p-6 rounded-3xl space-y-6 border border-slate-200/80 dark:border-slate-800 shadow-xl sticky top-28">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg pb-3 border-b border-slate-100 dark:border-slate-800">
              Rental Summary
            </h3>

            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Daily Rent (₹{item.dailyRent} × {days} days)</span>
                <span className="font-semibold text-slate-900 dark:text-white">₹{totalRent.toFixed(2)}</span>
              </div>

              {deliveryOption === 'delivery' && (
                <div className="flex justify-between">
                  <span>Doorstep Courier Fee</span>
                  <span className="font-semibold text-slate-900 dark:text-white">₹150.00</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  Platform Fee
                  <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded">Non-refundable</span>
                </span>
                <span className="font-extrabold text-slate-900 dark:text-white">₹9.00</span>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between font-bold text-slate-900 dark:text-white">
                <span>Rental Subtotal</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex justify-between items-center text-xs font-bold text-emerald-800 dark:text-emerald-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Refundable Security Deposit:
                </span>
                <span className="text-sm font-extrabold">₹{item.deposit}</span>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-baseline text-lg font-extrabold text-slate-900 dark:text-white">
                <span>Total Authorized</span>
                <span className="text-blue-600 dark:text-blue-400">₹{totalWithDeposit.toFixed(2)}</span>
              </div>
            </div>

            {/* Confirm Booking CTA Button */}
            <button
              onClick={handleConfirmBooking}
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-base shadow-xl shadow-blue-500/30 transition hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Authorizing & Reserving...</span>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Confirm & Reserve Item
                </>
              )}
            </button>

            <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
              <Lock className="w-3 h-3 text-slate-400" />
              256-Bit SSL Encrypted Escrow Check-out
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
