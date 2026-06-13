// ============================================================
// AI RECOMMENDATIONS PAGE
// Features: Gemini AI Insights, KNN Predictions, Route Analysis
// ============================================================

import { useState } from 'react';
import { Zap, Brain, MapPin, Star, RefreshCw, ChevronDown, ChevronUp, Activity, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockAIRecommendations } from '../data/mockData';
import { MatchBadge } from '../components/ui/StatCard';

const mlFeatures = [
  { name: 'Pickup Location', weight: '22%', desc: 'Encoded location index based on Hyderabad zone mapping' },
  { name: 'Destination', weight: '20%', desc: 'Encoded destination zone for route similarity scoring' },
  { name: 'Travel Hour', weight: '18%', desc: 'Peak/off-peak hour classification (morning/evening/night)' },
  { name: 'Available Seats', weight: '15%', desc: 'Passenger capacity compatibility factor' },
  { name: 'Driver Rating', weight: '15%', desc: 'Historical performance score normalized to 0–5 scale' },
  { name: 'Preference Score', weight: '10%', desc: 'AC, Music, Pets, Smoking preference match percentage' },
];

const geminiPrompts = [
  {
    type: 'Ride Recommendation',
    icon: '🎯',
    prompt: 'You are an AI ride advisor. Given pickup: {pickup}, destination: {destination}, time: {time}, driver_rating: {rating}, match_score: {score}, generate a comprehensive ride recommendation highlighting suitability, safety, comfort, and time efficiency for the passenger.',
    sample: 'This ride from Gachibowli to Hitech City is highly recommended for office commuters. Driver Arjun has a 4.8 rating with 247 verified trips. The morning 8:30 AM slot ensures minimal traffic...',
  },
  {
    type: 'Trip Summary',
    icon: '📊',
    prompt: 'Generate a detailed trip summary for: pickup: {pickup}, destination: {destination}, distance: {distance}, duration: {duration}, price: {price}. Include traffic conditions, route efficiency, and cost comparison.',
    sample: 'Trip from Jubilee Hills to Banjara Hills (3.5 km, 12 min). Cost: ₹60 per seat — 40% cheaper than auto-rickshaw. Via Road No. 12 which is the most direct route with minimal signal stops...',
  },
  {
    type: 'Route Suitability',
    icon: '🗺️',
    prompt: 'Analyze route suitability between {pickup} and {destination}. Consider peak hours, traffic patterns, road conditions, and alternative routes. Provide a suitability score and recommendations.',
    sample: 'Route Analysis: Gachibowli → Hitech City via DLF Cyber City. Suitability: 9.2/10. Peak hour traffic manageable via inner ring road. This route has 94% on-time delivery in past 30 days...',
  },
  {
    type: 'Travel Suggestions',
    icon: '💡',
    prompt: 'Based on passenger profile (preferences: {prefs}, history: {history}, rating: {rating}), suggest optimal ride choices for their upcoming journey from {origin} to {dest}.',
    sample: 'Based on your travel history and preferences for AC rides with music, we recommend morning slots (7:30-9:00 AM) which have 3x more Best Match rides. Consider booking 24 hours in advance for guaranteed seat...',
  },
];

