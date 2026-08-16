import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { isAdminEmail } from '../data/adminEmails';
import toast from 'react-hot-toast';
import { 
  PlusCircle, 
  Heart, 
  User, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Compass, 
  ShieldCheck, 
  LogOut,
  Sparkles,
  ChevronRight,
  MessageSquare
} from 'lucide-react';

export const Navbar = ({ onOpenFeedback }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const { wishlist } = useBooking();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Auto-close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const handleWishlistClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      toast('Please log in or sign up to view your saved wishlist', { icon: '🔒' });
      navigate('/login');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform duration-300">
              B
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                BorrowBridge
                <span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />
              </span>
              <span className="block text-[10px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">
                Own Less • Access More
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Link 
              to="/explore" 
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold tracking-wide transition-all ${
                isActive('/explore')
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Compass className="w-4 h-4 text-blue-500" />
              Marketplace
            </Link>

            {(!user || user.role !== 'Consumer / Buyer') && (
              <Link 
                to="/list-item" 
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold tracking-wide transition-all ${
                  isActive('/list-item')
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <PlusCircle className="w-4 h-4 text-emerald-500" />
                List Item
              </Link>
            )}

            {/* Website Feedback Desktop Trigger */}
            <button
              onClick={onOpenFeedback}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition cursor-pointer"
              title="Give Website Feedback"
            >
              <MessageSquare className="w-4 h-4 text-amber-500" />
              Site Feedback
            </button>

            {user && isAdminEmail(user.email) && (
              <Link 
                to="/admin" 
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold tracking-wide transition-all ${
                  isActive('/admin')
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm' 
                    : 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-purple-500" />
                Admin Portal
              </Link>
            )}
          </nav>

          {/* Right Action Icons & User Auth (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Saved Wishlist */}
            <Link
              to="/profile?tab=wishlist"
              onClick={handleWishlistClick}
              className="relative p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Saved Items"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              {isAuthenticated && wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* User Account */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-teal-600 text-white font-bold text-xs flex items-center justify-center">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 max-w-[90px] truncate">
                    {user.name}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                        {user.role}
                      </span>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
                    >
                      <User className="w-4 h-4 text-blue-500" />
                      My Account & Bookings
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-xs font-bold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-xl shadow-sm hover:opacity-90 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}

          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 pt-4 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="space-y-1">
            <Link
              to="/explore"
              className={`flex items-center justify-between p-3 rounded-2xl text-sm font-bold ${
                isActive('/explore')
                  ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400'
                  : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Compass className="w-5 h-5 text-blue-500" />
                <span>Marketplace</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            {(!user || user.role !== 'Consumer / Buyer') && (
              <Link
                to="/list-item"
                className={`flex items-center justify-between p-3 rounded-2xl text-sm font-bold ${
                  isActive('/list-item')
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <PlusCircle className="w-5 h-5 text-emerald-500" />
                  <span>List Item for Rent</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenFeedback) onOpenFeedback();
              }}
              className="w-full flex items-center justify-between p-3 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-amber-500" />
                <span>Website Feedback</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            {user && isAdminEmail(user.email) && (
              <Link
                to="/admin"
                className="flex items-center justify-between p-3 rounded-2xl text-sm font-bold text-purple-600 dark:text-purple-400"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-purple-500" />
                  <span>Admin Governance</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            )}

            <Link
              to="/profile?tab=wishlist"
              className="flex items-center justify-between p-3 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-300"
            >
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-rose-500" />
                <span>Saved Wishlist ({wishlist.length})</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </nav>

          {/* User Auth Section on Mobile */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
            {isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  to="/profile"
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/70"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-sm">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{user.name}</p>
                      <p className="text-[10px] text-slate-400">{user.email}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                    navigate('/');
                  }}
                  className="w-full py-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-extrabold flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  className="py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-extrabold text-center"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="py-3 rounded-2xl bg-blue-600 text-white text-xs font-extrabold text-center shadow-md shadow-blue-500/25"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
