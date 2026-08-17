import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
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
  Lock,
  Compass,
  Navigation
} from 'lucide-react';
import toast from 'react-hot-toast';

export const ListItemPage = () => {
  const navigate = useNavigate();
  const { addListing } = useBooking();
  const { user, isAuthenticated, updateUserRole } = useAuth();

  // ROLE RESTRICTION CHECK
  const isConsumerOnly = user && user.role === 'Consumer / Buyer';

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Cameras');
  const [description, setDescription] = useState('');
  const [marketValue, setMarketValue] = useState(40000);
  const [age, setAge] = useState('1 year');
  const [condition, setCondition] = useState('Good');
  const [accessories, setAccessories] = useState('Battery, charger, protective case');
  
  // Location & Exact GPS Coordinates
  const [location, setLocation] = useState('SRKR College Road, Bhimavaram, AP');
  const [latitude, setLatitude] = useState(16.5449);
  const [longitude, setLongitude] = useState(81.5212);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [gpsCaptured, setGpsCaptured] = useState(false);

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
  useEffect(() => {
    if (!useSuggestedPrice || !marketValue) return;

    let baseDaily = marketValue * 0.02;

    if (condition === 'Brand New') baseDaily *= 1.25;
    else if (condition === 'Like New') baseDaily *= 1.15;
    else if (condition === 'Excellent') baseDaily *= 1.0;
    else if (condition === 'Good') baseDaily *= 0.85;
    else if (condition === 'Fair') baseDaily *= 0.7;

    const calculatedDaily = Math.max(50, Math.round(baseDaily / 50) * 50);
    setDailyRent(calculatedDaily);

    const calculatedDeposit = Math.round((marketValue * 0.1) / 100) * 100;
    setDeposit(Math.max(500, calculatedDeposit));
  }, [marketValue, condition, useSuggestedPrice]);

  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setLatitude(lat);
        setLongitude(lng);
        setGpsCaptured(true);

        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
          const data = await res.json();
          const place = data.display_name || `${data.address?.suburb || 'Local Area'}, Bhimavaram, AP`;
          setLocation(place);
          toast.success('📍 Exact GPS coordinates captured from your device!');
        } catch (e) {
          setLocation('Bhimavaram GPS Verified Zone');
          toast.success('📍 Device GPS coordinates successfully locked!');
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (err) => {
        setIsDetectingLocation(false);
        toast.error('Location access denied. Please allow GPS access in your browser.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      toast.success('Product photo loaded for upload!');
    }
  };

  const handleImageUrlSubmit = (e) => {
    e.preventDefault();
    if (imageUrlInput.trim()) {
      setImagePreview(imageUrlInput.trim());
      toast.success('Image web URL applied!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // STRICT AUTHENTICATION CHECK
    if (!isAuthenticated || !user) {
      toast.error('Please log in to your owner account to publish items.');
      navigate('/login?redirect=/list-item');
      return;
    }

    if (isConsumerOnly) {
      toast.error('Your account role is Consumer / Buyer. Please switch to Seller / Owner to list items.');
      return;
    }

    if (!title.trim()) {
      toast.error('Please enter a product title');
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
        ownerName: user.name,
        ownerPhone: user.phone || '+91 98765 43210',
        ownerEmail: user.email,
        location: {
          city: 'Bhimavaram',
          address: location,
          lat: Number(latitude) || 16.5449,
          lng: Number(longitude) || 81.5212
        }
      });

      setIsSubmitting(false);
      navigate(`/item/${newItem.id}`);
    }, 800);
  };

  // 1. GUEST AUTHENTICATION GUARD (Cannot list without logging in)
  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-lg border border-blue-200 dark:border-blue-800">
          <Lock className="w-10 h-10" />
        </div>
        
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Owner Authentication Required
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Sign In to List Your Equipment
          </h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            To ensure safety, escrow protection, and direct communication between renters and owners in Bhimavaram, you must be logged into an authenticated account.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            to="/login?redirect=/list-item"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            Sign In to Your Account
          </Link>
          <Link
            to="/register?role=Seller%20%2F%20Owner"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer"
          >
            Create Seller Account
          </Link>
        </div>
      </div>
    );
  }

  // 2. CONSUMER-ONLY ROLE RESTRICTION GUARD
  if (isConsumerOnly) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-lg border border-amber-200 dark:border-amber-800">
          <Tag className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            Seller / Owner Role Required
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Enable Seller Account to Post Items
          </h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            You are logged in as <strong>{user.name}</strong> ({user.email}) with role <strong>Consumer / Buyer</strong>. Click below to upgrade your account to list products.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => {
              if (updateUserRole) {
                updateUserRole('Both');
                toast.success('🎉 Account upgraded to Owner & Renter! You can now list items.');
              } else {
                navigate('/profile');
              }
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Enable Owner Role (1-Click Upgrade)
          </button>
          
          <Link
            to="/profile"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-sm transition flex items-center justify-center gap-2"
          >
            Go to Profile
          </Link>
        </div>
      </div>
    );
  }

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
          Owner Product Portal ({user.name})
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          List Your Item for Rent
        </h1>
        <p className="text-slate-500 text-sm max-w-2xl">
          List your equipment with exact GPS location mapping. Our smart pricing engine recommends optimal daily rates based on market value and condition.
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
                className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {categories.filter(c => c.id !== 'all').map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Original Market Value (₹) *
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
                placeholder="e.g. 1 year"
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
                className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="Excellent">Excellent (Like New, 0 cosmetic marks)</option>
                <option value="Good">Good (Minor normal wear, 100% functional)</option>
                <option value="Fair">Fair (Noticeable wear, fully tested)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Included Accessories & Cables
              </label>
              <input
                type="text"
                value={accessories}
                onChange={(e) => setAccessories(e.target.value)}
                placeholder="e.g. 2 Batteries, 128GB SD card, bag"
                className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Detailed Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your equipment features, performance, and rental terms..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Section 2: Smart Pricing & Deposit */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-500" />
              2. Smart Rental Rates & Security Deposit
            </h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              Smart Algorithm
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Recommended Daily Rate</p>
                <p className="text-[11px] text-slate-500">Based on ₹{marketValue} value and {condition} condition</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">₹{dailyRent}</span>
                <span className="text-xs text-slate-500"> / day</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 flex justify-between">
                <span className="text-slate-500">3+ Days Rate:</span>
                <span className="font-bold text-slate-900 dark:text-white">₹{Math.round(dailyRent * 0.93)}/day</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 flex justify-between">
                <span className="text-slate-500">7+ Days Rate:</span>
                <span className="font-bold text-slate-900 dark:text-white">₹{Math.round(dailyRent * 0.875)}/day</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Your 1-Day Rental Price (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">₹</span>
                <input
                  type="number"
                  required
                  value={dailyRent}
                  onChange={(e) => setDailyRent(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Refundable Security Deposit (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">₹</span>
                <input
                  type="number"
                  required
                  value={deposit}
                  onChange={(e) => setDeposit(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Photo Upload & EXACT OWNER LOCATION */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <MapPin className="w-5 h-5 text-rose-500" />
            3. Photo Upload & Exact Owner Location
          </h3>

          {/* Photo Upload */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Upload Product Photo
            </label>
            
            <div className="p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl text-center bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/80 transition cursor-pointer relative group">
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
                <p className="text-[11px] text-slate-400">Supports PNG, JPG, WEBP</p>
              </div>
            </div>

            {imagePreview && (
              <div className="space-y-1">
                <img
                  src={imagePreview}
                  alt="Product Preview"
                  className="w-full h-48 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-md"
                />
              </div>
            )}
          </div>

          {/* Exact GPS Location Capture Card */}
          <div className="p-6 rounded-3xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Owner's Exact Pickup Location & GPS
                </h4>
                <p className="text-xs text-slate-500">
                  Pin your item with exact coordinates so renters nearby in Bhimavaram can find it on the map.
                </p>
              </div>

              {/* GPS Auto-Detect Button */}
              <button
                type="button"
                onClick={handleDetectGPS}
                disabled={isDetectingLocation}
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-extrabold text-xs shadow-md hover:opacity-90 transition flex items-center gap-2 flex-shrink-0 cursor-pointer"
              >
                <Compass className={`w-4 h-4 text-emerald-400 ${isDetectingLocation ? 'animate-spin' : ''}`} />
                {isDetectingLocation ? 'Detecting GPS...' : '📍 Auto-Detect My Exact GPS'}
              </button>
            </div>

            {gpsCaptured && (
              <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Exact GPS Coordinates Captured: {latitude}° N, {longitude}° E (Bhimavaram Zone)</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Street / Landmark Address *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. SRKR College Road, Bhimavaram, AP"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 text-sm font-medium text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Latitude & Longitude Coordinate Inputs */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                  Latitude Coordinate
                </label>
                <input
                  type="number"
                  step="0.0001"
                  required
                  value={latitude}
                  onChange={(e) => setLatitude(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                  Longitude Coordinate
                </label>
                <input
                  type="number"
                  step="0.0001"
                  required
                  value={longitude}
                  onChange={(e) => setLongitude(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Submit Action */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-base shadow-xl shadow-blue-500/30 transition hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isSubmitting ? 'Publishing Listing...' : 'Publish Item with Exact GPS Location'}
        </button>

      </form>
    </div>
  );
};
