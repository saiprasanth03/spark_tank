import React from 'react';
import { ShieldCheck, FileText, CheckCircle2, Printer, X, MapPin, Calendar, DollarSign, Lock } from 'lucide-react';

export const DigitalAgreementModal = ({ booking, onClose }) => {
  if (!booking) return null;

  const agreementId = `BB-AGR-${booking.id.replace('bk-', '')}`;
  const currentDate = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl glass-card bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg flex items-center gap-2">
                Digital Rental Agreement
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                  Legally Binding
                </span>
              </h3>
              <p className="text-xs text-slate-400">Contract ID: {agreementId}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
              title="Print Agreement"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contract Printable Content Body */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-800 dark:text-slate-200 text-xs leading-relaxed max-h-[75vh] overflow-y-auto print:max-h-none print:overflow-visible">
          
          {/* Header Badge & Date */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">BorrowBridge Rental Contract</h2>
              <p className="text-slate-500 text-xs">Official Peer-to-Peer Rental Escrow Agreement</p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-slate-400 block font-medium">Agreement Date:</span>
              <span className="font-bold text-slate-900 dark:text-white">{currentDate}</span>
            </div>
          </div>

          {/* Contracting Parties */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                Party A: Item Owner (Seller / Lender)
              </span>
              <p className="font-bold text-slate-900 dark:text-white text-sm">{booking.ownerName || 'Verified Gear Lender'}</p>
              <p className="text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                {booking.location?.address || 'Bhimavaram, AP'}
              </p>
              <div className="pt-1 flex items-center gap-1 text-emerald-600 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Identity Verified & Escrow Enrolled
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                Party B: Consumer (Renter / Buyer)
              </span>
              <p className="font-bold text-slate-900 dark:text-white text-sm">{booking.renterName || 'Registered Renter'}</p>
              <p className="text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                Duration: {booking.startDate} to {booking.endDate} ({booking.days || 1} day)
              </p>
              <div className="pt-1 flex items-center gap-1 text-emerald-600 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Deposit Authorized & Escrow Secured
              </div>
            </div>
          </div>

          {/* Item Details */}
          <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/60 space-y-3">
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">Rented Product Specifications</h4>
            <div className="flex items-center gap-4">
              {booking.itemImage && (
                <img src={booking.itemImage} alt={booking.itemTitle} className="w-16 h-16 rounded-xl object-cover" />
              )}
              <div className="space-y-1">
                <p className="font-bold text-slate-900 dark:text-white">{booking.itemTitle}</p>
                <p className="text-slate-500">Condition at Handover: <span className="font-semibold text-slate-800 dark:text-slate-200">Verified Good / Like New</span></p>
                <p className="text-slate-500">Pickup Mode: <span className="font-semibold text-emerald-600">Direct Pickup at Lender Location</span></p>
              </div>
            </div>
          </div>

          {/* Financial Escrow Breakdown */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">Financial & Escrow Terms</h4>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800">
                <span className="text-slate-400 block font-semibold">Daily Rental Rate</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">₹{booking.dailyRent}/day</span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                <span className="text-emerald-700 dark:text-emerald-300 block font-semibold">Safety Escrow Deposit</span>
                <span className="font-extrabold text-emerald-600 text-sm">₹{booking.deposit}</span>
              </div>
              <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800">
                <span className="text-blue-700 dark:text-blue-300 block font-semibold">Total Funds Paid</span>
                <span className="font-extrabold text-blue-600 text-sm">₹{booking.totalPaid || (booking.totalRent + booking.deposit)}</span>
              </div>
            </div>
          </div>

          {/* Standard Terms & Conditions */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">Contract Terms & Conditions</h4>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-600 dark:text-slate-400">
              <li><strong>Direct Pickup:</strong> Party B (Renter) agrees to directly pick up the product from Party A (Owner) at the agreed location. No third-party meetups permitted.</li>
              <li><strong>Escrow Protection:</strong> Safety deposit of ₹{booking.deposit} is held securely in platform escrow until the item is safely handed over back to the owner.</li>
              <li><strong>Damage Inspection:</strong> Party A (Owner) will inspect the returned item. If no damage is identified, the safety deposit will be 100% refunded to Party B.</li>
              <li><strong>Verified Peer Reviews:</strong> Peer reviews can only be submitted after the item is handed over and returned to the owner.</li>
            </ol>
          </div>

          {/* Digital Signatures Box */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-center space-y-1 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-500 block">Digitally Signed by Owner:</span>
              <p className="font-serif italic font-bold text-slate-900 dark:text-white text-base">{booking.ownerName || 'Verified Lender'}</p>
              <span className="text-[10px] text-emerald-600 font-semibold block">Timestamped & Cryptographically Verified</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-center space-y-1 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-500 block">Digitally Signed by Renter:</span>
              <p className="font-serif italic font-bold text-slate-900 dark:text-white text-base">{booking.renterName || 'Registered Renter'}</p>
              <span className="text-[10px] text-emerald-600 font-semibold block">Timestamped & Cryptographically Verified</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition"
          >
            Close Agreement
          </button>
        </div>

      </div>
    </div>
  );
};
