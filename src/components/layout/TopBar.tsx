// ============================================================
// TOP BAR COMPONENT
// ============================================================

import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Overview of your activity' },
  '/post-ride': { title: 'Post a Ride', subtitle: 'Share your journey with others' },
  '/search-rides': { title: 'Search Rides', subtitle: 'Find your perfect ride with AI' },
  '/my-bookings': { title: 'My Bookings', subtitle: 'Manage your ride reservations' },
  '/ride-history': { title: 'Ride History', subtitle: 'Your travel records' },
  '/analytics': { title: 'Analytics', subtitle: 'Performance insights & trends' },
  '/ai-recommendations': { title: 'AI Recommendations', subtitle: 'Powered by Google Gemini & KNN ML' },
  '/profile': { title: 'Profile', subtitle: 'Manage your account settings' },
  '/notifications': { title: 'Notifications', subtitle: 'Stay updated with alerts' },
};

export default function TopBar() {
  const { user } = useAuth();
  const { unreadCount } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const pageInfo = pageTitles[location.pathname] || { title: 'RideShare AI', subtitle: '' };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4 flex items-center justify-between shadow-sm">
      {/* Breadcrumb & Title */}
      <div className="pl-10 lg:pl-0">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-0.5">
          <span>Home</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-600 font-medium">{pageInfo.title}</span>
        </div>
        <h2 className="text-lg font-bold text-slate-800">{pageInfo.title}</h2>
        <p className="text-xs text-slate-400">{pageInfo.subtitle}</p>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <button
          onClick={() => navigate('/search-rides')}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 text-sm transition-colors"
        >
          <Search className="w-4 h-4" />
          <span className="text-slate-400">Search rides...</span>
          <kbd className="hidden md:inline text-[10px] px-1.5 py-0.5 bg-slate-200 rounded text-slate-500 font-mono">⌘K</kbd>
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => navigate('/notifications')}
          className="relative w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Avatar */}
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-violet-200">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-slate-700 leading-tight">{user?.name}</p>
            <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
          </div>
        </button>
      </div>
    </header>
  );
}
