import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, X, ClipboardCheck, AlertTriangle, UserCheck } from 'lucide-react';

export const PickupInspectionModal = ({ booking, onClose, onSubmitInspection }) => {
  const [checklist, setChecklist] = useState({
    powerOn: true,
    workingCondition: true,
    cosmeticGood: true,
    accessoriesPresent: true
  });
  const [notes, setNotes] = useState('Equipment powered on, fully tested with renter, accessories & cables all accounted for in good order.');

  if (!booking) return null;

  const handleToggle = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitInspection(booking.id, {
      checklist,
      notes
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl glass-card bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white">
              <ClipboardCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg flex items-center gap-2">
                Pre-Rental Working Condition Inspection
              </h3>
              <p className="text-xs text-slate-400">Physical Meetup & Equipment Handover Verification</p>
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
          
          {/* Item Info Banner */}
          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 flex items-center gap-4">
            <img
              src={booking.itemImage}
              alt={booking.itemTitle}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="space-y-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {booking.category}
              </span>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">{booking.itemTitle}</h4>
              <p className="text-xs text-slate-500">
                Renter: <span className="font-semibold text-slate-800 dark:text-slate-200">{booking.renterName}</span> ({booking.days} days: {booking.startDate} to {booking.endDate})
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              1. Joint Working Condition Verification Checklist
            </h4>
            <p className="text-xs text-slate-500">
              Both Owner and Renter must physically inspect the product together before completing handover.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <label
                onClick={() => handleToggle('powerOn')}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer flex items-start gap-3 transition ${
                  checklist.powerOn
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checklist.powerOn}
                  onChange={() => {}}
                  className="mt-0.5 w-4 h-4 text-emerald-600 rounded"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Power & Battery Test</span>
                  <span className="text-[11px] text-slate-500">Device powers on, charges, and battery functions</span>
                </div>
              </label>

              <label
                onClick={() => handleToggle('workingCondition')}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer flex items-start gap-3 transition ${
                  checklist.workingCondition
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checklist.workingCondition}
                  onChange={() => {}}
                  className="mt-0.5 w-4 h-4 text-emerald-600 rounded"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Full Operational Test</span>
                  <span className="text-[11px] text-slate-500">All features, switches, optics/sensors verified working</span>
                </div>
              </label>

              <label
                onClick={() => handleToggle('cosmeticGood')}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer flex items-start gap-3 transition ${
                  checklist.cosmeticGood
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checklist.cosmeticGood}
                  onChange={() => {}}
                  className="mt-0.5 w-4 h-4 text-emerald-600 rounded"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Physical Cosmetic State</span>
                  <span className="text-[11px] text-slate-500">Clean body, no unrecorded cracks, dents, or deep scratches</span>
                </div>
              </label>

              <label
                onClick={() => handleToggle('accessoriesPresent')}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer flex items-start gap-3 transition ${
                  checklist.accessoriesPresent
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checklist.accessoriesPresent}
                  onChange={() => {}}
                  className="mt-0.5 w-4 h-4 text-emerald-600 rounded"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Included Accessories</span>
                  <span className="text-[11px] text-slate-500">Cables, cases, memory cards, chargers handed over</span>
                </div>
              </label>
            </div>
          </div>

          {/* Condition Notes / Pre-existing remarks */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              2. Pre-Rental Condition Notes & Remarks (Optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Minor hairline scuff on lens hood, otherwise 100% operational..."
              className="w-full p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              <UserCheck className="w-4 h-4" />
              Renter will review & accept this report before payment
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-initial px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                Submit Inspection Report
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
