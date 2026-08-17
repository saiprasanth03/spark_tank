import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, X, ArrowRight, RotateCcw, DollarSign } from 'lucide-react';

export const ReturnHandoverModal = ({ booking, onClose, onSubmitReturnHandover }) => {
  const deposit = booking?.deposit || 0;
  const [hasDamage, setHasDamage] = useState(false);
  const [damageAmount, setDamageAmount] = useState('');
  const [damageDetails, setDamageDetails] = useState('');
  const [proofImage, setProofImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!booking) return null;

  const validDamageAmount = Math.min(deposit, Math.max(0, Number(damageAmount) || 0));
  const refundToRenter = Math.max(0, deposit - (hasDamage ? validDamageAmount : 0));

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      onSubmitReturnHandover(booking.id, {
        hasDamage,
        damageDetails: hasDamage ? damageDetails : 'Item returned in verified good working condition with zero damage.',
        damageAmount: hasDamage ? validDamageAmount : 0,
        proofImage: hasDamage ? proofImage : null
      });
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl glass-card bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-600 text-white">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg flex items-center gap-2">
                Return Handover & Damage Inspection
              </h3>
              <p className="text-xs text-slate-400">Post-Rental Physical Verification & Escrow Deposit Settlement</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Booking Summary */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-4">
            <img
              src={booking.itemImage}
              alt={booking.itemTitle}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="space-y-0.5 flex-1">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">{booking.itemTitle}</h4>
              <p className="text-xs text-slate-500">
                Renter: <span className="font-semibold text-slate-700 dark:text-slate-300">{booking.renterName}</span>
              </p>
              <div className="pt-1 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-600 dark:text-slate-400">Total Escrow Deposit Held:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">₹{deposit}</span>
              </div>
            </div>
          </div>

          {/* Condition Outcome Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Select Inspection Result
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setHasDamage(false)}
                className={`p-4 rounded-2xl border-2 text-left space-y-1 transition ${
                  !hasDamage
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Perfect Condition (0 Damage)
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Item tested & verified working. 100% of ₹{deposit} deposit is refunded to renter.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setHasDamage(true)}
                className={`p-4 rounded-2xl border-2 text-left space-y-1 transition ${
                  hasDamage
                    ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/40'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Damage / Issues Reported
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Specify damage deduction. Remaining deposit balance returned to renter.
                </p>
              </button>
            </div>
          </div>

          {/* Damage Details Inputs (Conditional) */}
          {hasDamage && (
            <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900 dark:text-white">
                  Damage Description & Required Repair
                </label>
                <input
                  type="text"
                  required={hasDamage}
                  value={damageDetails}
                  onChange={(e) => setDamageDetails(e.target.value)}
                  placeholder="e.g. Scratched lens element, missing charging cable, cracked battery door..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900 dark:text-white">
                  Proof of Damage (Optional Image URL)
                </label>
                <input
                  type="text"
                  value={proofImage}
                  onChange={(e) => setProofImage(e.target.value)}
                  placeholder="Paste a link to a photo of the damage"
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <label className="text-slate-900 dark:text-white">
                    Damage Deduction Amount (Max ₹{deposit})
                  </label>
                  <span className="text-amber-600 dark:text-amber-400">₹{validDamageAmount}</span>
                </div>
                <input
                  type="number"
                  min="1"
                  max={deposit}
                  required={hasDamage}
                  value={damageAmount}
                  onChange={(e) => setDamageAmount(e.target.value)}
                  placeholder={`Enter amount up to ₹${deposit}`}
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          )}

          {/* Settlement Distribution Card */}
          <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Escrow Deposit Settlement Preview
            </h4>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="text-[11px] text-slate-500 block">Owner Payout (Damage):</span>
                <span className="text-base font-extrabold text-amber-600 dark:text-amber-400">
                  ₹{hasDamage ? validDamageAmount : 0}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="text-[11px] text-slate-500 block">Renter Refund:</span>
                <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                  ₹{refundToRenter}
                </span>
              </div>
            </div>
          </div>

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
              disabled={isSubmitting}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/25 transition flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              {isSubmitting ? 'Settling Escrow Funds...' : 'Accept Handover & Settle Deposit'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
