import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Save, 
  Tag, 
  IndianRupee, 
  ShieldCheck, 
  MapPin, 
  Image as ImageIcon, 
  CheckCircle2, 
  FileText, 
  Upload, 
  Navigation,
  Sparkles
} from 'lucide-react';
import { categories } from '../data/items';
import toast from 'react-hot-toast';

export const EditProductModal = ({ isOpen, onClose, item, onSave, isSuperAdmin = false }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Cameras');
  const [condition, setCondition] = useState('Good');
  const [dailyRent, setDailyRent] = useState(500);
  const [deposit, setDeposit] = useState(2500);
  const [marketValue, setMarketValue] = useState(30000);
  const [description, setDescription] = useState('');
  const [customTerms, setCustomTerms] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [additionalImages, setAdditionalImages] = useState([]);
  const [newAdditionalImage, setNewAdditionalImage] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
  const [latitude, setLatitude] = useState(16.5449);
  const [longitude, setLongitude] = useState(81.5212);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    if (item) {
      setTitle(item.title || '');
      setCategory(item.category || 'Cameras');
      setCondition(item.condition || 'Good');
      setDailyRent(item.dailyRent || 500);
      setDeposit(item.deposit || 2500);
      setMarketValue(item.marketValue || 30000);
      setDescription(item.description || '');
      setCustomTerms(item.customTerms || '');
      setFeatures(Array.isArray(item.features) ? item.features.join(', ') : (item.features || ''));
      
      const allImages = item.images || [];
      setImageUrl(allImages[0] || '');
      setAdditionalImages(allImages.slice(1));
      
      setLocationAddress(item.location?.address || 'SRKR College Road, Bhimavaram, AP');
      setLatitude(item.location?.lat || 16.5449);
      setLongitude(item.location?.lng || 81.5212);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleAutoDetectGPS = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setLatitude(lat);
        setLongitude(lng);

        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
          const data = await res.json();
          const place = data.display_name || `${data.address?.suburb || 'Local'}, Bhimavaram, AP`;
          setLocationAddress(place);
          toast.success('📍 Exact GPS coordinates updated!');
        } catch (e) {
          toast.success('📍 GPS coordinates captured!');
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        setIsLocating(false);
        toast.error('Location permission denied.');
      }
    );
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);
      toast.success('Image uploaded for preview!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Please enter a product title');
      return;
    }

    const featuresArray = features
      ? features.split(',').map(f => f.trim()).filter(Boolean)
      : item.features || ['Original Accessories', 'Tested & Verified'];

    const updatedData = {
      title: title.trim(),
      category,
      condition,
      dailyRent: Number(dailyRent),
      threeDayRent: Math.round(Number(dailyRent) * 0.93),
      sevenDayRent: Math.round(Number(dailyRent) * 0.875),
      deposit: Number(deposit),
      marketValue: Number(marketValue),
      description: description.trim(),
      customTerms: customTerms.trim(),
      features: featuresArray,
      images: [imageUrl, ...additionalImages].filter(Boolean),
      location: {
        city: 'Bhimavaram',
        address: locationAddress.trim() || 'Bhimavaram, AP',
        lat: Number(latitude) || 16.5449,
        lng: Number(longitude) || 81.5212
      }
    };

    onSave(item.id, updatedData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-3xl glass-card bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 dark:border-slate-800 my-8 max-h-[90vh] overflow-y-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase ${
                isSuperAdmin
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300'
                  : 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
              }`}>
                {isSuperAdmin ? '🛡️ Admin Master Edit' : '👤 Owner Edit Listing'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              Edit Product Listing
            </h2>
            <p className="text-xs text-slate-500">
              Update pricing, photos, specs, or pickup location for this equipment.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Row 1: Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Product Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Sony Alpha A7 IV Mirrorless Kit"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Custom Rental Terms (Optional)
              </label>
              <textarea
                value={customTerms}
                onChange={(e) => setCustomTerms(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:ring-2 focus:ring-blue-500"
                rows="2"
                placeholder="e.g. No beach use, must return fully charged"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 cursor-pointer"
              >
                {categories.filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Condition, Daily Rent, Security Deposit */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Item Condition *
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 cursor-pointer"
              >
                <option value="Brand New">Brand New</option>
                <option value="Like New">Like New</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Daily Rent (₹/day) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-xs text-slate-500">₹</span>
                <input
                  type="number"
                  required
                  min="20"
                  value={dailyRent}
                  onChange={(e) => setDailyRent(e.target.value)}
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-extrabold text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Security Deposit (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-xs text-slate-500">₹</span>
                <input
                  type="number"
                  required
                  min="100"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-extrabold text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-700"
                />
              </div>
            </div>
          </div>

          {/* Row 3: Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Detailed Description & Working Condition *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe gear features, working condition, accessories included..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Row 4: Key Accessories / Features */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Key Features & Included Accessories (Comma-Separated)
            </label>
            <input
              type="text"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder="e.g. 24-70mm Lens, 2x Extra Batteries, Hard Carrying Case, 128GB Card"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
            />
          </div>

          {/* Row 5: Photo URL & Upload Preview */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Product Photo URL or Local Upload</span>
              <span className="text-[11px] text-slate-400 font-normal">Direct image preview</span>
            </label>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1 w-full space-y-2">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
                />
                <div className="flex items-center gap-2">
                  <label className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 text-xs font-bold transition cursor-pointer flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    Upload from Device
                    <input type="file" accept="image/*" onChange={handleImageFileChange} className="hidden" />
                  </label>
                </div>
              </div>

              {imageUrl && (
                <div className="w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 flex-shrink-0 shadow-sm">
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Additional Images (Optional URLs)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newAdditionalImage}
                  onChange={(e) => setNewAdditionalImage(e.target.value)}
                  placeholder="Paste an image URL here..."
                  className="flex-1 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newAdditionalImage.trim()) {
                      setAdditionalImages(prev => [...prev, newAdditionalImage.trim()]);
                      setNewAdditionalImage('');
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs hover:bg-slate-300 dark:hover:bg-slate-600 transition"
                >
                  Add
                </button>
              </div>
              
              {additionalImages.length > 0 && (
                <div className="flex gap-3 overflow-x-auto py-2">
                  {additionalImages.map((img, idx) => (
                    <div key={idx} className="relative w-16 h-16 flex-shrink-0">
                      <img src={img} alt={`Additional ${idx}`} className="w-full h-full object-cover rounded-xl shadow-sm border border-slate-200 dark:border-slate-700" />
                      <button
                        type="button"
                        onClick={() => setAdditionalImages(prev => prev.filter((_, i) => i !== idx))}
                        className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 shadow-md hover:bg-rose-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Row 6: Location & GPS */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-500" />
                Bhimavaram Pickup Location & Coordinates
              </label>

              <button
                type="button"
                onClick={handleAutoDetectGPS}
                disabled={isLocating}
                className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center gap-1 border border-blue-200 dark:border-blue-800 transition cursor-pointer"
              >
                <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
                {isLocating ? 'Detecting GPS...' : '📍 Auto-Detect GPS'}
              </button>
            </div>

            <input
              type="text"
              value={locationAddress}
              onChange={(e) => setLocationAddress(e.target.value)}
              placeholder="e.g. Near SRKR Engineering College, Chinna Amiram, Bhimavaram"
              className="w-full px-4 py-2 rounded-xl bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
            />

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Latitude</span>
                <input
                  type="number"
                  step="any"
                  value={latitude}
                  onChange={(e) => setLatitude(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-mono text-xs"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Longitude</span>
                <input
                  type="number"
                  step="any"
                  value={longitude}
                  onChange={(e) => setLongitude(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-mono text-xs"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Save Listing Changes
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
};
