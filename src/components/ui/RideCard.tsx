// ============================================================
// RIDE CARD COMPONENT
// ============================================================

import { useState } from 'react';
import { MapPin, Clock, Users, Zap, ChevronDown, ChevronUp, Star, Car, Music, Wind } from 'lucide-react';
import { Ride } from '../../types';
import { MatchBadge } from './StatCard';

interface RideCardProps {
  ride: Ride;
  onBook?: (rideId: string, seats: number) => void;
  onCancel?: (rideId: string) => void;
  showAI?: boolean;
  isBooked?: boolean;
  compact?: boolean;
}

export default function RideCard({ ride, onBook, onCancel, showAI = true, isBooked = false, compact = false }: RideCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [seatsToBook, setSeatsToBook] = useState(1);
  const [isBooking, setIsBooking] = useState(false);

  const handleBook = async () => {
    if (!onBook) return;
    setIsBooking(true);
    await new Promise((r) => setTimeout(r, 600));
    onBook(ride.id, seatsToBook);
    setIsBooking(false);
  };

  const matchColors = {
    'Best Match': 'border-emerald-200 bg-gradient-to-br from-white to-emerald-50/30',
    'Suitable Match': 'border-blue-200 bg-gradient-to-br from-white to-blue-50/30',
    'Low Match': 'border-amber-200 bg-gradient-to-br from-white to-amber-50/30',
  };

  const cardBorder = ride.matchLevel ? matchColors[ride.matchLevel] : 'border-slate-200 bg-white';

  return (
    <div className={`rounded-2xl border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${cardBorder}`}>
      {/* Match Score Banner */}
      {ride.matchScore !== undefined && ride.matchLevel && (
        <div className={`px-4 py-1.5 flex items-center justify-between text-xs font-medium
          ${ride.matchLevel === 'Best Match' ? 'bg-emerald-500' : ride.matchLevel === 'Suitable Match' ? 'bg-blue-500' : 'bg-amber-500'} text-white`}>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>KNN Match Score</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-24 h-1.5 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: `${ride.matchScore}%` }} />
            </div>
            <span className="font-bold">{ride.matchScore}%</span>
          </div>
        </div>
      )}

      <div className={`p-4 ${compact ? '' : 'md:p-5'}`}>
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            {/* Driver Avatar */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md">
              {ride.driverName.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">{ride.driverName}</h3>
              <div className="flex items-center gap-1 mt-0.5">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="text-xs font-semibold text-slate-600">{ride.driverRating}</span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-400">{ride.vehicle.make} {ride.vehicle.model}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-slate-800">₹{ride.price}</p>
            <p className="text-xs text-slate-400">per seat</p>
          </div>
        </div>

        {/* Route */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <div className="w-px h-8 bg-slate-200" />
            <div className="w-2 h-2 rounded-full bg-rose-500" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              <span className="text-sm font-semibold text-slate-700">{ride.pickup}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
              <span className="text-sm font-semibold text-slate-700">{ride.destination}</span>
            </div>
          </div>
        </div>

        {/* Details Row */}
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5 text-violet-400" />
            <span>{ride.date} • {ride.time}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>{ride.availableSeats} seat{ride.availableSeats !== 1 ? 's' : ''} left</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Car className="w-3.5 h-3.5 text-emerald-400" />
            <span>{ride.distance} • {ride.duration}</span>
          </div>
        </div>

        {/* Preferences */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {ride.preferences.ac && (
            <span className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
              <Wind className="w-2.5 h-2.5" /> AC
            </span>
          )}
          {ride.preferences.music && (
            <span className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 bg-violet-50 text-violet-600 rounded-full">
              <Music className="w-2.5 h-2.5" /> Music
            </span>
          )}
          {ride.preferences.pets && (
            <span className="text-[10px] font-medium px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full">🐾 Pets OK</span>
          )}
          {!ride.preferences.smoking && (
            <span className="text-[10px] font-medium px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full">🚭 No Smoking</span>
          )}
          <span className="text-[10px] font-medium px-2 py-0.5 bg-slate-50 text-slate-600 rounded-full capitalize">🧳 {ride.preferences.luggage} luggage</span>
        </div>

        {/* Match Badge */}
        {ride.matchLevel && (
          <div className="mt-3">
            <MatchBadge level={ride.matchLevel} />
          </div>
        )}

        {/* AI Insight Expandable */}
        {showAI && ride.aiInsight && (
          <div className="mt-3">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 text-xs font-semibold text-violet-600 hover:text-violet-700"
            >
              <Zap className="w-3.5 h-3.5" />
              AI Insight
              {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {expanded && (
              <div className="mt-2 p-3 rounded-xl bg-violet-50 border border-violet-100 text-xs text-violet-700 leading-relaxed">
                <p className="font-semibold mb-1 text-violet-800">🤖 Gemini AI Analysis:</p>
                {ride.aiInsight}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {(onBook || onCancel) && (
          <div className="mt-4 flex gap-2">
            {onBook && !isBooked && ride.availableSeats > 0 && ride.status !== 'cancelled' && (
              <div className="flex-1 flex gap-2">
                <select
                  value={seatsToBook}
                  onChange={(e) => setSeatsToBook(Number(e.target.value))}
                  className="w-20 text-xs border border-slate-200 rounded-lg px-2 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  {Array.from({ length: Math.min(ride.availableSeats, 4) }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n} seat{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
                <button
                  onClick={handleBook}
                  disabled={isBooking}
                  className="flex-1 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 disabled:opacity-60 transition-all shadow-md shadow-violet-200 flex items-center justify-center gap-2"
                >
                  {isBooking ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Booking...
                    </>
                  ) : (
                    <>Book • ₹{ride.price * seatsToBook}</>
                  )}
                </button>
              </div>
            )}
            {isBooked && (
              <span className="flex-1 py-2 text-center text-sm font-semibold text-emerald-600 bg-emerald-50 rounded-xl border border-emerald-200">
                ✅ Already Booked
              </span>
            )}
            {onCancel && (
              <button
                onClick={() => onCancel(ride.id)}
                className="px-3 py-2 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-50 border border-rose-200 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
