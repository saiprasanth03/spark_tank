import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Search } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="glass-card p-10 sm:p-14 rounded-3xl max-w-lg space-y-6 border border-slate-200/80 dark:border-slate-800 shadow-2xl">
        <div className="w-20 h-20 rounded-3xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-inner">
          <Compass className="w-10 h-10 animate-spin [animation-duration:8s]" />
        </div>

        <div className="space-y-2">
          <span className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">404</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            The page you are looking for might have been moved or doesn't exist on BorrowBridge.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-blue-600 text-white font-extrabold text-sm hover:bg-blue-700 transition shadow-md shadow-blue-500/25 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            to="/explore"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            Explore Items
          </Link>
        </div>
      </div>
    </div>
  );
};
