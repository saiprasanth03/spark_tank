import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { categories } from '../data/items';
import { isAdminEmail } from '../data/adminEmails';
import { EditProductModal } from '../components/EditProductModal';
import { 
  ShieldCheck, 
  Users, 
  Package, 
  IndianRupee, 
  Activity, 
  Search, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Lock, 
  RefreshCw, 
  Sliders, 
  Bot, 
  TrendingUp, 
  FileSpreadsheet,
  ShieldAlert,
  Edit3,
  X,
  RotateCcw,
  AlertTriangle
} from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    items, 
    myBookings, 
    allUsers, 
    updateItem, 
    deleteItem, 
    clearTestListings,
    resetAllToDefault,
    updateUser, 
    deleteUser, 
    toggleVerifyUser, 
    updateBooking, 
    releaseEscrowDeposit, 
    deductEscrowDeposit 
  } = useBooking();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all'); // 'all', 'custom', 'base'

  const [commissionRate, setCommissionRate] = useState(10);
  const [escrowHoldDays, setEscrowHoldDays] = useState(3);

  // EDIT MODAL STATES
  const [editingItem, setEditingItem] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);
  const [damageDeductionInput, setDamageDeductionInput] = useState(500);

  // STRICT SECURITY CHECK
  const isAuthorizedAdmin = user && isAdminEmail(user.email);

  if (!isAuthorizedAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="glass-card p-8 sm:p-10 rounded-3xl space-y-6 border border-slate-200/80 dark:border-slate-800 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto shadow">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Access Restricted
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              The Admin Portal is restricted to authorized administrators only.
            </p>
          </div>

          <Link
            to="/explore"
            className="w-full inline-flex items-center justify-center py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md transition"
          >
            Return to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  // Derived stats
  const totalListings = items.length;
  const userAddedItems = items.filter(i => i.id.startsWith('item-17'));
  const userAddedCount = userAddedItems.length;
  const baseCatalogCount = items.length - userAddedCount;

  const totalVolume = items.reduce((acc, curr) => acc + (curr.dailyRent * 5), 0) + 12400;
  const totalDepositsHeld = myBookings.filter(b => b.escrowStatus === 'Held in Escrow').reduce((acc, curr) => acc + curr.deposit, 0) + 8400;

  const filteredItems = items.filter(i => {
    if (sourceFilter === 'custom' && !i.id.startsWith('item-17')) return false;
    if (sourceFilter === 'base' && i.id.startsWith('item-17')) return false;
    if (categoryFilter !== 'all' && i.category.toLowerCase() !== categoryFilter.toLowerCase()) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return i.title.toLowerCase().includes(q) || i.owner.name.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* ADMIN PORTAL HEADER */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Authenticated Administrator: {user.email}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Full Admin Control & Escrow Governance Portal
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Modify any product listing, manage user credentials & roles, resolve escrow deposit claims, and configure system rules.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toast.success('Platform governance report exported to CSV')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold backdrop-blur-md transition flex items-center gap-2 border border-white/20"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            Export Audit Logs
          </button>
        </div>
      </div>

      {/* METRICS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-3xl space-y-2 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-extrabold uppercase tracking-wider">Total Volume</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            ₹{totalVolume.toLocaleString()}
          </h3>
          <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +18.4% growth this month
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-2 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-extrabold uppercase tracking-wider">Active Listings</span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {totalListings}
          </h3>
          <p className="text-xs text-blue-600 font-bold">
            Full Admin Edit Controls Active
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-2 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-extrabold uppercase tracking-wider">Escrow Deposits</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600">
              <Lock className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            ₹{totalDepositsHeld.toLocaleString()}
          </h3>
          <p className="text-xs text-amber-600 font-bold">
            Escrow Refund & Damage Override
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-2 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-extrabold uppercase tracking-wider">Verified Members</span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {allUsers.length}
          </h3>
          <p className="text-xs text-purple-600 font-bold">
            Roles & Status Editable
          </p>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          Overview
        </button>

        <button
          onClick={() => setActiveTab('listings')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'listings'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          Listings Control ({items.length})
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'users'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          User Management ({allUsers.length})
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'bookings'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Lock className="w-4 h-4" />
          Escrow & Bookings ({myBookings.length})
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'settings'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Sliders className="w-4 h-4" />
          System Settings
        </button>
      </div>

      {/* TAB CONTENT PANELS */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 glass-card p-6 rounded-3xl space-y-6 border border-slate-200/80 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center justify-between">
              <span>Category Rental Distribution</span>
              <span className="text-xs text-slate-500 font-normal">Updated Live</span>
            </h3>

            <div className="space-y-4">
              {[
                { name: 'Cameras & Optics', count: '38%', color: 'bg-blue-600' },
                { name: 'Laptops & Computers', count: '24%', color: 'bg-teal-500' },
                { name: 'Camping & Outdoors', count: '18%', color: 'bg-emerald-500' },
                { name: 'Power Tools & DIY', count: '12%', color: 'bg-amber-500' },
                { name: 'Drones & Music', count: '8%', color: 'bg-purple-600' }
              ].map((cat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>{cat.name}</span>
                    <span>{cat.count}</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${cat.color} rounded-full`} style={{ width: cat.count }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 glass-card p-6 rounded-3xl space-y-4 border border-slate-200/80 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">
              Live Audit Stream
            </h3>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 space-y-1">
                <span className="font-bold text-emerald-600">Product Edited</span>
                <p>Admin updated rate for Canon EOS R5</p>
                <span className="text-[10px] text-slate-400">Just now</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 space-y-1">
                <span className="font-bold text-blue-600">User Role Updated</span>
                <p>Admin set role to Seller / Owner for Sarah Jenkins</p>
                <span className="text-[10px] text-slate-400">10 mins ago</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LISTINGS CONTROL (FULL EDITABILITY & FAKE LISTINGS REMOVAL) */}
      {activeTab === 'listings' && (
        <div className="glass-card p-6 rounded-3xl space-y-6 border border-slate-200/80 dark:border-slate-800">
          
          {/* Top Row: Search, Category & Source Filters */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search items, titles, or lenders..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id === 'all' ? 'all' : c.name}>{c.name}</option>
                ))}
              </select>

              {/* Source Filter (All / Added Products / Base) */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
                <button
                  onClick={() => setSourceFilter('all')}
                  className={`px-3 py-1 rounded-lg transition ${sourceFilter === 'all' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm' : 'text-slate-500'}`}
                >
                  All ({items.length})
                </button>
                <button
                  onClick={() => setSourceFilter('custom')}
                  className={`px-3 py-1 rounded-lg transition ${sourceFilter === 'custom' ? 'bg-white dark:bg-slate-900 text-amber-600 shadow-sm' : 'text-slate-500'}`}
                >
                  User-Added ({userAddedCount})
                </button>
                <button
                  onClick={() => setSourceFilter('base')}
                  className={`px-3 py-1 rounded-lg transition ${sourceFilter === 'base' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm' : 'text-slate-500'}`}
                >
                  Base Catalog ({baseCatalogCount})
                </button>
              </div>
            </div>
          </div>

          {/* Quick Admin Cleanup Action Bar */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>Fake / Test Listing Moderation Actions:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {userAddedCount > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to remove all ${userAddedCount} user-added / test listings?`)) {
                      clearTestListings();
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove All {userAddedCount} Added/Test Listings
                </button>
              )}

              <button
                onClick={() => {
                  if (window.confirm('Reset marketplace to base catalog? This will remove all temporary listings.')) {
                    resetAllToDefault();
                  }
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Base Catalog
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Item</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Lender</th>
                  <th className="p-3.5">Daily Rent</th>
                  <th className="p-3.5">Deposit</th>
                  <th className="p-3.5 rounded-r-xl text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200 font-medium">
                {filteredItems.map(item => {
                  const isUserAdded = item.id.startsWith('item-17');

                  return (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                      <td className="p-3.5 flex items-center gap-3">
                        <img src={item.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                        <span className="font-bold max-w-[180px] truncate">{item.title}</span>
                      </td>
                      <td className="p-3.5">
                        {isUserAdded ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-extrabold text-[10px]">
                            User Added
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold text-[10px]">
                            Catalog
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 font-semibold text-blue-600 dark:text-blue-400">{item.category}</td>
                      <td className="p-3.5 truncate max-w-[120px]">{item.owner.name}</td>
                      <td className="p-3.5 font-bold">₹{item.dailyRent}/day</td>
                      <td className="p-3.5 font-bold text-emerald-600">₹{item.deposit}</td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => setEditingItem({ ...item })}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition inline-flex items-center gap-1 cursor-pointer"
                          title="Edit Item Details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Permanently remove "${item.title}"?`)) {
                              deleteItem(item.id);
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-600 hover:text-white font-bold transition inline-flex items-center gap-1 cursor-pointer"
                          title="Remove / Delete Listing"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: USER MANAGEMENT (FULL EDITABILITY) */}
      {activeTab === 'users' && (
        <div className="glass-card p-6 rounded-3xl space-y-6 border border-slate-200/80 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">
            Registered Marketplace Users & Roles
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5 rounded-l-xl">User Name</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5">Verification Status</th>
                  <th className="p-3.5">Phone & Location</th>
                  <th className="p-3.5 rounded-r-xl text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200 font-medium">
                {allUsers.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td className="p-3.5 font-bold">{u.name}</td>
                    <td className="p-3.5 text-slate-500">{u.email}</td>
                    <td className="p-3.5 font-semibold text-blue-600 dark:text-blue-400">{u.role}</td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        u.status === 'Verified' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-500">{u.phone || 'Not set'} • {u.location || 'Bhimavaram'}</td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => setEditingUser({ ...u })}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition inline-flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit User
                      </button>
                      <button
                        onClick={() => toggleVerifyUser(u.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200 transition"
                      >
                        Toggle Status
                      </button>
                      <button
                        onClick={() => deleteUser(u.id)}
                        className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100 transition"
                        title="Remove User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: BOOKINGS & ESCROW OVERRIDE (FULL EDITABILITY) */}
      {activeTab === 'bookings' && (
        <div className="glass-card p-6 rounded-3xl space-y-6 border border-slate-200/80 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">
            Escrow Deposit Claims & Booking Edits
          </h3>

          <div className="space-y-4">
            {myBookings.map(bk => (
              <div key={bk.id} className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-4">
                  <img src={bk.itemImage} alt="" className="w-16 h-16 rounded-xl object-cover" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{bk.itemTitle}</h4>
                    <p className="text-xs text-slate-500">
                      ID: {bk.id} • Lender: <span className="font-semibold text-slate-700 dark:text-slate-300">{bk.ownerName}</span> • Renter: <span className="font-semibold text-slate-700 dark:text-slate-300">{bk.renterName || 'Consumer'}</span>
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                        {bk.status}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                        {bk.escrowStatus}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right flex flex-wrap items-center justify-end gap-3">
                  <div>
                    <span className="text-xs text-slate-400 block">Security Deposit</span>
                    <span className="text-lg font-extrabold text-emerald-600">₹{bk.deposit}</span>
                  </div>

                  <button
                    onClick={() => setEditingBooking({ ...bk })}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit Booking & Escrow
                  </button>

                  {bk.escrowStatus === 'Held in Escrow' && (
                    <button
                      onClick={() => releaseEscrowDeposit(bk.id)}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow"
                    >
                      Release Escrow
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SYSTEM SETTINGS */}
      {activeTab === 'settings' && (
        <div className="glass-card p-8 rounded-3xl space-y-6 border border-slate-200/80 dark:border-slate-800 max-w-2xl">
          <h3 className="font-bold text-slate-900 dark:text-white text-xl pb-3 border-b border-slate-100 dark:border-slate-800">
            Platform Governance & Fee Settings
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>BorrowBridge Platform Commission Rate</span>
                <span className="text-blue-600 font-extrabold">{commissionRate}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                value={commissionRate}
                onChange={(e) => setCommissionRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="space-y-2 pt-4">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Automatic Deposit Refund Escrow Buffer</span>
                <span className="text-emerald-600 font-extrabold">{escrowHoldDays} Days post-return</span>
              </div>
              <input
                type="range"
                min="1"
                max="14"
                value={escrowHoldDays}
                onChange={(e) => setEscrowHoldDays(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div className="pt-4">
              <button
                onClick={() => toast.success('System parameters saved successfully')}
                className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md"
              >
                Save System Parameters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MASTER EDIT PRODUCT MODAL */}
      <EditProductModal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        item={editingItem}
        onSave={updateItem}
        isSuperAdmin={true}
      />

      {/* EDIT USER MODAL */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg glass-card bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" /> Edit User Account
              </h3>
              <button onClick={() => setEditingUser(null)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">User Full Name</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 font-medium border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">User Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 font-medium border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Platform Role</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 font-bold text-blue-600 border border-slate-200 dark:border-slate-700"
                  >
                    <option value="Seller / Owner">Seller / Owner</option>
                    <option value="Consumer / Buyer">Consumer / Buyer</option>
                    <option value="Both">Both</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Verification Status</label>
                  <select
                    value={editingUser.status}
                    onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 font-bold text-emerald-600 border border-slate-200 dark:border-slate-700"
                  >
                    <option value="Verified">Verified</option>
                    <option value="Pending Verification">Pending Verification</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                updateUser(editingUser.id, editingUser);
                setEditingUser(null);
              }}
              className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg transition"
            >
              Save User Profile Changes
            </button>
          </div>
        </div>
      )}

      {/* EDIT BOOKING & ESCROW MODAL */}
      {editingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg glass-card bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-500" /> Escrow Deposit & Booking Override
              </h3>
              <button onClick={() => setEditingBooking(null)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 space-y-1">
                <p className="font-bold text-slate-900 dark:text-white">{editingBooking.itemTitle}</p>
                <p className="text-slate-500">Booking ID: {editingBooking.id}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Booking Status</label>
                  <select
                    value={editingBooking.status}
                    onChange={(e) => setEditingBooking({ ...editingBooking, status: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 font-bold border border-slate-200 dark:border-slate-700"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Under Inspection">Under Inspection</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Escrow Deposit (₹)</label>
                  <input
                    type="number"
                    value={editingBooking.deposit}
                    onChange={(e) => setEditingBooking({ ...editingBooking, deposit: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 font-bold text-emerald-600 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              {/* Escrow Quick Actions */}
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <label className="font-bold text-slate-700 dark:text-slate-300 block">Quick Escrow Actions:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      releaseEscrowDeposit(editingBooking.id);
                      setEditingBooking(null);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-bold text-[11px] shadow hover:bg-emerald-700 transition"
                  >
                    Release Full Deposit
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      deductEscrowDeposit(editingBooking.id, damageDeductionInput);
                      setEditingBooking(null);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-rose-600 text-white font-bold text-[11px] shadow hover:bg-rose-700 transition"
                  >
                    Deduct ₹{damageDeductionInput} for Damages
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                updateBooking(editingBooking.id, editingBooking);
                setEditingBooking(null);
              }}
              className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg transition"
            >
              Save Booking Edits
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
