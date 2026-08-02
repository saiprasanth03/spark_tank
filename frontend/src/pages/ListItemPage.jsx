import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { categories } from '../data/items';
import { 
  PlusCircle, 
  Upload, 
  DollarSign, 
  ShieldCheck, 
  MapPin, 
  Tag, 
  Sparkles, 
  CheckCircle2,
  Image as ImageIcon,
  ArrowLeft
} from 'lucide-react';
import toast from 'react-hot-toast';

export const ListItemPage = () => {
  const navigate = useNavigate();
  const { addListing } = useBooking();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Cameras');
  const [description, setDescription] = useState('');
  const [dailyRent, setDailyRent] = useState('');
  const [deposit, setDeposit] = useState('');
  const [condition, setCondition] = useState('Like New');
  const [location, setLocation] = useState('San Francisco, CA');
  const [imageUrl, setImageUrl] = useState('');
  const [featuresText, setFeaturesText] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !dailyRent || !deposit) {
      toast.error('Please fill in required fields (Title, Daily Rent, and Deposit)');
      return;
    }

    setIsSubmitting(true);

    const finalImage = imageUrl.trim() || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80';
    const featuresArr = featuresText
      ? featuresText.split(',').map(f => f.trim())
      : ['Verified Quality', 'Local Pickup Available', 'Original Case Included'];

    setTimeout(() => {
      const newItem = addListing({
        title,
        category,
        description: description || 'High quality equipment kept in clean condition ready for peer rental.',
        dailyRent: Number(dailyRent),
        deposit: Number(deposit),
        condition,
        features: featuresArr,
        images: [finalImage],
        location
      });

      setIsSubmitting(false);
      navigate(`/item/${newItem.id}`);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          Turn Unused Gear Into Cash
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          List Your Item for Rent
        </h1>
        <p className="text-slate-500 text-sm">
          Set your daily rate and deposit terms. Earn passive income with $10,000 protection guarantee.
        </p>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-10 rounded-3xl space-y-8 border border-slate-200/80 dark:border-slate-800 shadow-xl">
        
        {/* Section 1: Basic Info */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Tag className="w-5 h-5 text-blue-500" />
            1. Item Details
          </h3>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Item Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Sony A7 IV Mirrorless Camera Kit"
              className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
              >
                {categories.filter(c => c.id !== 'all').map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Item Condition *
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
              >
                <option value="Like New">Like New (Mint Condition)</option>
                <option value="Excellent">Excellent (Minor signs of use)</option>
                <option value="Good">Good (Fully functional)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Description
            </label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe specs, included accessories, usage guidelines, or condition details..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Included Features (comma separated)
            </label>
            <input
              type="text"
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder="e.g. Dual Batteries, Fast Charger, Waterproof Hard Case"
              className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Section 2: Pricing & Deposit */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <DollarSign className="w-5 h-5 text-emerald-500" />
            2. Rates & Security Deposit
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Daily Rental Rate (₹ INR) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">₹</span>
                <input
                  type="number"
                  required
                  min="1"
                  value={dailyRent}
                  onChange={(e) => setDailyRent(e.target.value)}
                  placeholder="350"
                  className="w-full pl-8 pr-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Refundable Security Deposit (₹ INR) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">₹</span>
                <input
                  type="number"
                  required
                  min="0"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  placeholder="2000"
                  className="w-full pl-8 pr-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Image & Location */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <ImageIcon className="w-5 h-5 text-purple-500" />
            3. Image & Pickup Location
          </h3>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Image URL (Unsplash or Direct Link)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {imageUrl && (
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-semibold">Image Preview:</span>
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-48 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Pickup City / Neighborhood
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Market St, San Francisco, CA"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base shadow-xl shadow-blue-500/30 transition hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2"
        >
          {isSubmitting ? 'Publishing Item...' : 'Publish Item to BorrowBridge'}
        </button>

      </form>
    </div>
  );
};
