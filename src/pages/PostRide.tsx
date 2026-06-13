// ============================================================
// POST RIDE PAGE (Driver Only)
// ============================================================

import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Users, DollarSign, Car, Music, Wind, Package, CheckCircle, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { hyderabadLocations, aiInsightTemplates } from '../data/mockData';
import { Ride } from '../types';

export default function PostRide() {
  const { user } = useAuth();
  const { addRide } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pickup: '',
    destination: '',
    date: '',
    time: '',
    seats: 2,
    price: 80,
    music: false,
    ac: true,
    smoking: false,
    pets: false,
    luggage: 'small' as 'none' | 'small' | 'large',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiPreview, setAiPreview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const generateAIPreview = () => {
    if (formData.pickup && formData.destination) {
      const insight = aiInsightTemplates.bestMatch(
        formData.pickup, formData.destination, user?.name || 'You', user?.rating || 5
      );
      setAiPreview(insight);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);

    await new Promise((r) => setTimeout(r, 1000));

    const score = Math.floor(Math.random() * 20) + 80;
    const newRide: Omit<Ride, 'id'> = {
      driverId: user.id,
      driverName: user.name,
      driverRating: user.rating,
      pickup: formData.pickup,
      destination: formData.destination,
      date: formData.date,
      time: formData.time,
      availableSeats: formData.seats,
      totalSeats: formData.seats,
      price: formData.price,
      status: 'upcoming',
      distance: `${(Math.random() * 15 + 3).toFixed(1)} km`,
      duration: `${Math.floor(Math.random() * 30 + 10)} min`,
      vehicle: user.vehicle || {
        make: 'Maruti',
        model: 'Swift',
        year: 2021,
        color: 'White',
        licensePlate: 'TS XX XX 0000',
        seats: formData.seats + 1,
      },
      preferences: {
        music: formData.music,
        smoking: formData.smoking,
        pets: formData.pets,
        ac: formData.ac,
        luggage: formData.luggage,
      },
      matchScore: score,
      matchLevel: score >= 85 ? 'Best Match' : score >= 70 ? 'Suitable Match' : 'Low Match',
      aiInsight: aiInsightTemplates.bestMatch(formData.pickup, formData.destination, user.name, user.rating),
      route: [formData.pickup, formData.destination],
      bookedPassengers: [],
    };

    addRide(newRide);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-200">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Ride Posted! 🎉</h2>
          <p className="text-slate-500 mb-6">Your ride from <strong>{formData.pickup}</strong> to <strong>{formData.destination}</strong> is now live and passengers can book it.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => navigate('/dashboard')} className="px-6 py-2.5 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-colors">
              Go to Dashboard
            </button>
            <button onClick={() => { setSubmitted(false); setFormData({ pickup: '', destination: '', date: '', time: '', seats: 2, price: 80, music: false, ac: true, smoking: false, pets: false, luggage: 'small', notes: '' }); setAiPreview(''); }} className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors">
              Post Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-violet-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold">Post a New Ride</h2>
            <p className="text-white/70 text-sm">Share your journey and earn rewards</p>
          </div>
        </div>
        <div className="flex gap-4 mt-3 text-sm text-white/70">
          <span>🤖 AI auto-generates match score</span>
          <span>⚡ Instant notifications to passengers</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Route */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-violet-600" />
            Route Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-600 block mb-1.5">Pickup Location *</label>
              <select
                value={formData.pickup}
                onChange={(e) => setFormData((p) => ({ ...p, pickup: e.target.value }))}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
              >
                <option value="">Select pickup location</option>
                {hyderabadLocations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-600 block mb-1.5">Destination *</label>
              <select
                value={formData.destination}
                onChange={(e) => setFormData((p) => ({ ...p, destination: e.target.value }))}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
              >
                <option value="">Select destination</option>
                {hyderabadLocations.filter((l) => l !== formData.pickup).map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          {formData.pickup && formData.destination && (
            <div className="mt-3 p-3 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-violet-700">
                <MapPin className="w-4 h-4" />
                <span className="font-semibold">{formData.pickup}</span>
                <span className="text-violet-400">→</span>
                <span className="font-semibold">{formData.destination}</span>
              </div>
              <button
                type="button"
                onClick={generateAIPreview}
                className="text-xs font-semibold text-violet-600 hover:text-violet-700 flex items-center gap-1"
              >
                <Zap className="w-3 h-3" />
                Generate AI Preview
              </button>
            </div>
          )}
        </div>

        {/* Date & Time */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-violet-600" />
            Schedule
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-600 block mb-1.5">Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-600 block mb-1.5">Departure Time *</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData((p) => ({ ...p, time: e.target.value }))}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>
        </div>

        {/* Seats & Price */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-violet-600" />
            Seats & Pricing
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-slate-600 block mb-2">Available Seats: <span className="text-violet-600 text-lg font-bold">{formData.seats}</span></label>
              <input
                type="range"
                min={1}
                max={6}
                value={formData.seats}
                onChange={(e) => setFormData((p) => ({ ...p, seats: Number(e.target.value) }))}
                className="w-full accent-violet-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-600 block mb-2">Price per Seat: <span className="text-violet-600 text-lg font-bold">₹{formData.price}</span></label>
              <input
                type="range"
                min={20}
                max={500}
                step={10}
                value={formData.price}
                onChange={(e) => setFormData((p) => ({ ...p, price: Number(e.target.value) }))}
                className="w-full accent-violet-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>₹20</span><span>₹500</span>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
            <p className="text-sm font-semibold text-emerald-700">
              💰 Potential earnings: ₹{formData.price * formData.seats} (if all {formData.seats} seats are booked)
            </p>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Wind className="w-4 h-4 text-violet-600" />
            Ride Preferences
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { key: 'ac', icon: Wind, label: 'AC', color: 'blue' },
              { key: 'music', icon: Music, label: 'Music', color: 'violet' },
              { key: 'pets', icon: () => <span>🐾</span>, label: 'Pets OK', color: 'amber' },
              { key: 'smoking', icon: () => <span>🚬</span>, label: 'Smoking', color: 'rose' },
            ].map((pref) => {
              const isActive = formData[pref.key as keyof typeof formData] as boolean;
              return (
                <button
                  key={pref.key}
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, [pref.key]: !p[pref.key as keyof typeof p] }))}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 text-sm font-semibold transition-all
                    ${isActive ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
                >
                  <pref.icon className="w-5 h-5" />
                  <span>{pref.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-violet-200 text-violet-700' : 'bg-slate-100 text-slate-500'}`}>
                    {isActive ? 'Yes' : 'No'}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-4">
            <label className="text-sm font-semibold text-slate-600 block mb-1.5 flex items-center gap-1.5">
              <Package className="w-4 h-4" /> Luggage Allowance
            </label>
            <div className="flex gap-3">
              {(['none', 'small', 'large'] as const).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, luggage: size }))}
                  className={`flex-1 py-2 rounded-xl border-2 text-sm font-semibold capitalize transition-all
                    ${formData.luggage === size ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
                >
                  {size === 'none' ? '🚫 None' : size === 'small' ? '👜 Small' : '🧳 Large'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <label className="text-sm font-semibold text-slate-600 block mb-1.5">Additional Notes (optional)</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
            placeholder="Any special instructions for passengers..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
          />
        </div>

        {/* AI Preview */}
        {aiPreview && (
          <div className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-2xl p-5 border border-violet-200">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-violet-600" />
              <h3 className="font-bold text-violet-800">🤖 Gemini AI Preview</h3>
            </div>
            <p className="text-sm text-violet-700 leading-relaxed">{aiPreview}</p>
          </div>
        )}

        {/* Submit */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="flex-1 py-3.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-2 flex-grow py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm hover:from-violet-700 hover:to-indigo-700 disabled:opacity-60 transition-all shadow-lg shadow-violet-200 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Posting Ride...
              </>
            ) : (
              <>
                <DollarSign className="w-4 h-4" />
                Post Ride
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
