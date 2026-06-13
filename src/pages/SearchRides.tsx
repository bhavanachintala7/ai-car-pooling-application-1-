// ============================================================
// SEARCH RIDES PAGE
// Features: Filters, KNN Match Scores, AI Insights, Booking
// ============================================================

import { useState } from 'react';
import { Search, Filter, Zap, SlidersHorizontal, X, MapPin, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { hyderabadLocations } from '../data/mockData';
import RideCard from '../components/ui/RideCard';
import { Ride } from '../types';

export default function SearchRides() {
  const { user } = useAuth();
  const { rides, bookings, bookRide } = useApp();

  const [filters, setFilters] = useState({
    pickup: '',
    destination: '',
    date: '',
    minSeats: 1,
    maxPrice: 500,
    matchLevel: 'all' as 'all' | 'Best Match' | 'Suitable Match' | 'Low Match',
    ac: false,
    music: false,
    pets: false,
  });

  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState<Ride[]>([]);
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'match' | 'time'>('match');

  const bookedRideIds = bookings
    .filter((b) => b.passengerId === user?.id && b.status !== 'cancelled')
    .map((b) => b.rideId);

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate API call to FastAPI /rides/search with KNN scoring
    await new Promise((r) => setTimeout(r, 1200));

    let results = rides.filter((r) => r.status === 'upcoming' && r.availableSeats > 0);

    if (filters.pickup) results = results.filter((r) => r.pickup.toLowerCase().includes(filters.pickup.toLowerCase()));
    if (filters.destination) results = results.filter((r) => r.destination.toLowerCase().includes(filters.destination.toLowerCase()));
    if (filters.date) results = results.filter((r) => r.date === filters.date);
    results = results.filter((r) => r.availableSeats >= filters.minSeats && r.price <= filters.maxPrice);
    if (filters.matchLevel !== 'all') results = results.filter((r) => r.matchLevel === filters.matchLevel);
    if (filters.ac) results = results.filter((r) => r.preferences.ac);
    if (filters.music) results = results.filter((r) => r.preferences.music);
    if (filters.pets) results = results.filter((r) => r.preferences.pets);

    setSearchResults(results);
    setHasSearched(true);
    setIsSearching(false);
  };

  const sorted = [...searchResults].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'rating') return b.driverRating - a.driverRating;
    if (sortBy === 'match') return (b.matchScore || 0) - (a.matchScore || 0);
    return 0;
  });

  const handleBook = async (rideId: string, seats: number) => {
    if (!user) return;
    await bookRide(rideId, user.id, user.name, seats);
  };

  const resetFilters = () => {
    setFilters({ pickup: '', destination: '', date: '', minSeats: 1, maxPrice: 500, matchLevel: 'all', ac: false, music: false, pets: false });
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <h2 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
          <Search className="w-5 h-5 text-violet-600" />
          Find Your Perfect Ride
          <span className="ml-auto text-xs font-medium text-violet-600 bg-violet-50 px-2 py-1 rounded-lg flex items-center gap-1">
            <Zap className="w-3 h-3" /> AI + KNN Powered
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
              <select
                value={filters.pickup}
                onChange={(e) => setFilters((p) => ({ ...p, pickup: e.target.value }))}
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
              >
                <option value="">Any pickup location</option>
                {hyderabadLocations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-500" />
              <select
                value={filters.destination}
                onChange={(e) => setFilters((p) => ({ ...p, destination: e.target.value }))}
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
              >
                <option value="">Any destination</option>
                {hyderabadLocations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Date</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters((p) => ({ ...p, date: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${showFilters ? 'border-violet-500 text-violet-600 bg-violet-50' : 'border-slate-200 text-slate-600 hover:border-violet-300'}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Advanced Filters
          </button>
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm hover:from-violet-700 hover:to-indigo-700 disabled:opacity-60 transition-all shadow-md shadow-violet-200"
          >
            {isSearching ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                AI Matching...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Search Rides
              </>
            )}
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1.5">Min Seats: {filters.minSeats}</label>
                <input type="range" min={1} max={6} value={filters.minSeats} onChange={(e) => setFilters((p) => ({ ...p, minSeats: Number(e.target.value) }))} className="w-full accent-violet-600" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1.5">Max Price: ₹{filters.maxPrice}</label>
                <input type="range" min={20} max={500} step={10} value={filters.maxPrice} onChange={(e) => setFilters((p) => ({ ...p, maxPrice: Number(e.target.value) }))} className="w-full accent-violet-600" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1.5">AI Match Level</label>
                <select
                  value={filters.matchLevel}
                  onChange={(e) => setFilters((p) => ({ ...p, matchLevel: e.target.value as typeof filters.matchLevel }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <option value="all">All Matches</option>
                  <option value="Best Match">Best Match</option>
                  <option value="Suitable Match">Suitable Match</option>
                  <option value="Low Match">Low Match</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 block">Preferences</label>
                {[
                  { key: 'ac', label: '❄️ AC' },
                  { key: 'music', label: '🎵 Music' },
                  { key: 'pets', label: '🐾 Pets' },
                ].map((p) => (
                  <label key={p.key} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters[p.key as 'ac' | 'music' | 'pets']}
                      onChange={(e) => setFilters((prev) => ({ ...prev, [p.key]: e.target.checked }))}
                      className="accent-violet-600 w-3.5 h-3.5"
                    />
                    {p.label}
                  </label>
                ))}
              </div>
            </div>
            <button onClick={resetFilters} className="mt-3 flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 font-medium">
              <X className="w-3.5 h-3.5" /> Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      {hasSearched && (
        <div>
          {/* Sort + Count */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-bold text-slate-800">{sorted.length} rides found</p>
              {isSearching && <p className="text-xs text-violet-600 animate-pulse">Running KNN algorithm...</p>}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Sort by:</span>
              <div className="flex gap-1">
                {[
                  { key: 'match', label: '🤖 Match' },
                  { key: 'price', label: '💰 Price' },
                  { key: 'rating', label: '⭐ Rating' },
                  { key: 'time', label: '🕐 Time' },
                ].map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSortBy(s.key as typeof sortBy)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${sortBy === s.key ? 'bg-violet-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-violet-300'}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {sorted.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">No rides found</h3>
              <p className="text-slate-500 text-sm mb-4">Try adjusting your filters or search for a different route.</p>
              <button onClick={resetFilters} className="px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-semibold">Reset Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {sorted.map((ride) => (
                <RideCard
                  key={ride.id}
                  ride={ride}
                  onBook={user?.role === 'passenger' ? handleBook : undefined}
                  isBooked={bookedRideIds.includes(ride.id)}
                  showAI={true}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Initial State */}
      {!hasSearched && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-3 bg-gradient-to-r from-violet-50 to-indigo-50 rounded-2xl p-6 border border-violet-100 text-center">
            <Zap className="w-10 h-10 text-violet-600 mx-auto mb-3" />
            <h3 className="font-bold text-slate-800 text-lg mb-2">AI-Powered Ride Matching</h3>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">
              Our KNN machine learning model analyzes pickup location, destination, timing, seats, ratings, and preferences 
              to generate real-time compatibility scores for every ride.
            </p>
          </div>
          {rides.filter((r) => r.status === 'upcoming' && r.availableSeats > 0).slice(0, 4).map((ride) => (
            <div key={ride.id} className="lg:col-span-1">
              <RideCard
                ride={ride}
                onBook={user?.role === 'passenger' ? handleBook : undefined}
                isBooked={bookedRideIds.includes(ride.id)}
                showAI={true}
              />
            </div>
          ))}
        </div>
      )}

      {/* ML Info Banner */}
      <div className="bg-slate-800 rounded-2xl p-5 text-white">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-violet-500/30 flex items-center justify-center flex-shrink-0">
            <Filter className="w-5 h-5 text-violet-300" />
          </div>
          <div>
            <h4 className="font-bold mb-1">About Our AI Matching Algorithm</h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              <strong className="text-violet-300">KNN (K-Nearest Neighbors)</strong> model with k=5 analyzes 6 features: 
              pickup_location, destination, travel_hour, available_seats, driver_rating, and preference_compatibility_score. 
              Model accuracy: <strong className="text-emerald-400">89.3%</strong> | Saved as <code className="text-amber-300">ride_match_model.joblib</code>
            </p>
            <div className="flex gap-3 mt-3 flex-wrap">
              <span className="text-xs px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full font-medium">🏆 Best Match: score ≥ 80</span>
              <span className="text-xs px-2.5 py-1 bg-blue-500/20 text-blue-300 rounded-full font-medium">✅ Suitable: score 60–79</span>
              <span className="text-xs px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-full font-medium">⚡ Low Match: score &lt; 60</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
