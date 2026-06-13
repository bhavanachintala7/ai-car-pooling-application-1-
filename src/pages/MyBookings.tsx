// ============================================================
// MY BOOKINGS PAGE
// ============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, MapPin, Clock, Users, Star, X, ChevronRight, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { StatusBadge, MatchBadge } from '../components/ui/StatCard';

type FilterStatus = 'all' | 'confirmed' | 'completed' | 'cancelled' | 'pending';

export default function MyBookings() {
  const { user } = useAuth();
  const { bookings, cancelBooking } = useApp();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const myBookings = bookings.filter((b) => b.passengerId === user?.id);

  const filtered = myBookings.filter((b) => {
    const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
    const matchesSearch =
      !searchQuery ||
      b.pickup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.driverName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: myBookings.length,
    confirmed: myBookings.filter((b) => b.status === 'confirmed').length,
    completed: myBookings.filter((b) => b.status === 'completed').length,
    cancelled: myBookings.filter((b) => b.status === 'cancelled').length,
  };

  const handleCancel = (id: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking(id);
    }
  };

  const filterBtns: { key: FilterStatus; label: string; color: string }[] = [
    { key: 'all', label: 'All', color: 'violet' },
    { key: 'confirmed', label: 'Confirmed', color: 'emerald' },
    { key: 'completed', label: 'Completed', color: 'blue' },
    { key: 'cancelled', label: 'Cancelled', color: 'rose' },
    { key: 'pending', label: 'Pending', color: 'amber' },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Bookings', value: stats.total, color: 'text-violet-600', bg: 'bg-violet-50' },
          { label: 'Confirmed', value: stats.confirmed, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Completed', value: stats.completed, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Cancelled', value: stats.cancelled, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4 border border-slate-100`}>
            <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by location or driver..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 flex-wrap">
            {filterBtns.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilterStatus(f.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  filterStatus === f.key
                    ? 'bg-violet-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label} {f.key !== 'all' && `(${myBookings.filter((b) => b.status === f.key).length})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bookings List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm">
          <BookOpen className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <h3 className="font-bold text-slate-600 mb-1">No bookings found</h3>
          <p className="text-slate-400 text-sm mb-4">
            {myBookings.length === 0 ? "You haven't booked any rides yet." : "No bookings match your filters."}
          </p>
          <button onClick={() => navigate('/search-rides')} className="px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-semibold">
            Find a Ride
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((booking) => (
            <div
              key={booking.id}
              className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden
                ${booking.status === 'confirmed' ? 'border-emerald-200' : booking.status === 'cancelled' ? 'border-rose-100' : 'border-slate-100'}`}
            >
              {/* Status Bar */}
              <div className={`px-5 py-2 flex items-center justify-between
                ${booking.status === 'confirmed' ? 'bg-emerald-500' : booking.status === 'completed' ? 'bg-blue-500' : booking.status === 'cancelled' ? 'bg-rose-500' : 'bg-amber-500'}`}>
                <span className="text-white text-xs font-bold uppercase tracking-wide">
                  {booking.status === 'confirmed' ? '✅ Booking Confirmed' : booking.status === 'completed' ? '🏁 Trip Completed' : booking.status === 'cancelled' ? '❌ Cancelled' : '⏳ Pending'}
                </span>
                <span className="text-white/80 text-xs">#{booking.id.slice(0, 6).toUpperCase()}</span>
              </div>

              <div className="p-5">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* Route */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {/* Driver */}
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {booking.driverName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-700 text-sm">{booking.driverName}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-xs text-slate-500">{booking.driverRating}</span>
                          <span className="text-slate-300 mx-1">•</span>
                          <span className="text-xs text-slate-400">{booking.vehicle.make} {booking.vehicle.model}</span>
                        </div>
                      </div>
                    </div>

                    {/* Route visual */}
                    <div className="flex items-center gap-3 my-3 pl-1">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <div className="w-px h-6 bg-slate-200" />
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      </div>
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-sm font-semibold text-slate-700">{booking.pickup}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-rose-500" />
                          <span className="text-sm font-semibold text-slate-700">{booking.destination}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 text-xs text-slate-500 mt-2">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-violet-400" />
                        {booking.date} • {booking.time}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-blue-400" />
                        {booking.seats} seat{booking.seats > 1 ? 's' : ''} booked
                      </div>
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="flex flex-row md:flex-col items-center md:items-end gap-3 md:gap-2">
                    <div className="text-right">
                      <p className="text-2xl font-extrabold text-slate-800">₹{booking.totalPrice}</p>
                      <p className="text-xs text-slate-400">Total fare</p>
                    </div>
                    {booking.matchLevel && <MatchBadge level={booking.matchLevel} />}
                    <StatusBadge status={booking.status} />
                  </div>
                </div>

                {/* AI Insight */}
                {booking.aiInsight && (
                  <div className="mt-4 p-3 rounded-xl bg-violet-50 border border-violet-100">
                    <p className="text-xs font-semibold text-violet-700 mb-1">🤖 AI Insight:</p>
                    <p className="text-xs text-violet-600 leading-relaxed">{booking.aiInsight}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-4 flex gap-2 flex-wrap">
                  {booking.status === 'confirmed' && (
                    <button
                      onClick={() => handleCancel(booking.id)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-rose-600 border border-rose-200 hover:bg-rose-50 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel Booking
                    </button>
                  )}
                  {booking.status === 'completed' && (
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-amber-600 border border-amber-200 hover:bg-amber-50 transition-colors">
                      <Star className="w-4 h-4" />
                      Rate Driver
                    </button>
                  )}
                  <button
                    onClick={() => navigate('/search-rides')}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-violet-600 border border-violet-200 hover:bg-violet-50 transition-colors"
                  >
                    Book Similar
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Find More Rides CTA */}
      {filtered.length > 0 && (
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-5 text-white flex items-center justify-between">
          <div>
            <h3 className="font-bold mb-1">Looking for more rides?</h3>
            <p className="text-white/70 text-sm">Our AI will find the best match for you</p>
          </div>
          <button
            onClick={() => navigate('/search-rides')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-violet-700 font-bold text-sm hover:bg-violet-50 transition-colors flex-shrink-0"
          >
            <Search className="w-4 h-4" />
            Search Rides
          </button>
        </div>
      )}
    </div>
  );
}
