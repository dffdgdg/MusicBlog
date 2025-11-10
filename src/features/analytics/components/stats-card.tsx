"use client";

import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: 'orange' | 'purple' | 'cyan' | 'green';
  delay?: number;
}

export function StatsCard({ title, value, icon, color, delay = 0 }: StatsCardProps) {
  const getColorClasses = () => {
    switch (color) {
      case 'orange':
        return 'from-orange-500/10 to-orange-500/5 border-orange-500/20 text-orange-400';
      case 'purple':
        return 'from-purple-500/10 to-purple-500/5 border-purple-500/20 text-purple-400';
      case 'cyan':
        return 'from-cyan-500/10 to-cyan-500/5 border-cyan-500/20 text-cyan-400';
      case 'green':
        return 'from-green-500/10 to-green-500/5 border-green-500/20 text-green-400';
      default:
        return 'from-orange-500/10 to-orange-500/5 border-orange-500/20 text-orange-400';
    }
  };

  const getIconBgClass = () => {
    switch (color) {
      case 'orange': return 'bg-orange-500/20';
      case 'purple': return 'bg-purple-500/20';
      case 'cyan': return 'bg-cyan-500/20';
      case 'green': return 'bg-green-500/20';
      default: return 'bg-orange-500/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`bg-gradient-to-br rounded-2xl p-6 border ${getColorClasses()} hover:scale-[1.02] transition-all duration-300 group`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 ${getIconBgClass()} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <div>
          <p className="text-slate-400 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}