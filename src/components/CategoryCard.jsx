import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Laptop, 
  Tv, 
  Wrench, 
  Tent, 
  Dumbbell, 
  Music, 
  Navigation, 
  Zap, 
  BookOpen,
  ArrowUpRight
} from 'lucide-react';

const iconMap = {
  Cameras: Camera,
  Laptops: Laptop,
  Projectors: Tv,
  Tools: Wrench,
  Camping: Tent,
  Sports: Dumbbell,
  Music: Music,
  Drones: Navigation,
  Electronics: Zap,
  Books: BookOpen,
};

export const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const IconComponent = iconMap[category.name] || Zap;

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/explore?category=${category.name}`)}
      className="glass-card p-5 cursor-pointer group flex flex-col justify-between h-40 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
    >
      {/* Background Gradient Blur */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br from-blue-500/10 via-teal-500/10 to-indigo-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />

      {/* Header with Icon & Arrow */}
      <div className="flex items-center justify-between z-10">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
          <IconComponent className="w-6 h-6" />
        </div>
        
        <span className="p-2 rounded-full text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 dark:group-hover:bg-slate-800 transition">
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>

      {/* Category Name & Action hint */}
      <div className="z-10 mt-auto">
        <h4 className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {category.name}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Browse items nearby →
        </p>
      </div>
    </motion.div>
  );
};
