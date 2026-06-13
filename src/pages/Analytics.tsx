// ============================================================
// ANALYTICS PAGE
// Features: Charts, Insights, Performance Metrics
// ============================================================

import { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { BarChart2, TrendingUp, Star, Users, Car, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { weeklyChartData, monthlyChartData } from '../data/mockData';

const radarData = [
  { metric: 'Punctuality', score: 90 },
  { metric: 'Safety', score: 95 },
  { metric: 'Comfort', score: 85 },
  { metric: 'Communication', score: 80 },
  { metric: 'Cleanliness', score: 88 },
  { metric: 'Value', score: 92 },
];

const satisfactionData = [
  { label: '5★', count: 120, color: '#10b981' },
  { label: '4★', count: 80, color: '#3b82f6' },
  { label: '3★', count: 30, color: '#f59e0b' },
  { label: '2★', count: 10, color: '#f97316' },
  { label: '1★', count: 5, color: '#ef4444' },
];

const routeData = [
  { route: 'Gachibowli→Hitech', trips: 45, revenue: 3600 },
  { route: 'Kondapur→HITEC', trips: 38, revenue: 2660 },
  { route: 'Madhapur→Sunder', trips: 29, revenue: 3480 },
  { route: 'Jubilee→Banjara', trips: 52, revenue: 3120 },
  { route: 'Kukatpally→Gach', trips: 31, revenue: 3100 },
];

type Period = 'weekly' | 'monthly';

export default function Analytics() {
  const { user } = useAuth();
  const [period, setPeriod] = useState<Period>('weekly');

  const chartData = period === 'weekly' ? weeklyChartData : monthlyChartData;

  const kpis = [
    { label: 'Total Revenue', value: '₹42,800', change: '+18%', positive: true, icon: TrendingUp, color: 'emerald' },
    { label: 'Ride Completion Rate', value: '94.2%', change: '+2.1%', positive: true, icon: Car, color: 'blue' },
    { label: 'Average Rating', value: '4.8★', change: '+0.2', positive: true, icon: Star, color: 'amber' },
    { label: 'Active Passengers', value: '1,247', change: '+12%', positive: true, icon: Users, color: 'violet' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BarChart2 className="w-5 h-5 text-indigo-200" />
              <span className="text-indigo-200 text-sm">Performance Dashboard</span>
            </div>
            <h2 className="text-2xl font-extrabold">Analytics Overview</h2>
            <p className="text-indigo-200 text-sm mt-1">Real-time insights for {user?.name}</p>
          </div>
          <div className="flex gap-2">
            {(['weekly', 'monthly'] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${period === p ? 'bg-white text-indigo-700' : 'bg-white/20 text-white hover:bg-white/30'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                ${kpi.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                  kpi.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  kpi.color === 'amber' ? 'bg-amber-100 text-amber-600' :
                  'bg-violet-100 text-violet-600'}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${kpi.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {kpi.change}
              </span>
            </div>
            <p className="text-xl font-extrabold text-slate-800">{kpi.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-1">Revenue Trend</h3>
          <p className="text-xs text-slate-400 mb-4">Earnings over {period === 'weekly' ? 'this week' : 'this year'}</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="gradEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontSize: '12px' }} />
              <Area type="monotone" dataKey="earnings" stroke="#4f46e5" strokeWidth={2.5} fill="url(#gradEarnings)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-1">Rides vs Bookings</h3>
          <p className="text-xs text-slate-400 mb-4">Comparison over {period === 'weekly' ? 'this week' : 'this year'}</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontSize: '12px' }} />
              <Bar dataKey="rides" name="Rides" fill="#7c3aed" radius={[4, 4, 0, 0]} barSize={18} />
              <Bar dataKey="bookings" name="Bookings" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-1">Performance Radar</h3>
          <p className="text-xs text-slate-400 mb-4">Multi-dimensional performance score</p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: '#64748b' }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9, fill: '#94a3b8' }} />
              <Radar name="Score" dataKey="score" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-1">Rating Distribution</h3>
          <p className="text-xs text-slate-400 mb-4">Passenger satisfaction breakdown</p>
          <div className="space-y-3">
            {satisfactionData.map((item) => {
              const total = satisfactionData.reduce((s, i) => s + i.count, 0);
              const pct = Math.round((item.count / total) * 100);
              return (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-600 w-6">{item.label}</span>
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: item.color }} />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 w-10 text-right">{item.count}</span>
                  <span className="text-xs text-slate-400 w-8 text-right">{pct}%</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-100 text-center">
            <p className="text-xs font-semibold text-amber-700">Overall Rating: <span className="text-lg font-extrabold">4.8★</span></p>
          </div>
        </div>
      </div>

      {/* Top Routes */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-1">Top Performing Routes</h3>
        <p className="text-xs text-slate-400 mb-4">Most popular routes by trip count</p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 rounded-xl">
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Route</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Trips</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Revenue</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {routeData.map((r, i) => {
                const maxTrips = Math.max(...routeData.map((x) => x.trips));
                const pct = Math.round((r.trips / maxTrips) * 100);
                return (
                  <tr key={r.route} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-violet-100 text-violet-700 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                        <span className="text-sm font-semibold text-slate-700">{r.route}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm font-bold text-slate-700">{r.trips}</td>
                    <td className="px-4 py-3.5 text-sm font-bold text-emerald-600">₹{r.revenue.toLocaleString()}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden max-w-[100px]">
                          <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-slate-500">{pct}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-4 h-4 text-violet-600" />
          <h3 className="font-bold text-slate-800">AI Recommendation Accuracy</h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">KNN model prediction accuracy over time (%)</p>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={[
            { name: 'Mon', accuracy: 87 }, { name: 'Tue', accuracy: 89 }, { name: 'Wed', accuracy: 86 },
            { name: 'Thu', accuracy: 91 }, { name: 'Fri', accuracy: 93 }, { name: 'Sat', accuracy: 90 }, { name: 'Sun', accuracy: 89 },
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis domain={[80, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontSize: '12px' }} />
            <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
