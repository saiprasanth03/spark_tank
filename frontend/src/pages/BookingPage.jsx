import React, { useState } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { DigitalAgreementModal } from '../components/DigitalAgreementModal';
import { 
  Calendar, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  ArrowLeft,
  Info,
  Clock,
  ClipboardCheck,
  Zap,
  UserCheck,
  FileText,
  Upload,
  Camera
} from 'lucide-react';
import toast from 'react-hot-toast';

export const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { items, createBookingRequest } = useBooking();
  const { user } = useAuth();

  const item = items.find(i => i.id === id) || items[0];

  // Form State
  const [startDate, setStartDate] = useState('2026-08-18');
  const [endDate, setEndDate] = useState('2026-08-20');
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [idProofBase64, setIdProofBase64] = useState('');
  const [hasViewedAgreement, setHasViewedAgreement] = useState(false);
  const [isAgreementModalOpen, setIsAgreementModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Date calculations
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const days = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const totalRent = item.dailyRent * days;
  const platformFee = 9.00;
  
  // 50% Trust Discount on Deposit if ID Proof is uploaded
  const effectiveDeposit = idProofBase64 ? Math.round(item.deposit * 0.5) : item.deposit;
  
  const estimatedTotal = totalRent + effectiveDeposit + platformFee;

  const handleIdProofUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIdProofBase64(reader.result);
        toast.success('ID Proof securely attached. Deposit reduced by 50%!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendBookingRequest = (e) => {
    e.preventDefault();
    if (!agreedToTerms) {
      toast.error('Please accept the rental terms to proceed.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      createBookingRequest({
        itemId: item.id,
        itemTitle: item.title,
        itemImage: item.images[0],
        category: item.category,
        startDate,
        endDate,
        days,
        dailyRent: item.dailyRent,
        totalRent,
        deposit: effectiveDeposit,
        platformFee,
        totalPaid: estimatedTotal,
        renterIdProof: idProofBase64,
        pickupType: deliveryOption === 'pickup' ? 'Local Self-Pickup' : 'Doorstep Delivery',
        renterName: user?.name || 'Registered Renter',
        renterEmail: user?.email || 'renter@example.com',
        renterPhone: user?.phone || '+91 98765 43210',
        ownerName: item.owner.name,
        ownerPhone: item.owner.phone,
        ownerEmail: item.owner.email || 'seller@example.com',
        ownerLocation: item.owner.location || item.location.address,
        customTerms: item.customTerms
      });

      setIsSubmitting(false);
      navigate('/profile?tab=bookings');
    }, 800);
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

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800/60">
          <Zap className="w-3.5 h-3.5 text-amber-500 fill-current" />
          Step 1: Date Range Booking Request
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Request Equipment Rental
        </h1>
        <p className="text-slate-500 text-sm">
          Select your dates and send a request to the owner. <span className="font-semibold text-emerald-600 dark:text-emerald-400">Zero upfront charge</span> until the owner accepts and joint physical working condition inspection is completed.
        </p>
      </div>

      {/* 4-Step Rental Lifecycle Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-1">
          <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 font-mono">STEP 1</span>
          <p className="text-xs font-bold text-slate-900 dark:text-white">Request Dates</p>
          <p className="text-[11px] text-slate-500">Choose rental dates with 0 upfront cost</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
          <span className="text-xs font-extrabold text-slate-400 font-mono">STEP 2</span>
          <p className="text-xs font-bold text-slate-900 dark:text-white">Owner Accepts</p>
          <p className="text-[11px] text-slate-500">Lender confirms dates & coordinates meetup</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
          <span className="text-xs font-extrabold text-slate-400 font-mono">STEP 3</span>
          <p className="text-xs font-bold text-slate-900 dark:text-white">Joint Inspection & Pay</p>
          <p className="text-[11px] text-slate-500">Test working order, sign & pay Escrow</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
          <span className="text-xs font-extrabold text-slate-400 font-mono">STEP 4</span>
          <p className="text-xs font-bold text-slate-900 dark:text-white">Return & Refund</p>
          <p className="text-[11px] text-slate-500">Deposit refunded or damage settled</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Form Column (7 cols) */}
        <div className="md:col-span-7 space-y-6">
          
          {/* Selected Item Summary Card */}
          <div className="glass-card p-4 rounded-2xl flex items-center gap-4 border border-slate-200/80 dark:border-slate-800">
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                {item.category}
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-base line-clamp-1">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500">
                Lender: <span className="font-semibold text-slate-700 dark:text-slate-300">{item.owner.name}</span> ({item.distanceKm || 0.8} km away)
              </p>
            </div>
          </div>

          {/* Date Range Picker */}
          <div className="glass-card p-6 rounded-3xl space-y-4 border border-slate-200/80 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Choose Date Range
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Rental Start Date (Pickup)
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
                  Rental End Date (Return)
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
              <span>Requested Duration:</span>
              <span className="text-sm font-extrabold">{days} {days === 1 ? 'Day' : 'Days'}</span>
            </div>
          </div>

          {/* Pickup Method */}
          <div className="glass-card p-6 rounded-3xl space-y-4 border border-slate-200/80 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-500" />
              Pickup & Handover Location
            </h3>

            <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-500" />
                  Direct Physical Meetup & Inspection
                </span>
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                  FREE
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Meet owner directly at: <span className="font-semibold text-slate-700 dark:text-slate-300">{item.location.address}</span>
              </p>
            </div>
          </div>

          {/* ID Verification */}
          <div className="glass-card p-6 rounded-3xl space-y-4 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-500" />
                  ID Verification (Optional)
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-semibold">
                  Upload a valid ID proof (Aadhar/PAN) to instantly get a <span className="text-emerald-500 font-extrabold">50% discount</span> on the required security deposit!
                </p>
              </div>
            </div>

            {idProofBase64 ? (
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">ID Proof Verified</p>
                    <p className="text-[11px] text-emerald-600 font-bold">50% Trust Discount Applied to Deposit!</p>
                  </div>
                </div>
                <button
                  onClick={() => setIdProofBase64('')}
                  className="text-xs font-bold text-slate-400 hover:text-rose-500 transition"
                >
                  Remove
                </button>
              </div>
            ) : (
              <label className="p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-center bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/80 transition cursor-pointer flex flex-col items-center justify-center gap-2 group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleIdProofUpload}
                  className="hidden"
                />
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Click to Upload ID Proof Image
                  </p>
                  <p className="text-[10px] text-slate-500">Securely verified. Never shared with the owner.</p>
                </div>
              </label>
            )}
          </div>

          {/* Terms Acceptance */}
          <div className="glass-card p-6 rounded-3xl space-y-4 border border-slate-200/80 dark:border-slate-800">
            
            <button
              onClick={() => {
                setIsAgreementModalOpen(true);
                setHasViewedAgreement(true);
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-sm flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700 transition cursor-pointer"
            >
              <FileText className="w-4 h-4 text-blue-500" />
              View Digital Rental Agreement
            </button>

            <label className={`flex items-start gap-3 transition-opacity ${!hasViewedAgreement ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
              <input
                type="checkbox"
                checked={agreedToTerms}
                disabled={!hasViewedAgreement}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-blue-600 rounded focus:ring-blue-500 disabled:cursor-not-allowed"
              />
              <span className="text-xs text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                I agree to meet the owner for working condition verification, accept the Digital Rental Agreement upon pickup, and authorize the refundable security deposit of ₹{effectiveDeposit}.
              </span>
            </label>
            {!hasViewedAgreement && (
              <p className="text-[10px] text-rose-500 font-bold ml-7">
                * You must open and view the Digital Rental Agreement before accepting.
              </p>
            )}
          </div>

        </div>

        {/* Right Financial Preview Column (5 cols) */}
        <div className="md:col-span-5">
          <div className="glass-card p-6 rounded-3xl space-y-6 border border-slate-200/80 dark:border-slate-800 shadow-xl sticky top-28">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span>Rental Estimate</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                Pay on Pickup
              </span>
            </h3>

            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Daily Rent (₹{item.dailyRent} × {days} days)</span>
                <span className="font-semibold text-slate-900 dark:text-white">₹{totalRent.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  Platform Fee
                  <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded">Non-refundable</span>
                </span>
                <span className="font-extrabold text-slate-900 dark:text-white">₹9.00</span>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex justify-between items-center text-xs font-bold text-emerald-800 dark:text-emerald-300 relative overflow-hidden">
                <span className="flex items-center gap-1.5 relative z-10">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Refundable Security Deposit:
                </span>
                <div className="flex items-center gap-2 relative z-10">
                  {idProofBase64 && (
                    <span className="line-through text-emerald-600/50">₹{item.deposit}</span>
                  )}
                  <span className="text-sm font-extrabold">₹{effectiveDeposit}</span>
                </div>
                {idProofBase64 && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-200/20 to-transparent animate-shimmer" />
                )}
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-baseline text-lg font-extrabold text-slate-900 dark:text-white">
                <span>Estimated Total</span>
                <span className="text-blue-600 dark:text-blue-400">₹{estimatedTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Send Request CTA Button */}
            <button
              onClick={handleSendBookingRequest}
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-base shadow-xl shadow-blue-500/30 transition hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Sending Request to Owner...</span>
              ) : (
                <>
                  <Calendar className="w-5 h-5" />
                  Send Rental Request to Owner
                </>
              )}
            </button>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-1">
              <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                No Charges Today
              </p>
              <p className="text-[10px] text-slate-400">
                You only pay rent + refundable deposit upon meeting the owner and verifying working condition.
              </p>
            </div>
          </div>
        </div>

      </div>
      {isAgreementModalOpen && (
        <DigitalAgreementModal
          booking={{
            id: `bk-preview-${item.id}`,
            ownerName: item.owner?.name,
            renterName: user?.name,
            startDate,
            endDate,
            days,
            itemTitle: item.title,
            itemImage: item.images[0],
            dailyRent: item.dailyRent,
            deposit: item.deposit,
            location: item.location,
            customTerms: item.customTerms
          }}
          onClose={() => setIsAgreementModalOpen(false)}
        />
      )}
    </div>
  );
};
