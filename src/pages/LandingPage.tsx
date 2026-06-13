// ============================================================
// LANDING PAGE
// ============================================================

import { useNavigate } from 'react-router-dom';
import { Car, Zap, Shield, Users, Star, ArrowRight, MapPin, Brain, BarChart2, CheckCircle } from 'lucide-react';

const stats = [
  { value: '50K+', label: 'Happy Riders' },
  { value: '12K+', label: 'Drivers' },
  { value: '4.8★', label: 'Avg Rating' },
  { value: '₹2Cr+', label: 'Saved by Users' },
];

const features = [
  {
    icon: Brain,
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    title: 'AI-Powered Matching',
    desc: 'KNN machine learning algorithm finds your best ride matches with 95%+ compatibility scoring.',
  },
  {
    icon: Zap,
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    title: 'Gemini AI Insights',
    desc: 'Google Gemini generates real-time trip summaries, route analysis, and personalized recommendations.',
  },
  {
    icon: Shield,
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50',
    title: 'Safe & Verified',
    desc: 'All drivers and passengers are verified. JWT-secured accounts with role-based access control.',
  },
  {
    icon: BarChart2,
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50',
    title: 'Smart Analytics',
    desc: 'Real-time dashboards, ride analytics, earnings tracking, and performance insights.',
  },
  {
    icon: MapPin,
    color: 'from-rose-500 to-pink-500',
    bg: 'bg-rose-50',
    title: 'Smart Route Planning',
    desc: 'Intelligent route optimization with traffic analysis for efficient city commutes.',
  },
  {
    icon: Users,
    color: 'from-indigo-500 to-violet-500',
    bg: 'bg-indigo-50',
    title: 'Community Ratings',
    desc: 'Transparent rating system ensures quality rides. Driver & passenger reviews for every trip.',
  },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'Software Engineer', rating: 5, text: 'The AI matching is incredible! Found my perfect carpool buddy to Hitech City every morning. Saved ₹4000 monthly!' },
  { name: 'Ravi Kumar', role: 'Driver Partner', rating: 5, text: 'As a driver, the AI insights help me plan routes better. My ratings went from 4.2 to 4.9 in just 2 months!' },
  { name: 'Ananya Reddy', role: 'MBA Student', rating: 5, text: 'The Gemini AI recommendations are spot on. It knows my preferences and always suggests the right rides.' },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-200">
              <Car className="w-4.5 h-4.5 text-white" style={{ width: '18px', height: '18px' }} />
            </div>
            <div>
              <span className="font-extrabold text-slate-800 text-lg">RideShare</span>
              <span className="text-violet-600 font-extrabold text-lg"> AI</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-violet-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-violet-600 transition-colors">How It Works</a>
            <a href="#testimonials" className="hover:text-violet-600 transition-colors">Reviews</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/login')} className="text-sm font-semibold text-slate-600 hover:text-violet-600 transition-colors px-4 py-2 rounded-xl hover:bg-violet-50">
              Sign In
            </button>
            <button onClick={() => navigate('/register')} className="text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all shadow-md shadow-violet-200">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-violet-950 to-indigo-950">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-900/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/20 border border-violet-400/30 text-violet-300 text-sm font-medium mb-8">
              <Zap className="w-3.5 h-3.5" />
              Powered by Google Gemini AI & KNN Machine Learning
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
              Smarter Rides,{' '}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Powered by AI
              </span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
              India's most intelligent carpooling platform. AI matches you with the perfect ride, 
              Gemini generates personalized insights, and KNN predicts ride compatibility — all in real time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => navigate('/register')}
                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50"
              >
                Start Carpooling Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white border border-white/20 hover:bg-white/10 transition-all"
              >
                Try Demo Login
              </button>
            </div>

            {/* Demo Credentials Card */}
            <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-left mb-16">
              <p className="text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">Demo Credentials</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-violet-300 font-semibold">🚗 Driver</p>
                  <p className="text-white/80">driver@rideshare.com</p>
                  <p className="text-white/60">any password</p>
                </div>
                <div>
                  <p className="text-blue-300 font-semibold">👤 Passenger</p>
                  <p className="text-white/80">passenger@rideshare.com</p>
                  <p className="text-white/60">any password</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-violet-600 font-semibold text-sm uppercase tracking-wider">Features</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mt-2 mb-4">
              Why RideShare AI?
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Built with cutting-edge technology for the smartest commuting experience in India.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-violet-600 font-semibold text-sm uppercase tracking-wider">Process</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mt-2 mb-4">
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', icon: Users, title: 'Sign Up', desc: 'Register as Driver or Passenger. Verify your identity.' },
              { step: '02', icon: MapPin, title: 'Search / Post', desc: 'Post your ride or search for available rides on your route.' },
              { step: '03', icon: Brain, title: 'AI Matching', desc: 'KNN algorithm calculates compatibility. Gemini AI generates insights.' },
              { step: '04', icon: Car, title: 'Ride & Rate', desc: 'Commute together. Rate your experience. Earn rewards.' },
            ].map((item, i) => (
              <div key={item.step} className="text-center relative">
                {i < 3 && <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px border-t-2 border-dashed border-violet-200" />}
                <div className="relative inline-flex">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center mx-auto mb-4 border-2 border-violet-200">
                    <item.icon className="w-10 h-10 text-violet-600" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-violet-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-violet-600 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mt-2 mb-4">
              Loved by Thousands
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-violet-100 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-indigo-400 flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-violet-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Ready to Ride Smarter?
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Join 50,000+ commuters who save time, money, and the environment with RideShare AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all shadow-xl shadow-violet-500/30"
            >
              Join as Passenger
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/register')}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white border border-white/20 hover:bg-white/10 transition-all"
            >
              Become a Driver
            </button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-10 text-slate-400 text-sm">
            {['Free to join', 'No hidden fees', 'Cancel anytime', 'AI-powered matching'].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
              <Car className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold">RideShare AI</span>
          </div>
          <p className="text-slate-400 text-sm">© 2025 RideShare AI. Built with React, FastAPI, MySQL, KNN & Gemini AI.</p>
          <div className="flex gap-4 text-slate-400 text-sm">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">API Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
