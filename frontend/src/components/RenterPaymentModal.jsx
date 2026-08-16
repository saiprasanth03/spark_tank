import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, X, Lock, CreditCard, FileText, Info, AlertCircle } from 'lucide-react';

export const RenterPaymentModal = ({ booking, onClose, onConfirmPayment }) => {
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!booking) return null;

  const totalRent = booking.totalRent || (booking.dailyRent * (booking.days || 1));
  const deposit = booking.deposit || 0;
  const platformFee = booking.platformFee || 9;
  const totalPayable = totalRent + deposit + platformFee;

  const handlePay = (e) => {
    e.preventDefault();
    if (!agreedToTerms) return;

    setIsProcessing(true);
    setTimeout(() => {
      onConfirmPayment(booking.id, {
        paymentMethod: paymentMethod === 'upi' ? 'UPI Escrow Pay' : 'Cards / NetBanking'
      });
      setIsProcessing(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl glass-card bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-600 text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg flex items-center gap-2">
                Accept Inspection & Authorize Escrow Payment
              </h3>
              <p className="text-xs text-slate-400">Step 3 of 4: Physical Handover Agreement & Deposit</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handlePay} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Owner Working Condition Inspection Review Card */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Owner's Working Condition Report
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                Inspected Live
              </span>
            </div>

            {booking.pickupInspection?.checklist ? (
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Power & Battery Tested</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Full Operational Check OK</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Physical Body Verified</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>All Accessories Included</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Equipment verified operational and handed over by owner ({booking.ownerName}).
              </p>
            )}

            {booking.pickupInspection?.notes && (
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                <span className="font-bold text-slate-900 dark:text-white">Owner Notes: </span>
                {booking.pickupInspection.notes}
              </div>
            )}
          </div>

          {/* Payment Breakdown Card */}
          <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 space-y-3">
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
              Escrow Payment Summary ({booking.days || 1} Days)
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Rental Charge (₹{booking.dailyRent} × {booking.days || 1} days):</span>
                <span className="font-bold text-slate-900 dark:text-white">₹{totalRent}</span>
              </div>

              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Platform Maintenance Fee:</span>
                <span className="font-bold text-slate-900 dark:text-white">₹{platformFee}</span>
              </div>

              <div className="flex justify-between items-center p-2.5 rounded-xl bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-bold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Refundable Security Deposit (Escrow):
                </span>
                <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">₹{deposit}</span>
              </div>

              <div className="pt-2 border-t border-blue-200 dark:border-blue-800 flex justify-between items-baseline text-base font-extrabold text-slate-900 dark:text-white">
                <span>Total Escrow Authorization:</span>
                <span className="text-blue-600 dark:text-blue-400 text-lg">₹{totalPayable}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 italic">
              * The ₹{deposit} security deposit is held securely in Escrow and will be refunded to you when you return the product in working condition.
            </p>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Select Payment Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-2xl border-2 text-xs font-bold transition flex items-center justify-center gap-2 ${
                  paymentMethod === 'upi'
                    ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600'
                }`}
              >
                <span>⚡ UPI / GPay / PhonePe</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-2xl border-2 text-xs font-bold transition flex items-center justify-center gap-2 ${
                  paymentMethod === 'card'
                    ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600'
                }`}
              >
                <span>💳 Debit / Credit Card</span>
              </button>
            </div>
          </div>

          {/* Agreement Acceptance Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-xs text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
              I have physically inspected the equipment, accept the owner's condition report, and agree to the Digital Rental Terms & deposit refund policy upon safe return.
            </span>
          </label>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!agreedToTerms || isProcessing}
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 transition flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              {isProcessing ? 'Processing Escrow Payment...' : `Pay ₹${totalPayable} & Confirm Handover`}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
