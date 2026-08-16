import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Mail, Github, Twitter, Instagram, Linkedin, ArrowRight, MessageSquare } from 'lucide-react';

export const Footer = ({ onOpenFeedback }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-teal-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg">
                B
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                BorrowBridge
              </span>
            </Link>
            
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              "Own Less. Access More."
              BorrowBridge is the premier hyperlocal rental marketplace connecting neighbors to share cameras, laptops, tools, camping gear, instruments, and books securely.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                <ShieldCheck className="w-4 h-4" />
                Escrow Deposit Protection
              </span>

              {/* Website Feedback Button in Footer */}
              <button
                onClick={onOpenFeedback}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-xs font-semibold border border-blue-500/20 transition cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Share Platform Feedback
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Explore Marketplace</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/explore?category=Cameras" className="hover:text-blue-400 transition">Cameras & Optics</Link></li>
              <li><Link to="/explore?category=Laptops" className="hover:text-blue-400 transition">Laptops & Tech</Link></li>
              <li><Link to="/explore?category=Books" className="hover:text-blue-400 transition">Books & Academic</Link></li>
              <li><Link to="/explore?category=Camping" className="hover:text-blue-400 transition">Camping & Outdoors</Link></li>
              <li><Link to="/explore?category=Tools" className="hover:text-blue-400 transition">Power Tools & DIY</Link></li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">BorrowBridge</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/list-item" className="hover:text-blue-400 transition">List an Item</Link></li>
              <li><Link to="/explore" className="hover:text-blue-400 transition">Interactive Map</Link></li>
              <li><Link to="/profile" className="hover:text-blue-400 transition">User Dashboard</Link></li>
              <li><button onClick={onOpenFeedback} className="hover:text-blue-400 transition text-left cursor-pointer">Give Website Feedback</button></li>
              <li><a href="#testimonials" className="hover:text-blue-400 transition">Trust & Reviews</a></li>
            </ul>
          </div>

          {/* Column 4: Stay Connected */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Stay Connected</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get notified when new high-value gear becomes available in your neighborhood.
            </p>
            
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-1.5">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition shadow-md shadow-blue-600/30 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition"><Github className="w-4 h-4" /></a>
            </div>
          </div>

        </div>

        {/* Bottom copyright & legal links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 BorrowBridge Inc. Hyperlocal P2P Rental Platform in Bhimavaram, AP.</p>
          <div className="flex items-center gap-6">
            <button onClick={onOpenFeedback} className="hover:text-slate-400 transition cursor-pointer">Platform Feedback</button>
            <a href="#" className="hover:text-slate-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition">Escrow Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
