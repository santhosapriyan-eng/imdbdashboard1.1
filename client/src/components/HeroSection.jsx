import React from 'react';
import { Database, Download, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = ({ onRefresh, isRefreshing }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
          IMDb US Top 10 Movies
        </h1>
        <p className="text-slate-400 flex items-center gap-2">
          Real-time Box Office Data Scraped from IMDb
          <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse"></span>
        </p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex gap-4"
      >
        <button 
          className="glass-panel px-5 py-2.5 text-sm font-medium text-slate-200 hover:text-white flex items-center gap-2 transition-all hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
          <Database size={16} />
          View Database
        </button>
        <button 
          onClick={onRefresh}
          disabled={isRefreshing}
          className="bg-white text-zinc-950 px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all hover:bg-slate-200 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:hover:scale-100"
        >
          <Download size={16} />
          {isRefreshing ? 'Scraping...' : 'Refresh Data'}
        </button>
      </motion.div>
    </div>
  );
};

export default HeroSection;
