import React, { useState, useEffect } from 'react';
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
  ArrowLeft,
  Calculator,
  TrendingUp,
  Sliders,
  Sparkle
} from 'lucide-react';
import toast from 'react-hot-toast';

export const ListItemPage = () => {
  const navigate = useNavigate();
  const { addListing } = useBooking();

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Cameras');
  const [description, setDescription] = useState('');
  const [marketValue, setMarketValue] = useState(40000);
  const [age, setAge] = useState('1 year');
  const [condition, setCondition] = useState('Good'); // 'Excellent', 'Good', 'Fair'
  const [accessories, setAccessories] = useState('Battery, charger, protective case');
  const [location, setLocation] = useState('Bhimavaram, AP');

  // Rates & Deposit
  const [dailyRent, setDailyRent] = useState(800);
  const [deposit, setDeposit] = useState(4000);
  const [useSuggestedPrice, setUseSuggestedPrice] = useState(true);

  // Photo Upload & URL State
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80');
  const [imageUrlInput, setImageUrlInput] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  // SMART PRICING ALGORITHM LOGIC
  // Base Price = 2% of Market Value per day
  // Adjusted by Condition (+10% for Excellent, 0% for Good, -15% for Fair)
  const calculatedBasePrice = Math.round((Number(marketValue) || 40000) * 0.02);
  let conditionFactor = 1.0;
  if (condition === 'Excellent') conditionFactor = 1.10;
  if (condition === 'Fair') conditionFactor = 0.85;

  const suggestedDailyPrice = Math.round(calculatedBasePrice * conditionFactor);
  const suggestedDeposit = Math.round((Number(marketValue) || 40000) * 0.10);

  const threeDayRate = Math.round(suggestedDailyPrice * 0.93); // ~7% discount
  const sevenDayRate = Math.round(suggestedDailyPrice * 0.875); // ~12% discount

  useEffect(() => {
    if (useSuggestedPrice) {
      setDailyRent(suggestedDailyPrice);
      setDeposit(suggestedDeposit);
    }
  }, [marketValue, condition, useSuggestedPrice, suggestedDailyPrice, suggestedDeposit]);

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      toast.success('Product photo uploaded successfully!');
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrlInput(url);
    if (url.trim()) {
      setImagePreview(url.trim());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Please enter the product title');
      return;
    }

    setIsSubmitting(true);

    const finalImage = imagePreview || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80';
    const featuresArr = accessories
      ? accessories.split(',').map(f => f.trim())
      : ['Original Accessories', 'Tested & Verified', 'Local Pickup Available'];

    setTimeout(() => {
      const newItem = addListing({
        title,
        category,
        description: description || `${title} in ${condition} condition. Original value ₹${marketValue}. Includes ${accessories}.`,
        dailyRent: Number(dailyRent),
        threeDayRent: Math.round(Number(dailyRent) * 0.93),
        sevenDayRent: Math.round(Number(dailyRent) * 0.875),
        marketValue: Number(marketValue),
        deposit: Number(deposit),
        condition,
        features: featuresArr,
        images: [finalImage],
        location: {
          city: 'Bhimavaram',
          address: location
        }
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
        Back to Marketplace
      </button>

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-current" />
          Monetize Your Idle Products as a Seller / Owner
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          List Your Item for Rent
        </h1>
        <p className="text-slate-500 text-sm max-w-2xl">
          List your equipment for rent. Our smart pricing engine recommends optimal daily rates based on market value, condition, and nearby demand.
        </p>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-10 rounded-3xl space-y-8 border border-slate-200/80 dark:border-slate-800 shadow-xl">
        
        {/* Section 1: Item Details */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Tag className="w-5 h-5 text-blue-500" />
            1. Information Collected from Owner
          </h3>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Item Product Name *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Canon EOS R5 Mirrorless Camera Kit"
              className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Item Category *
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
                Original/Current Market Value (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">₹</span>
                <input
                  type="number"
                  required
                  min="500"
                  value={marketValue}
                  onChange={(e) => setMarketValue(Number(e.target.value))}
                  placeholder="40000"
                  className="w-full pl-8 pr-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Age of Product
              </label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 2 years"
                className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Product Condition *
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
              >
                <option value="Excellent">Excellent (+10% Premium)</option>
                <option value="Good">Good (Standard Market Rate)</option>
                <option value="Fair">Fair (-15% Discount)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Accessories Included
              </label>
              <input
                type="text"
                value={accessories}
                onChange={(e) => setAccessories(e.target.value)}
                placeholder="e.g. Battery, charger, tripod, bag"
                className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Smart Pricing & Market Logic (MVP Pricing Engine) */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Calculator className="w-5 h-5 text-emerald-500" />
            2. Smart Data-Based Price Recommendation Engine
          </h3>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-50 via-teal-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950/40 border border-blue-200/80 dark:border-blue-800/80 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-200/60 dark:border-slate-700 pb-3">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wide text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-amber-500 fill-current" />
                  AI Suggested Rental Price
                </span>
                <h4 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                  ₹{suggestedDailyPrice} <span className="text-sm font-normal text-slate-500">/ day</span>
                </h4>
              </div>

              <button
                type="button"
                onClick={() => {
                  setUseSuggestedPrice(true);
                  setDailyRent(suggestedDailyPrice);
                  setDeposit(suggestedDeposit);
                  toast.success(`Applied AI recommended price of ₹${suggestedDailyPrice}/day`);
                }}
                className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5 self-start sm:self-auto"
              >
                <CheckCircle2 className="w-4 h-4" />
                Accept ₹{suggestedDailyPrice}/day
              </button>
            </div>

            {/* Breakdown Logic Display */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-300 pt-1">
              <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700 space-y-1">
                <span className="text-slate-400 block font-semibold">Value-Based Base Price</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">₹{marketValue} × 2% = ₹{calculatedBasePrice}/day</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700 space-y-1">
                <span className="text-slate-400 block font-semibold">Condition Adjustment</span>
                <span className="font-bold text-emerald-600">{condition} condition ({condition === 'Excellent' ? '+10%' : condition === 'Fair' ? '-15%' : '0%'})</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700 space-y-1">
                <span className="text-slate-400 block font-semibold">Nearby Market Comparison</span>
                <span className="font-bold text-blue-600">Similar items: ₹{Math.round(suggestedDailyPrice * 0.9)} – ₹{Math.round(suggestedDailyPrice * 1.1)}/day</span>
              </div>
            </div>

            {/* Duration Discounts Table */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                Duration Discount Rates (Encourages longer rental bookings):
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block font-semibold">1 Day</span>
                  <span className="font-extrabold text-slate-900 dark:text-white text-sm">₹{dailyRent}/day</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block font-semibold">3 Days</span>
                  <span className="font-extrabold text-blue-600 text-sm">₹{threeDayRate}/day</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block font-semibold">7 Days (Weekly)</span>
                  <span className="font-extrabold text-emerald-600 text-sm">₹{sevenDayRate}/day</span>
                </div>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Your Final Daily Rental Rate (₹ INR) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">₹</span>
                <input
                  type="number"
                  required
                  min="1"
                  value={dailyRent}
                  onChange={(e) => {
                    setDailyRent(Number(e.target.value));
                    setUseSuggestedPrice(false);
                  }}
                  placeholder="800"
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
                  onChange={(e) => setDeposit(Number(e.target.value))}
                  placeholder="4000"
                  className="w-full pl-8 pr-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Photo Upload Option & Pickup Location */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <ImageIcon className="w-5 h-5 text-purple-500" />
            3. Photo Upload & Pickup Location
          </h3>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Upload Product Photos (File Upload or Direct URL)
            </label>
            
            {/* File Upload Dropzone */}
            <div className="p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl text-center bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/80 dark:hover:bg-slate-800 transition cursor-pointer relative group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="space-y-2 pointer-events-none">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-sm">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Click to Upload Photos from your Device
                </p>
                <p className="text-[11px] text-slate-400">Supports PNG, JPG, WEBP up to 10MB</p>
              </div>
            </div>

            {/* Direct Image URL Backup Input */}
            <div className="space-y-1 pt-2">
              <span className="text-[11px] font-semibold text-slate-400">Or paste an Image Web URL:</span>
              <input
                type="url"
                value={imageUrlInput}
                onChange={handleImageUrlChange}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {imagePreview && (
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-semibold">Image Preview:</span>
              <img
                src={imagePreview}
                alt="Product Preview"
                className="w-full h-56 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-md"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Pickup City / Neighborhood Location *
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="SRKR College Road, Bhimavaram, AP"
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
          {isSubmitting ? 'Publishing Listing...' : 'Publish Item to BorrowBridge'}
        </button>

      </form>
    </div>
  );
};
