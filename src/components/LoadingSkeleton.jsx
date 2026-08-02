import React from 'react';

export const LoadingSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="glass-card p-4 space-y-4 animate-pulse rounded-2xl border border-slate-200 dark:border-slate-800"
        >
          <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="flex items-center justify-between">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
          </div>
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between">
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
};
