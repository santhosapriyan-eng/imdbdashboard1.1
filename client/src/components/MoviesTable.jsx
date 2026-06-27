import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, ExternalLink, Play, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const MoviesTable = ({ movies, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Handle Sort
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filter and Sort Data
  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedMovies.length / itemsPerPage);
  const paginatedMovies = sortedMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return <div className="w-4" />;
    return sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="glass-panel overflow-hidden"
    >
      <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <TrendingUp size={20} className="text-neon-yellow" />
          Top 10 Box Office
        </h3>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search movies..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all w-full md:w-64"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-slate-400 text-sm border-b border-white/10">
              <th className="p-4 font-medium cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('rank')}>
                <div className="flex items-center gap-1">Rank <SortIcon columnKey="rank" /></div>
              </th>
              <th className="p-4 font-medium">Poster</th>
              <th className="p-4 font-medium cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('title')}>
                <div className="flex items-center gap-1">Movie <SortIcon columnKey="title" /></div>
              </th>
              <th className="p-4 font-medium cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('weekendGross')}>
                <div className="flex items-center gap-1">Weekend Gross <SortIcon columnKey="weekendGross" /></div>
              </th>
              <th className="p-4 font-medium cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('totalGross')}>
                <div className="flex items-center gap-1">Total Gross <SortIcon columnKey="totalGross" /></div>
              </th>
              <th className="p-4 font-medium cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('weeks')}>
                <div className="flex items-center gap-1">Weeks <SortIcon columnKey="weeks" /></div>
              </th>
              <th className="p-4 font-medium">Link</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <tr key={i} className="border-b border-white/5 animate-pulse">
                  <td className="p-4"><div className="h-4 w-6 bg-white/10 rounded"></div></td>
                  <td className="p-4"><div className="h-12 w-8 bg-white/10 rounded"></div></td>
                  <td className="p-4"><div className="h-4 w-48 bg-white/10 rounded"></div></td>
                  <td className="p-4"><div className="h-4 w-20 bg-white/10 rounded"></div></td>
                  <td className="p-4"><div className="h-4 w-24 bg-white/10 rounded"></div></td>
                  <td className="p-4"><div className="h-4 w-8 bg-white/10 rounded"></div></td>
                  <td className="p-4"><div className="h-6 w-6 bg-white/10 rounded"></div></td>
                </tr>
              ))
            ) : paginatedMovies.length > 0 ? (
              paginatedMovies.map((movie, idx) => (
                <tr 
                  key={movie._id || idx} 
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                >
                  <td className="p-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-neon-yellow font-bold text-sm border border-white/10">
                      {movie.rank}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="w-10 h-14 rounded overflow-hidden relative shadow-lg">
                      {movie.poster ? (
                        <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                          <Play size={16} className="text-slate-500" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-white group-hover:text-neon-purple transition-colors">{movie.title}</span>
                  </td>
                  <td className="p-4 text-emerald-400 font-medium">{movie.weekendGross}</td>
                  <td className="p-4 text-slate-300">{movie.totalGross}</td>
                  <td className="p-4 text-slate-400">{movie.weeks}</td>
                  <td className="p-4">
                    <a 
                      href={movie.imdbUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors inline-block"
                      title="View on IMDb"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-8 text-center text-slate-400">
                  No movies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {!isLoading && totalPages > 1 && (
        <div className="p-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-sm text-slate-400">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedMovies.length)} of {sortedMovies.length} entries
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-white/5 border border-white/10 text-sm text-white disabled:opacity-50 hover:bg-white/10 transition-colors"
            >
              Previous
            </button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded flex items-center justify-center text-sm transition-colors ${
                    currentPage === i + 1 
                      ? 'bg-neon-purple text-white shadow-[0_0_10px_rgba(192,132,252,0.3)]' 
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-white/5 border border-white/10 text-sm text-white disabled:opacity-50 hover:bg-white/10 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MoviesTable;
