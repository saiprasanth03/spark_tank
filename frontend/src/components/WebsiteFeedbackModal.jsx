import React, { useState } from 'react';
import { MessageSquare, Star, X, CheckCircle2, Sparkles, Send, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import toast from 'react-hot-toast';

export const WebsiteFeedbackModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { submitWebsiteFeedback } = useBooking();

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState('Website Experience & UI');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const categories = [
    'Website Experience & UI',
    'Escrow & Deposit Protection',
    'Rental Handover Workflow',
    'Feature Suggestion',
    'Bug Report / Issue'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error('Please enter your feedback message.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitWebsiteFeedback({
        rating,
        category,
        title: title.trim() || `${category} Feedback`,
        message: message.trim(),
        submittedBy: user?.name || 'Community Member',
        email: user?.email || 'Anonymous'
      });
      setIsSubmitting(false);
      setTitle('');
      setMessage('');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl glass-card bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md text-white">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-lg flex items-center gap-1.5">
                Website & Platform Feedback
                <Sparkles className="w-4 h-4 text-amber-300 fill-current" />
              </h3>
              <p className="text-xs text-blue-100">Help us improve BorrowBridge for the Bhimavaram community</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Rating Selection */}
          <div className="space-y-2 text-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <label className="text-xs font-extrabold text-slate-900 dark:text-white block">
              How would you rate your overall experience on BorrowBridge?
            </label>
            <div className="flex items-center justify-center gap-2 pt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition transform hover:scale-125 cursor-pointer"
                >
                  <Star
                    className={`w-7 h-7 ${
                      (hoverRating || rating) >= star
                        ? 'text-amber-500 fill-current'
                        : 'text-slate-300 dark:text-slate-700'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-[11px] font-bold text-slate-500 block">
              {rating === 5 ? '⭐⭐⭐⭐⭐ Outstanding Experience' : rating === 4 ? '⭐⭐⭐⭐ Very Good' : rating === 3 ? '⭐⭐⭐ Satisfactory' : 'Needs Improvement'}
            </span>
          </div>

          {/* Feedback Category */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Feedback Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Feedback Subject / Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Feedback Title / Subject
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Loved the new handover inspection feature!"
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Detailed Message */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Your Suggestions & Feedback *
            </label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you liked, what can be improved, or any features you want to see..."
              className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 transition flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Submitting...' : 'Submit Website Feedback'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
