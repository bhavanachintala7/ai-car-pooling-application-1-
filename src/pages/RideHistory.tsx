// ============================================================
// RIDE HISTORY PAGE
// ============================================================

import { useState } from 'react';
import { History, MapPin, Clock, Star, TrendingUp, Download, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/ui/StatCard';

export default function RideHistory() {
  const { user } = useAuth();
  const { rideHistory } = useApp();
  const [filterPeriod, setFilterPeriod] = useState<'all' | '7days' | '30days' | '90days'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'cancelled'>('all');

  const myHistory = rideHistory.filter((h) => h.userId === user?.id);

  const filtered = myHistory.filter((h) => {
    const matchesStatus = filterStatus === 'all' || h.status === filterStatus;
    if (!matchesStatus) return false;
    if (filterPeriod === 'all') return true;
    const days = { '7days': 7, '30days': 30, '90days': 90 }[filterPeriod];
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return new Date(h.date) >= cutoff;
  });

  const totalSpent = myHistory.filter((h) => h.status === 'completed').reduce((s, h) => s + h.price, 0);
  const avgRating = myHistory.filter((h) => h.rating).reduce((s, h, _, arr) => s + (h.rating || 0) / arr.length, 0);
  const completed = myHistory.filter((h) => h.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Trips', value: myHistory.length, color: 'text-violet-600', bg: 'bg-violet-50', icon: History },
          { label: 'Completed', value: completed, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: TrendingUp },
          { label: user?.role === 'driver' ? 'Total Earned' : 'Total Spent', value: `₹${totalSpent.toLocaleString()}`, color: 'text-blue-600', bg: 'bg-blue-50', icon: TrendingUp },
          { label: 'Avg Rating Given', value: avgRating ? `${avgRating.toFixed(1)}★` : 'N/A', color: 'text-amber-600', bg: 'bg-amber-50', icon: Star },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4 border border-slate-100`}>
            <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-semibold text-slate-600">Period:</span>
          <div className="flex gap-1.5">
            {[
              { key: 'all', label: 'All Time' },
              { key: '7days', label: '7 Days' },
              { key: '30days', label: '30 Days' },
              { key: '90days', label: '90 Days' },
            ].map((p) => (
              <button
                key={p.key}
                onClick={() => setFilterPeriod(p.key as typeof filterPeriod)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filterPeriod === p.key ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-600">Status:</span>
          <div className="flex gap-1.5">
            {['all', 'completed', 'cancelled'].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s as typeof filterStatus)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${filterStatus === s ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors ml-auto">
          <Download className="w-3.5 h-3.5" />
          Export
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Ride Records</h3>
          <span className="text-xs text-slate-400">{filtered.length} trips</span>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <History className="w-10 h-10 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No ride history found</p>
            <p className="text-slate-400 text-sm mt-1">Adjust your filters or complete some rides.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['Date', 'Route', 'Role', 'Distance', 'Amount', 'Status', 'Rating'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-300" />
                        {record.date}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2 min-w-[160px]">
                        <div className="flex flex-col items-center gap-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <div className="w-px h-3 bg-slate-200" />
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-700">{record.pickup}</p>
                          <p className="text-xs text-slate-400">{record.destination}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full capitalize ${record.role === 'driver' ? 'bg-violet-100 text-violet-700' : 'bg-blue-100 text-blue-700'}`}>
                        {record.role}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-300" />
                        {record.distance}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-sm font-bold text-slate-800">₹{record.price}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={record.status} />
                    </td>
                    <td className="px-4 py-3.5">
                      {record.rating ? (
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className={`text-xs ${star <= record.rating! ? 'text-amber-400' : 'text-slate-200'}`}>★</span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Insights */}
      {myHistory.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl p-4 border border-violet-100">
            <h4 className="font-bold text-violet-800 mb-1 text-sm">Most Used Route</h4>
            <div className="flex items-center gap-2 text-sm text-violet-700">
              <MapPin className="w-4 h-4" />
              <span>{myHistory[0]?.pickup} → {myHistory[0]?.destination}</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-100">
            <h4 className="font-bold text-emerald-800 mb-1 text-sm">Success Rate</h4>
            <p className="text-2xl font-extrabold text-emerald-700">
              {myHistory.length > 0 ? Math.round((completed / myHistory.length) * 100) : 0}%
            </p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100">
            <h4 className="font-bold text-amber-800 mb-1 text-sm">Total Distance</h4>
            <p className="text-2xl font-extrabold text-amber-700">
              {myHistory.reduce((sum, h) => sum + parseFloat(h.distance), 0).toFixed(1)} km
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
