// ============================================================
// PROFILE PAGE
// Features: Profile editing, Vehicle info, Preferences, Stats
// ============================================================

import { useState } from 'react';
import { User, Phone, Mail, Car, Music, Wind, Star, Edit3, Save, X, Shield, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });
  const [prefData, setPrefData] = useState({
    music: user?.preferences?.music ?? true,
    ac: user?.preferences?.ac ?? true,
    smoking: user?.preferences?.smoking ?? false,
    pets: user?.preferences?.pets ?? false,
    luggage: user?.preferences?.luggage ?? 'small',
  });

  const handleSave = () => {
    updateProfile({
      name: formData.name,
      phone: formData.phone,
      preferences: {
        music: prefData.music,
        ac: prefData.ac,
        smoking: prefData.smoking,
        pets: prefData.pets,
        luggage: prefData.luggage as 'none' | 'small' | 'large',
      },
    });
    setEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData({ name: user?.name || '', phone: user?.phone || '', email: user?.email || '' });
    setPrefData({
      music: user?.preferences?.music ?? true,
      ac: user?.preferences?.ac ?? true,
      smoking: user?.preferences?.smoking ?? false,
      pets: user?.preferences?.pets ?? false,
      luggage: user?.preferences?.luggage ?? 'small',
    });
    setEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Cover */}
        <div className="h-28 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 relative">
          <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="absolute w-2 h-2 rounded-full bg-white" style={{ left: `${i * 5 + 2}%`, top: `${(i % 3) * 30 + 10}%`, opacity: Math.random() * 0.8 + 0.2 }} />
            ))}
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-10 mb-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-xl border-4 border-white">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex gap-2 mt-10">
              {editing ? (
                <>
                  <button onClick={handleCancel} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors">
                    <X className="w-4 h-4" /> Cancel
                  </button>
                  <button onClick={handleSave} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 transition-colors">
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </>
              ) : (
                <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-violet-600 border border-violet-200 hover:bg-violet-50 transition-colors">
                  <Edit3 className="w-4 h-4" /> Edit Profile
                </button>
              )}
            </div>
          </div>

          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-extrabold text-slate-800">{user?.name}</h2>
                {user?.verified && (
                  <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <Shield className="w-3 h-3" /> Verified
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <span className={`capitalize font-semibold ${user?.role === 'driver' ? 'text-violet-600' : 'text-blue-600'}`}>
                  {user?.role === 'driver' ? '🚗 Driver' : '👤 Passenger'}
                </span>
                <span>•</span>
                <span>Joined {user?.joinedDate}</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="flex items-center gap-1 justify-center">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-lg font-extrabold text-slate-800">{user?.rating}</span>
                </div>
                <p className="text-xs text-slate-400">Rating</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-extrabold text-slate-800">{user?.totalRides}</p>
                <p className="text-xs text-slate-400">Total Rides</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <User className="w-4 h-4 text-violet-600" />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Full Name', icon: User, field: 'name', value: formData.name, type: 'text' },
            { label: 'Phone Number', icon: Phone, field: 'phone', value: formData.phone, type: 'tel' },
            { label: 'Email Address', icon: Mail, field: 'email', value: formData.email, type: 'email', disabled: true },
          ].map((field) => (
            <div key={field.field} className={field.field === 'email' ? 'md:col-span-2' : ''}>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">{field.label}</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <field.icon className="w-4 h-4" />
                </div>
                <input
                  type={field.type}
                  value={field.value}
                  disabled={!editing || field.disabled}
                  onChange={(e) => setFormData((p) => ({ ...p, [field.field]: e.target.value }))}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-colors
                    ${!editing || field.disabled
                      ? 'border-slate-100 bg-slate-50 text-slate-600 cursor-default'
                      : 'border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500'
                    }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vehicle Info (Driver only) */}
      {user?.role === 'driver' && user.vehicle && (
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Car className="w-4 h-4 text-violet-600" />
            Vehicle Information
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'Make', value: user.vehicle.make },
              { label: 'Model', value: user.vehicle.model },
              { label: 'Year', value: String(user.vehicle.year) },
              { label: 'Color', value: user.vehicle.color },
              { label: 'License Plate', value: user.vehicle.licensePlate },
              { label: 'Total Seats', value: String(user.vehicle.seats) },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">{field.label}</label>
                <p className="text-sm font-semibold text-slate-700 bg-slate-50 rounded-xl px-3 py-2.5">{field.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <p className="text-xs text-emerald-700 font-medium">Vehicle verified by RideShare AI. License valid through Dec 2026.</p>
          </div>
        </div>
      )}

      {/* Travel Preferences */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Wind className="w-4 h-4 text-violet-600" />
          Travel Preferences
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {[
            { key: 'ac', icon: Wind, label: 'AC', emoji: '❄️' },
            { key: 'music', icon: Music, label: 'Music', emoji: '🎵' },
            { key: 'pets', icon: () => null, label: 'Pets OK', emoji: '🐾' },
            { key: 'smoking', icon: () => null, label: 'Smoking', emoji: '🚬' },
          ].map((pref) => {
            const isActive = prefData[pref.key as keyof typeof prefData] as boolean;
            return (
              <button
                key={pref.key}
                type="button"
                disabled={!editing}
                onClick={() => editing && setPrefData((p) => ({ ...p, [pref.key]: !p[pref.key as keyof typeof p] }))}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-sm font-semibold transition-all
                  ${!editing ? 'cursor-default' : 'cursor-pointer'}
                  ${isActive ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-slate-200 text-slate-400 bg-slate-50'}`}
              >
                <span className="text-xl">{pref.emoji}</span>
                <span className="text-xs">{pref.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-violet-200 text-violet-700' : 'bg-slate-200 text-slate-500'}`}>
                  {isActive ? 'Enabled' : 'Disabled'}
                </span>
              </button>
            );
          })}
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Luggage Preference</label>
          <div className="flex gap-3">
            {(['none', 'small', 'large'] as const).map((size) => (
              <button
                key={size}
                type="button"
                disabled={!editing}
                onClick={() => editing && setPrefData((p) => ({ ...p, luggage: size }))}
                className={`flex-1 py-2 rounded-xl border-2 text-sm font-semibold capitalize transition-all
                  ${!editing ? 'cursor-default' : 'cursor-pointer'}
                  ${prefData.luggage === size ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-slate-200 text-slate-400 bg-slate-50'}`}
              >
                {size === 'none' ? '🚫 None' : size === 'small' ? '👜 Small' : '🧳 Large'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Account Security */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Shield className="w-4 h-4 text-violet-600" />
          Account Security
        </h3>
        <div className="space-y-3">
          {[
            { label: 'Password', desc: 'Last changed 30 days ago', action: 'Change', status: 'secure' },
            { label: 'Two-Factor Auth', desc: 'Add extra security to your account', action: 'Enable', status: 'optional' },
            { label: 'Login Sessions', desc: '2 active sessions', action: 'Manage', status: 'info' },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="text-sm font-semibold text-slate-700">{item.label}</p>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
              <button className="text-xs font-semibold text-violet-600 hover:text-violet-700 px-3 py-1.5 rounded-lg hover:bg-violet-50 transition-colors border border-violet-200">
                {item.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-rose-50 rounded-2xl p-5 border border-rose-200">
        <h3 className="font-bold text-rose-800 mb-3">Danger Zone</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 py-2.5 rounded-xl border-2 border-rose-300 text-rose-600 text-sm font-semibold hover:bg-rose-100 transition-colors">
            Deactivate Account
          </button>
          <button className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
