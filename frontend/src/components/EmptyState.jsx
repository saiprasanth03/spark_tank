import React from 'react';
import { Link } from 'react-router-dom';
import { SearchX, PlusCircle, RefreshCw } from 'lucide-react';

export const EmptyState = ({
  title = "No rental items found",
  message = "Try adjusting your search criteria, clearing category filters, or broadening your location radius.",
  actionText = "Reset Filters",
  onAction,
  showListButton = true
}) => {
  return (
    <div className="glass-card p-12 text-center max-w-lg mx-auto my-8 space-y-4 border border-dashed border-slate-300 dark:border-slate-700">
      <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-inner">
        <SearchX className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
        {title}
      </h3>

      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
        {message}
      </p>

      <div className="flex items-center justify-center gap-3 pt-2">
        {onAction && (
          <button
            onClick={onAction}
            className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            {actionText}
          </button>
        )}

        {showListButton && (
          <Link
            to="/list-item"
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-md shadow-blue-500/25 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            List Your Item
          </Link>
        )}
      </div>
    </div>
  );
};
