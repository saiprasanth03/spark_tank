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
  Mail,
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

  // Form Fields - Clean with ZERO default placeholder values
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [marketValue, setMarketValue] = useState('');
  const [age, setAge] = useState('');
  const [condition, setCondition] = useState('');
  const [accessories, setAccessories] = useState('');
  const [customTerms, setCustomTerms] = useState('');
  
  // Location & Exact GPS Coordinates - Empty until owner enters or clicks auto-detect
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [gpsCaptured, setGpsCaptured] = useState(false);

  // Rates & Deposit - Empty until entered or calculated
  const [dailyRent, setDailyRent] = useState('');
  const [deposit, setDeposit] = useState('');
  const [useSuggestedPrice, setUseSuggestedPrice] = useState(true);

  // Photo Upload & URL State - ZERO default images
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  // SMART PRICING ALGORITHM LOGIC (Only runs when owner inputs market value)
  useEffect(() => {
    if (!useSuggestedPrice || !marketValue || Number(marketValue) <= 0) return;

    let baseDaily = Number(marketValue) * 0.02;

    if (condition === 'Brand New') baseDaily *= 1.25;
    else if (condition === 'Like New') baseDaily *= 1.15;
    else if (condition === 'Excellent') baseDaily *= 1.0;
    else if (condition === 'Good') baseDaily *= 0.85;
    else if (condition === 'Fair') baseDaily *= 0.7;

    const calculatedDaily = Math.max(50, Math.round(baseDaily / 50) * 50);
    setDailyRent(calculatedDaily);

    const calculatedDeposit = Math.round((Number(marketValue) * 0.1) / 100) * 100;
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
          setLocation('Bhimavaram, Andhra Pradesh');
          toast.success('📍 Device GPS coordinates successfully locked!');
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (err) => {
        setIsDetectingLocation(false);
        toast.error('Location access denied. Please allow GPS access in your browser or type address manually.');
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
      toast.success('Product photo loaded!');
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

    if (!category) {
      toast.error('Please select a product category');
      return;
    }

    if (!condition) {
      toast.error('Please select product condition');
      return;
    }

    if (!dailyRent || Number(dailyRent) <= 0) {
      toast.error('Please enter a valid daily rental rate');
      return;
    }

    if (!deposit || Number(deposit) <= 0) {
      toast.error('Please enter a refundable security deposit');
      return;
    }

    if (!location.trim()) {
      toast.error('Please enter your pickup location address');
      return;
    }

    if (!imagePreview) {
      toast.error('Please upload at least one photo of your equipment');
      return;
    }

    setIsSubmitting(true);

    const finalImage = imagePreview;
    const featuresArr = accessories && accessories.trim()
      ? accessories.split(',').map(f => f.trim())
      : ['Original Accessories', 'Tested & Verified', 'Local Pickup Available'];

    setTimeout(() => {
      // Dynamic City Extraction from Address
      let detectedCity = 'Bhimavaram';
      if (location) {
        const parts = location.split(',').map(s => s.trim());
        const matched = parts.find(p => /visakhapatnam|vizag|bhimavaram|hyderabad|vijayawada|kakinada|rajahmundry|guntur|tirupati/i.test(p));
        if (matched) {
          detectedCity = matched;
        } else if (parts.length >= 3) {
          detectedCity = parts[parts.length - 3] || parts[1] || 'Bhimavaram';
        } else if (parts.length > 0) {
          detectedCity = parts[0];
        }
      }

      const newItem = addListing({
        title,
        category,
        description: description || `${title} in ${condition} condition. Original value ₹${marketValue || 0}. Includes ${accessories || 'standard accessories'}.`,
        dailyRent: Number(dailyRent),
        threeDayRent: Math.round(Number(dailyRent) * 0.93),
        sevenDayRent: Math.round(Number(dailyRent) * 0.875),
        marketValue: Number(marketValue) || (Number(dailyRent) * 50),
        deposit: Number(deposit),
        condition,
        customTerms,
        features: featuresArr,
        images: [finalImage],
        ownerName: user.name,
        ownerPhone: user.phone || '+91 98765 43210',
        ownerEmail: user.email,
        location: {
          city: detectedCity,
          address: location,
          lat: Number(latitude) || 16.5449,
          lng: Number(longitude) || 81.5212
        }
      });

      setIsSubmitting(false);
      setCreatedProduct(newItem);
      toast.success('🎉 Equipment listed successfully!');
    }, 600);
  };

  // SUCCESS CONFIRMATION SCREEN AFTER ADDING PRODUCT
  if (createdProduct) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-8 animate-in zoom-in-95 duration-300">
        <div className="glass-card p-8 sm:p-10 rounded-3xl border border-emerald-200 dark:border-emerald-800 shadow-2xl text-center space-y-6 bg-gradient-to-b from-emerald-50/40 via-white to-white dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900">
          
          <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-lg border border-emerald-300 dark:border-emerald-700">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 fill-current text-amber-500" />
              Live on Marketplace
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Product Added Successfully!
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Your equipment <strong>"{createdProduct.title}"</strong> is now live on the marketplace and discoverable by renters in <strong>{createdProduct.location?.city || 'your area'}</strong>.
            </p>
          </div>

          {/* Product Summary Card */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-4 text-left">
            <img
              src={createdProduct.images?.[0]}
              alt={createdProduct.title}
              className="w-20 h-20 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
            />
            <div className="space-y-1 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-md">
                {createdProduct.category}
              </span>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm line-clamp-1">
                {createdProduct.title}
              </h4>
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="font-black text-blue-600 dark:text-blue-400">₹{createdProduct.dailyRent} / day</span>
                <span className="text-slate-500 font-medium">Deposit: ₹{createdProduct.deposit}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/')}
              className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-extrabold text-sm shadow-md hover:opacity-90 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              🏠 Go to Home Page
            </button>

            <button
              onClick={() => navigate('/explore')}
              className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              🔍 View in Marketplace
            </button>

            <button
              onClick={() => navigate(`/item/${createdProduct.id}`)}
              className="w-full py-3.5 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer"
            >
              📋 View Listing Page
            </button>

            <button
              onClick={() => {
                setCreatedProduct(null);
                setTitle('');
                setCategory('');
                setDescription('');
                setMarketValue('');
                setAge('');
                setCondition('');
                setAccessories('');
                setLocation('');
                setLatitude('');
                setLongitude('');
                setDailyRent('');
                setDeposit('');
                setImagePreview('');
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer border border-emerald-200 dark:border-emerald-800"
            >
              ➕ List Another Item
            </button>
          </div>

        </div>
      </div>
    );
  }

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
        <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center shadow-lg border border-slate-200 dark:border-slate-700">
          <ShieldCheck className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold border border-rose-200 dark:border-rose-800">
            <Lock className="w-3.5 h-3.5" />
            Seller Access Restricted
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Seller / Owner Role Required
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            Your account (<strong>{user?.name || 'User'}</strong> — <span className="text-slate-400">{user?.email}</span>) is registered as a <strong>Consumer / Buyer</strong>.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            To list and rent out equipment, your account must be upgraded to <strong>Seller / Owner</strong> by the platform administrator.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-left space-y-2">
          <h4 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-500" />
            How to Become a Seller
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Contact the BorrowBridge admin at <span className="font-bold text-blue-600">admin@borrowbridge.in</span> with your account email and request to be upgraded to Seller status. The admin will review and update your role.
          </p>
        </div>

        <Link
          to="/profile"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm transition"
        >
          ← Back to My Profile
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Marketplace
      </button>

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-current" />
          Owner Product Portal ({user?.name || 'Owner'})
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          List Your Item for Rent
        </h1>
        <p className="text-slate-500 text-sm max-w-2xl">
          List your equipment with exact GPS location mapping. Enter your item specifications and pricing details below.
        </p>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-10 rounded-3xl space-y-8 border border-slate-200/80 dark:border-slate-800 shadow-xl">
        
        {/* Section 1: Item Details */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Tag className="w-5 h-5 text-blue-500" />
            1. Equipment Details
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
              placeholder="e.g. Sony A7 IV Camera Kit, DJI Drone, Bosch Drill"
              className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Item Category *
              </label>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="">-- Select Category --</option>
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
                  min="100"
                  value={marketValue}
                  onChange={(e) => setMarketValue(e.target.value ? Number(e.target.value) : '')}
                  placeholder="e.g. 50000"
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
                placeholder="e.g. 6 months, 1 year"
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
                required
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="">-- Select Product Condition --</option>
                <option value="Brand New">Brand New (Sealed / Unused)</option>
                <option value="Like New">Like New (Pristine, 0 marks)</option>
                <option value="Excellent">Excellent (Minimal signs of use)</option>
                <option value="Good">Good (Normal cosmetic wear, 100% functional)</option>
                <option value="Fair">Fair (Noticeable cosmetic wear, fully tested)</option>
              </select>
            </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block">
                      Custom Rental Terms / Owner Conditions <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      value={customTerms}
                      onChange={(e) => setCustomTerms(e.target.value)}
                      placeholder="e.g., Must return with fully charged battery. No beach photography."
                      rows={2}
                      className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white text-sm"
                    />
                  </div>
                  
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block">
                      Included Accessories <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
              <input
                type="text"
                value={accessories}
                onChange={(e) => setAccessories(e.target.value)}
                placeholder="e.g. 2 Batteries, 128GB SD card, charger, case"
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
              placeholder="Describe your equipment features, performance, and rental pickup terms..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Section 2: Smart Pricing & Deposit */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-500" />
              2. Rental Rates & Security Deposit
            </h3>
            {marketValue && condition && (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                Smart Pricing Applied
              </span>
            )}
          </div>

          {marketValue && condition ? (
            <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Recommended Daily Rate</p>
                  <p className="text-[11px] text-slate-500">Based on ₹{marketValue} market value and {condition} condition</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">₹{dailyRent || 0}</span>
                  <span className="text-xs text-slate-500"> / day</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 flex justify-between">
                  <span className="text-slate-500">3+ Days Rate:</span>
                  <span className="font-bold text-slate-900 dark:text-white">₹{Math.round((Number(dailyRent) || 0) * 0.93)}/day</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 flex justify-between">
                  <span className="text-slate-500">7+ Days Rate:</span>
                  <span className="font-bold text-slate-900 dark:text-white">₹{Math.round((Number(dailyRent) || 0) * 0.875)}/day</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 text-center">
              💡 Enter your equipment's <strong>Market Value</strong> and <strong>Condition</strong> above to calculate recommended rates.
            </div>
          )}

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
                  min="10"
                  value={dailyRent}
                  onChange={(e) => setDailyRent(e.target.value ? Number(e.target.value) : '')}
                  placeholder="e.g. 650"
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
                  min="100"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value ? Number(e.target.value) : '')}
                  placeholder="e.g. 3000"
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
              Upload Product Photo *
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
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-emerald-600">✓ Uploaded Image Preview:</span>
                  <button
                    type="button"
                    onClick={() => setImagePreview('')}
                    className="text-rose-500 hover:underline font-bold cursor-pointer"
                  >
                    Remove Photo
                  </button>
                </div>
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
                  onChange={(e) => setLatitude(e.target.value ? Number(e.target.value) : '')}
                  placeholder="e.g. 16.5449"
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
                  onChange={(e) => setLongitude(e.target.value ? Number(e.target.value) : '')}
                  placeholder="e.g. 81.5212"
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
