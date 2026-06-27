import React from 'react';
import { LayoutDashboard, Film, BarChart3, Database, RefreshCw, Settings } from 'lucide-react';
import clsx from 'clsx';

const Sidebar = ({ onRefresh, isRefreshing, activeTab, setActiveTab }) => {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Top Movies', icon: <Film size={20} /> },
    { name: 'Analytics', icon: <BarChart3 size={20} /> },
    { name: 'Database', icon: <Database size={20} /> },
    { name: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-64 h-screen fixed left-0 top-0 glass-panel border-l-0 border-t-0 border-b-0 rounded-none z-50 flex flex-col pt-8">
      <div className="px-6 mb-10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-yellow-400 via-orange-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
          M
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">IMDb <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-400">Pro</span></h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = activeTab === item.name;
          return (
            <button
              key={index}
              onClick={() => setActiveTab(item.name)}
              className={clsx(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium',
                isActive 
                  ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/10' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              )}
            >
              {item.icon}
              {item.name}
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 mt-auto mb-4">
        <button 
          onClick={onRefresh}
          disabled={isRefreshing}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-500 hover:to-orange-400 text-white font-medium shadow-lg shadow-purple-500/25 transition-all duration-300 disabled:opacity-50"
        >
          <RefreshCw size={18} className={clsx(isRefreshing && "animate-spin")} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
