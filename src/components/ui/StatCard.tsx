// ============================================================
// STAT CARD COMPONENT
// ============================================================

import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  color: 'violet' | 'blue' | 'emerald' | 'amber' | 'rose' | 'indigo' | 'cyan';
  trend?: { value: number; label: string };
  onClick?: () => void;
}

const colorMap = {
  violet: 'from-violet-500 to-purple-600 shadow-violet-200',
  blue: 'from-blue-500 to-cyan-600 shadow-blue-200',
  emerald: 'from-emerald-500 to-teal-600 shadow-emerald-200',
  amber: 'from-amber-500 to-orange-600 shadow-amber-200',
  rose: 'from-rose-500 to-pink-600 shadow-rose-200',
  indigo: 'from-indigo-500 to-violet-600 shadow-indigo-200',
  cyan: 'from-cyan-500 to-blue-600 shadow-cyan-200',
};



export default function StatCard({ title, value, subtitle, icon, color, trend, onClick }: StatCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 ${onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center text-white shadow-lg`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${trend.value >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {trend.value >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-800 leading-tight">{value}</p>
        <p className="text-sm font-medium text-slate-500 mt-0.5">{title}</p>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        {trend && <p className="text-xs text-slate-400 mt-1">{trend.label}</p>}
      </div>
    </div>
  );
}

// Badge component for match levels
export function MatchBadge({ level }: { level: string }) {
  const styles = {
    'Best Match': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Suitable Match': 'bg-blue-100 text-blue-700 border-blue-200',
    'Low Match': 'bg-amber-100 text-amber-700 border-amber-200',
  };
  const style = styles[level as keyof typeof styles] || 'bg-slate-100 text-slate-600 border-slate-200';
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${style}`}>
      {level === 'Best Match' && '🏆'}
      {level === 'Suitable Match' && '✅'}
      {level === 'Low Match' && '⚡'}
      {level}
    </span>
  );
}

// Status badge
export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    confirmed: 'bg-emerald-100 text-emerald-700',
    pending: 'bg-amber-100 text-amber-700',
    cancelled: 'bg-rose-100 text-rose-700',
    completed: 'bg-blue-100 text-blue-700',
    upcoming: 'bg-violet-100 text-violet-700',
    active: 'bg-emerald-100 text-emerald-700',
  };
  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  );
}

// Rating Stars
export function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= Math.round(rating) ? 'text-amber-400' : 'text-slate-200'}>★</span>
      ))}
      <span className="text-sm font-semibold text-slate-600 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}
