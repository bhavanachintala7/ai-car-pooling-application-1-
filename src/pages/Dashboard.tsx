// ============================================================
// DASHBOARD PAGE
// Features: Stats, Charts, Recent Activity, Quick Actions
// ============================================================

import { useNavigate } from 'react-router-dom';
import {
  Car, BookOpen, Star, TrendingUp, Users, MapPin,
  Plus, Search, Zap, Clock, ChevronRight, Activity
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import StatCard from '../components/ui/StatCard';
import { StatusBadge } from '../components/ui/StatCard';
import { weeklyChartData } from '../data/mockData';

const PIE_COLORS = ['#7c3aed', '#2563eb', '#059669', '#d97706'];

export default function Dashboard() {
  const { user } = useAuth();
  const { rides, bookings } = useApp();
  const navigate = useNavigate();

  const isDriver = user?.role === 'driver';

  // Calculate stats
  const myRides = isDriver ? rides.filter((r) => r.driverId === user?.id) : [];
  const myBookings = bookings.filter((b) => b.passengerId === user?.id);
  const completedRides = isDriver
    ? myRides.filter((r) => r.status === 'completed').length
    : myBookings.filter((b) => b.status === 'completed').length;
  const activeRides = isDriver
    ? myRides.filter((r) => r.status === 'upcoming').length
    : myBookings.filter((b) => b.status === 'confirmed').length;

  const totalEarnings = myRides.reduce((sum, r) => {
    const booked = (r.totalSeats - r.availableSeats);
    return sum + booked * r.price;
  }, 0);

  const totalSpent = myBookings.reduce((sum, b) => sum + (b.status !== 'cancelled' ? b.totalPrice : 0), 0);

  const driverStats = [
    { title: 'Total Rides Posted', value: myRides.length, icon: <Car className="w-5 h-5" />, color: 'violet' as const, trend: { value: 12, label: 'vs last month' } },
    { title: 'Active Rides', value: activeRides, icon: <Activity className="w-5 h-5" />, color: 'blue' as const, trend: { value: 8, label: 'this week' } },
    { title: 'Total Earnings', value: `₹${totalEarnings.toLocaleString()}`, icon: <TrendingUp className="w-5 h-5" />, color: 'emerald' as const, trend: { value: 18, label: 'vs last month' } },
    { title: 'Average Rating', value: `${user?.rating}★`, icon: <Star className="w-5 h-5" />, color: 'amber' as const, trend: { value: 3, label: 'vs last month' } },
  ];

  const passengerStats = [
    { title: 'Total Bookings', value: myBookings.length, icon: <BookOpen className="w-5 h-5" />, color: 'violet' as const, trend: { value: 10, label: 'vs last month' } },
    { title: 'Confirmed Rides', value: activeRides, icon: <Car className="w-5 h-5" />, color: 'blue' as const, trend: { value: 5, label: 'this week' } },
    { title: 'Total Spent', value: `₹${totalSpent.toLocaleString()}`, icon: <TrendingUp className="w-5 h-5" />, color: 'emerald' as const, trend: { value: -5, label: 'vs last month' } },
    { title: 'My Rating', value: `${user?.rating}★`, icon: <Star className="w-5 h-5" />, color: 'amber' as const, trend: { value: 2, label: 'vs last month' } },
  ];

  const stats = isDriver ? driverStats : passengerStats;

  // Recent items
  const recentBookings = myBookings.slice(0, 4);


  const pieData = [
    { name: 'Completed', value: completedRides || 5 },
    { name: 'Active', value: activeRides || 3 },
    { name: 'Cancelled', value: 1 },
    { name: 'Pending', value: 2 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 p-6 text-white shadow-lg shadow-violet-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/4 -translate-y-1/2 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/4 translate-y-1/2 blur-2xl" />
        <div className="relative flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span className="text-white/70 text-sm">AI-Powered Dashboard</span>
            </div>
            <h2 className="text-2xl font-extrabold mb-1">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h2>
            <p className="text-white/70 text-sm">
              {isDriver
                ? `You have ${activeRides} active ride${activeRides !== 1 ? 's' : ''} and earned ₹${totalEarnings.toLocaleString()} total.`
                : `You have ${activeRides} upcoming ride${activeRides !== 1 ? 's' : ''} booked and spent ₹${totalSpent.toLocaleString()} total.`}
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            {isDriver ? (
              <button
                onClick={() => navigate('/post-ride')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-violet-700 font-bold text-sm hover:bg-violet-50 transition-colors shadow-md"
              >
                <Plus className="w-4 h-4" />
                Post New Ride
              </button>
            ) : (
              <button
                onClick={() => navigate('/search-rides')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-violet-700 font-bold text-sm hover:bg-violet-50 transition-colors shadow-md"
              >
                <Search className="w-4 h-4" />
                Find a Ride
              </button>
            )}
            <button
              onClick={() => navigate('/ai-recommendations')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/20 backdrop-blur-sm text-white font-bold text-sm hover:bg-white/30 transition-colors border border-white/30"
            >
              <Zap className="w-4 h-4 text-yellow-300" />
              AI Insights
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-slate-800">Weekly Activity</h3>
              <p className="text-xs text-slate-400">Rides & Bookings this week</p>
            </div>
            <div className="flex gap-3 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                <span className="text-slate-500">Rides</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                <span className="text-slate-500">Bookings</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weeklyChartData}>
              <defs>
                <linearGradient id="gradViolet" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontSize: '12px' }} />
              <Area type="monotone" dataKey="rides" stroke="#7c3aed" strokeWidth={2.5} fill="url(#gradViolet)" dot={{ r: 4, fill: '#7c3aed', strokeWidth: 0 }} />
              <Area type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={2.5} fill="url(#gradBlue)" dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-1">Ride Status</h3>
          <p className="text-xs text-slate-400 mb-4">Distribution overview</p>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {pieData.map((item, i) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
                <span className="text-xs text-slate-500">{item.name}</span>
                <span className="text-xs font-bold text-slate-700 ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-slate-800">Earnings Overview</h3>
            <p className="text-xs text-slate-400">Weekly earnings trend (₹)</p>
          </div>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">+18% this week</span>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={weeklyChartData} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontSize: '12px' }}
              formatter={(v) => [`₹${v}`, 'Earnings']}
            />
            <Bar dataKey="earnings" fill="#7c3aed" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800">Recent Bookings</h3>
            <button onClick={() => navigate('/my-bookings')} className="text-xs font-semibold text-violet-600 hover:text-violet-700 flex items-center gap-1">
              View all <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-3">
            {recentBookings.length === 0 && (
              <div className="text-center py-8 text-slate-400">
                <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No bookings yet</p>
                <button onClick={() => navigate('/search-rides')} className="text-violet-600 text-xs font-semibold mt-1">Search rides →</button>
              </div>
            )}
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate('/my-bookings')}>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-violet-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate">{booking.pickup} → {booking.destination}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <p className="text-xs text-slate-400">{booking.date} • {booking.time}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <StatusBadge status={booking.status} />
                  <p className="text-xs font-bold text-slate-700 mt-1">₹{booking.totalPrice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Search, label: 'Search Rides', color: 'from-violet-500 to-indigo-500', to: '/search-rides' },
              ...(isDriver ? [{ icon: Plus, label: 'Post Ride', color: 'from-emerald-500 to-teal-500', to: '/post-ride' }] : []),
              { icon: BookOpen, label: 'My Bookings', color: 'from-blue-500 to-cyan-500', to: '/my-bookings' },
              { icon: Zap, label: 'AI Insights', color: 'from-amber-500 to-orange-500', to: '/ai-recommendations' },
              { icon: Users, label: 'Ride History', color: 'from-rose-500 to-pink-500', to: '/ride-history' },
              { icon: Activity, label: 'Analytics', color: 'from-indigo-500 to-purple-500', to: '/analytics' },
            ].slice(0, 6).map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.to)}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 hover:border-violet-200 hover:bg-violet-50/50 transition-all group"
              >
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform flex-shrink-0`}>
                  <action.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-slate-700 text-left leading-tight">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
