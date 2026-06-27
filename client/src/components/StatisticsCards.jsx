import React from 'react';
import { motion } from 'framer-motion';
import { Film, Trophy, DollarSign, Clock } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="glass-panel p-6 relative overflow-hidden group glass-panel-hover"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClass} opacity-10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
    
    <div className="flex items-center justify-between mb-4 relative z-10">
      <h3 className="text-slate-400 font-medium text-sm">{title}</h3>
      <div className={`p-2 rounded-lg bg-white/5 border border-white/10 ${colorClass.split(' ')[0].replace('from', 'text')}`}>
        <Icon size={18} />
      </div>
    </div>
    
    <div className="relative z-10">
      <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
    </div>
  </motion.div>
);

const StatisticsCards = ({ movies }) => {
  const topMovie = movies.length > 0 ? movies[0] : null;
  const highestGross = topMovie ? topMovie.totalGross : '-';
  const topMovieTitle = topMovie ? topMovie.title : '-';
  
  const stats = [
    {
      title: "Total Movies",
      value: movies.length,
      icon: Film,
      colorClass: "from-blue-500 to-cyan-500 text-cyan-400",
      delay: 0.1
    },
    {
      title: "#1 Movie",
      value: topMovieTitle.length > 15 ? topMovieTitle.substring(0, 15) + '...' : topMovieTitle,
      icon: Trophy,
      colorClass: "from-yellow-500 to-orange-500 text-yellow-400",
      delay: 0.2
    },
    {
      title: "Highest Gross",
      value: highestGross,
      icon: DollarSign,
      colorClass: "from-green-500 to-emerald-500 text-emerald-400",
      delay: 0.3
    },
    {
      title: "Last Updated",
      value: "Just now",
      icon: Clock,
      colorClass: "from-purple-500 to-pink-500 text-purple-400",
      delay: 0.4
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  );
};

export default StatisticsCards;
