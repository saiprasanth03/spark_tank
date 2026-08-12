import React, { useState } from 'react';
import { Star, X, CheckCircle2, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export const ReviewModal = ({ booking, onClose, onSubmitReview }) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!booking) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error('Please write a brief comment describing your rental experience.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      if (onSubmitReview) {
        onSubmitReview({
          id: `rev-${Date.now()}`,
          bookingId: booking.id,
          itemTitle: booking.itemTitle,
          reviewer: booking.renterName || 'Verified Consumer',
          rating,
          comment: comment.trim(),
          date: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
        });
      }
      setIsSubmitting(false);
      toast.success('Verified post-handover review published!');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg glass-card bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500 text-white">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-extrabold text-base flex items-center gap-2">
                Write Verified Review
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">
                  Post-Handover Only
                </span>
              </h3>
              <p className="text-xs text-slate-400">Item: {booking.itemTitle}</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <span>Product return & inspection completed. You are authorized to submit a verified review.</span>
          </div>

          {/* Rating Stars Selection */}
          <div className="space-y-2 text-center">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Overall Experience Rating:
            </label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      (hoverRating || rating) >= star
                        ? 'text-amber-500 fill-current'
                        : 'text-slate-300 dark:text-slate-700'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment Text Area */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Share Your Feedback:
            </label>
            <textarea
              rows="4"
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How was the product condition during your rental? Was the pickup smooth?"
              className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg transition"
          >
            {isSubmitting ? 'Publishing Review...' : 'Publish Verified Review'}
          </button>

        </form>
      </div>
    </div>
  );
};