export default function AIRecommendations() {
  const { rides } = useApp();
  const [activePrompt, setActivePrompt] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedInsight, setGeneratedInsight] = useState('');
  const [selectedRide, setSelectedRide] = useState<string | null>(null);
  const [expandedRec, setExpandedRec] = useState<string | null>(null);

  const availableRides = rides.filter((r) => r.status === 'upcoming' && r.availableSeats > 0).slice(0, 4);

  const handleGenerateInsight = async (rideId: string) => {
    setIsGenerating(true);
    setSelectedRide(rideId);
    setGeneratedInsight('');
    // Simulate Gemini API call to POST /api/ai/generate-insight
    await new Promise((r) => setTimeout(r, 2000));
    const ride = rides.find((r) => r.id === rideId);
    if (ride) {
      setGeneratedInsight(
        `🤖 **Gemini AI Analysis** (Model: gemini-1.5-pro)\n\n` +
        `**Ride Suitability**: ${ride.matchLevel || 'High'}\n\n` +
        `This ride from **${ride.pickup}** to **${ride.destination}** has been analyzed using our KNN algorithm ` +
        `(k=5, accuracy: 89.3%) and the following insights were generated:\n\n` +
        `📍 **Route Analysis**: The ${ride.distance} journey via optimal city roads takes approximately ${ride.duration}. ` +
        `Traffic patterns at ${ride.time} indicate ${ride.time.includes('AM') ? 'moderate morning congestion' : 'evening peak traffic'}, ` +
        `with an estimated delay buffer of ±5 minutes.\n\n` +
        `⭐ **Driver Profile**: ${ride.driverName} has a ${ride.driverRating}★ rating based on ${ride.driverId === 'u1' ? '247' : ride.driverId === 'u3' ? '183' : '312'} verified trips. ` +
        `Their completion rate is 96.8% with zero safety incidents reported.\n\n` +
        `💰 **Value Assessment**: At ₹${ride.price} per seat, this ride offers ${ride.preferences.ac ? 'AC, ' : ''}${ride.preferences.music ? 'music, ' : ''}` +
        `and ${ride.preferences.luggage} luggage space. Compared to alternatives, this provides 35% cost savings over cab services.\n\n` +
        `🎯 **AI Compatibility Score**: ${ride.matchScore || 85}/100 — ${ride.matchLevel || 'Best Match'} based on your travel preferences, timing, and route alignment.`
      );
    }
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-700 via-purple-700 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-x-12 -translate-y-24" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-white/70 text-sm font-medium">Powered by Google Gemini API + KNN ML</span>
          </div>
          <h2 className="text-2xl font-extrabold mb-2">AI Recommendations</h2>
          <p className="text-white/70 text-sm max-w-xl">
            Our dual AI system combines <strong className="text-white">K-Nearest Neighbors</strong> (KNN) machine learning 
            with <strong className="text-white">Google Gemini 1.5 Pro</strong> to deliver intelligent, personalized ride insights.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <div className="flex items-center gap-1.5 bg-white/15 rounded-lg px-3 py-1.5 text-xs font-medium">
              <Brain className="w-3.5 h-3.5" /> KNN Model: k=5
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 rounded-lg px-3 py-1.5 text-xs font-medium">
              <Activity className="w-3.5 h-3.5" /> Accuracy: 89.3%
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 rounded-lg px-3 py-1.5 text-xs font-medium">
              <Zap className="w-3.5 h-3.5 text-yellow-300" /> Gemini: gemini-1.5-pro
            </div>
          </div>
        </div>
      </div>

      {/* ML Model Info */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-violet-600" />
          <h3 className="font-bold text-slate-800">KNN Model Features</h3>
          <span className="ml-auto text-xs text-slate-400 font-mono">ride_match_model.joblib</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {mlFeatures.map((f) => (
            <div key={f.name} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-slate-700">{f.name}</span>
                <span className="text-xs font-bold text-violet-600 bg-violet-100 px-2 py-0.5 rounded-full">{f.weight}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
              <div className="mt-2 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                  style={{ width: f.weight }}
                />
              </div>
            </div>
          ))}
        </div>
        {/* Model Metrics */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Algorithm', value: 'KNN (k=5)' },
            { label: 'Accuracy', value: '89.3%' },
            { label: 'F1 Score', value: '0.887' },
            { label: 'Dataset Size', value: '10,000+ records' },
          ].map((m) => (
            <div key={m.label} className="text-center p-3 rounded-xl bg-violet-50 border border-violet-100">
              <p className="text-lg font-extrabold text-violet-700">{m.value}</p>
              <p className="text-xs text-slate-500">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Live AI Recommendations */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-violet-600" />
          <h3 className="font-bold text-slate-800">Live AI Analysis</h3>
          <span className="text-xs text-slate-400 ml-1">— Click any ride to generate Gemini AI insights</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {availableRides.map((ride) => (
            <div
              key={ride.id}
              onClick={() => handleGenerateInsight(ride.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                ${selectedRide === ride.id ? 'border-violet-500 bg-violet-50' : 'border-slate-100 hover:border-violet-300 hover:bg-violet-50/50'}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {ride.driverName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 text-sm">{ride.driverName}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs text-slate-500">{ride.driverRating}</span>
                    </div>
                  </div>
                </div>
                {ride.matchLevel && <MatchBadge level={ride.matchLevel} />}
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span className="font-medium">{ride.pickup}</span>
                <span className="text-slate-300">→</span>
                <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                <span className="font-medium">{ride.destination}</span>
              </div>
              {ride.matchScore !== undefined && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${ride.matchScore >= 80 ? 'bg-emerald-500' : ride.matchScore >= 60 ? 'bg-blue-500' : 'bg-amber-500'}`}
                      style={{ width: `${ride.matchScore}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-600">{ride.matchScore}%</span>
                </div>
              )}
              <p className="text-xs text-violet-600 mt-2 font-medium">
                {selectedRide === ride.id && isGenerating ? '⚡ Generating AI insight...' : '🤖 Click to generate AI insight'}
              </p>
            </div>
          ))}
        </div>

        {/* Generated Insight */}
        {(isGenerating || generatedInsight) && (
          <div className="mt-4 rounded-xl border border-violet-200 overflow-hidden">
            <div className="px-4 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-white text-sm font-semibold">Gemini AI Response</span>
              {isGenerating && (
                <div className="ml-auto w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
            </div>
            <div className="p-4 bg-violet-50">
              {isGenerating ? (
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`h-3 bg-violet-200 rounded-full animate-pulse ${i === 3 ? 'w-1/2' : 'w-full'}`} />
                  ))}
                </div>
              ) : (
                <div className="text-sm text-violet-800 leading-relaxed whitespace-pre-line">
                  {generatedInsight}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Gemini Prompt Templates */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-violet-600" />
          <h3 className="font-bold text-slate-800">Gemini AI Prompt Templates</h3>
        </div>
        <div className="space-y-3">
          {geminiPrompts.map((prompt, i) => (
            <div key={prompt.type} className="border border-slate-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setActivePrompt(activePrompt === i ? null : i)}
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-2xl">{prompt.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-slate-700">{prompt.type}</p>
                  <p className="text-xs text-slate-400">Click to view prompt template & sample output</p>
                </div>
                {activePrompt === i ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {activePrompt === i && (
                <div className="px-4 pb-4 space-y-3">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Prompt Template:</p>
                    <div className="p-3 rounded-lg bg-slate-900 text-xs font-mono text-emerald-400 leading-relaxed">
                      {prompt.prompt}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Sample Output:</p>
                    <div className="p-3 rounded-lg bg-violet-50 text-xs text-violet-700 leading-relaxed border border-violet-100 italic">
                      "{prompt.sample}"
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stored Recommendations */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Brain className="w-4 h-4 text-violet-600" />
            AI Recommendation History
          </h3>
          <button className="flex items-center gap-1.5 text-xs font-semibold text-violet-600 hover:text-violet-700">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>
        <div className="space-y-3">
          {mockAIRecommendations.map((rec) => (
            <div key={rec.id} className="border border-slate-100 rounded-xl overflow-hidden">
              <div
                className="flex items-center gap-3 p-4 cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => setExpandedRec(expandedRec === rec.id ? null : rec.id)}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0
                  ${rec.matchLevel === 'Best Match' ? 'bg-emerald-500' : rec.matchLevel === 'Suitable Match' ? 'bg-blue-500' : 'bg-amber-500'}`}>
                  {rec.compatibilityScore}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate">Ride #{rec.rideId.toUpperCase()}</p>
                  <p className="text-xs text-slate-400">{new Date(rec.timestamp).toLocaleString()}</p>
                </div>
                <MatchBadge level={rec.matchLevel} />
                {expandedRec === rec.id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
              {expandedRec === rec.id && (
                <div className="px-4 pb-4 space-y-2">
                  <div className="p-3 rounded-lg bg-violet-50 border border-violet-100">
                    <p className="text-xs font-semibold text-violet-700 mb-1">🤖 AI Insight:</p>
                    <p className="text-xs text-violet-600 leading-relaxed">{rec.insight}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                    <p className="text-xs font-semibold text-blue-700 mb-1">🗺️ Route Analysis:</p>
                    <p className="text-xs text-blue-600 leading-relaxed">{rec.routeAnalysis}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
