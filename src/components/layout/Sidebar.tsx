// ============================================================
// SIDEBAR NAVIGATION COMPONENT
// ============================================================

import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home, Car, Search, BookOpen, History, User, BarChart2,
  Sparkles, LogOut, ChevronLeft, ChevronRight, Bell, Menu, X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

const driverLinks = [
  { to: '/dashboard', icon: Home, label: 'Dashboard' },
  { to: '/post-ride', icon: Car, label: 'Post Ride' },
  { to: '/search-rides', icon: Search, label: 'Search Rides' },
  { to: '/my-bookings', icon: BookOpen, label: 'My Bookings' },
  { to: '/ride-history', icon: History, label: 'Ride History' },
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/ai-recommendations', icon: Sparkles, label: 'AI Insights' },
  { to: '/profile', icon: User, label: 'Profile' },
];

const passengerLinks = [
  { to: '/dashboard', icon: Home, label: 'Dashboard' },
  { to: '/search-rides', icon: Search, label: 'Search Rides' },
  { to: '/my-bookings', icon: BookOpen, label: 'My Bookings' },
  { to: '/ride-history', icon: History, label: 'Ride History' },
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/ai-recommendations', icon: Sparkles, label: 'AI Insights' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { unreadCount } = useApp();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = user?.role === 'driver' ? driverLinks : passengerLinks;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg">
          <Car className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">RideShare</h1>
            <p className="text-violet-300 text-xs font-medium">AI Powered</p>
          </div>
        )}
      </div>

      {/* User Card */}
      {!collapsed && (
        <div className="mx-3 mt-4 p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">{user?.name}</p>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${user?.role === 'driver' ? 'bg-emerald-400' : 'bg-blue-400'}`} />
                <span className="text-violet-300 text-xs capitalize">{user?.role}</span>
              </div>
            </div>
          </div>
          <div className="mt-2 flex gap-2">
            <div className="flex-1 text-center py-1 rounded-lg bg-white/5">
              <p className="text-white text-xs font-bold">{user?.rating}★</p>
              <p className="text-violet-300 text-[10px]">Rating</p>
            </div>
            <div className="flex-1 text-center py-1 rounded-lg bg-white/5">
              <p className="text-white text-xs font-bold">{user?.totalRides}</p>
              <p className="text-violet-300 text-[10px]">Rides</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative
              ${isActive
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25'
                : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }
              ${collapsed ? 'justify-center' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                {!collapsed && <span>{label}</span>}
                {label === 'AI Insights' && !collapsed && (
                  <span className="ml-auto text-[10px] font-bold bg-violet-400/30 text-violet-300 px-1.5 py-0.5 rounded-full">AI</span>
                )}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                    {label}
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="px-3 pb-4 space-y-1">
        <button
          onClick={() => navigate('/notifications')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white text-sm font-medium transition-all duration-200 relative ${collapsed ? 'justify-center' : ''}`}
        >
          <div className="relative">
            <Bell className="w-5 h-5 text-slate-400" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          {!collapsed && <span>Notifications</span>}
          {!collapsed && unreadCount > 0 && (
            <span className="ml-auto text-[10px] font-bold bg-rose-500/20 text-rose-400 px-1.5 py-0.5 rounded-full">{unreadCount}</span>
          )}
        </button>

        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-400 hover:bg-rose-500/10 text-sm font-medium transition-all duration-200 ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-white shadow-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 z-50 transition-transform duration-300 shadow-2xl ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </div>

      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex flex-col h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 border-r border-white/5 transition-all duration-300 shadow-xl ${collapsed ? 'w-20' : 'w-72'} flex-shrink-0`}>
        <SidebarContent />
        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute right-0 top-20 translate-x-1/2 w-6 h-6 bg-slate-700 hover:bg-slate-600 rounded-full border border-white/10 flex items-center justify-center text-white transition-colors shadow-lg"
          style={{ position: 'absolute', right: collapsed ? '-12px' : '-12px' }}
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </div>
    </>
  );
}
