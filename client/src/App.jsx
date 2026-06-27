import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import HeroSection from './components/HeroSection';
import StatisticsCards from './components/StatisticsCards';
import AnalyticsSection from './components/AnalyticsSection';
import MoviesTable from './components/MoviesTable';
import { fetchMovies, refreshMovies } from './utils/api';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const loadMovies = async () => {
    try {
      setIsLoading(true);
      const data = await fetchMovies();
      if (data && data.success) {
        setMovies(data.data);
      }
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('Failed to fetch movies. Please ensure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      const data = await refreshMovies();
      if (data && data.success) {
        setMovies(data.data);
      }
    } catch (err) {
      console.error('Error refreshing movies:', err);
      alert('Failed to refresh movies.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const renderContent = () => {
    if (activeTab === 'Dashboard') {
      return (
        <>
          <HeroSection onRefresh={handleRefresh} isRefreshing={isRefreshing} />
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-8">
              {error}
            </div>
          )}
          <StatisticsCards movies={movies} />
          <AnalyticsSection movies={movies} />
          <MoviesTable movies={movies} isLoading={isLoading} />
        </>
      );
    }
    
    if (activeTab === 'Top Movies') {
      return (
        <>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Top Movies List</h2>
            <p className="text-slate-400">Detailed view of the current US box office standings.</p>
          </div>
          <MoviesTable movies={movies} isLoading={isLoading} />
        </>
      );
    }
    
    if (activeTab === 'Analytics') {
      return (
        <>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Box Office Analytics</h2>
            <p className="text-slate-400">Financial insights and performance tracking.</p>
          </div>
          <StatisticsCards movies={movies} />
          <AnalyticsSection movies={movies} />
        </>
      );
    }

    if (activeTab === 'Database') {
      return (
        <div className="glass-panel p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Database Connection</h2>
          <div className="flex items-center gap-3 mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-emerald-400 font-medium">MongoDB Atlas Connected</span>
          </div>
          <p className="text-slate-400 mb-4">Showing {movies.length} documents from the 'movies' collection.</p>
          <div className="bg-[#111] p-4 rounded-xl overflow-x-auto border border-white/5">
            <pre className="text-sm text-slate-300 font-mono">
              {JSON.stringify(movies.slice(0, 3), null, 2)}
              {movies.length > 3 ? '\n\n... (more documents omitted)' : ''}
            </pre>
          </div>
        </div>
      );
    }

    if (activeTab === 'Settings') {
      return (
        <div className="glass-panel p-8 text-center py-20">
          <h2 className="text-3xl font-bold text-white mb-4">Settings</h2>
          <p className="text-slate-400">Dashboard configuration options will appear here.</p>
        </div>
      );
    }
  };

  return (
    <div className="flex bg-zinc-950 text-slate-200 min-h-screen">
      <div className="aurora-bg"></div>

      <Sidebar 
        onRefresh={handleRefresh} 
        isRefreshing={isRefreshing} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <main className="ml-64 flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
