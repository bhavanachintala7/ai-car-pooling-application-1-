import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Car, Eye, EyeOff, User, Mail, Phone, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type InputFieldProps = {
  label: string;
  icon: React.ElementType;
  type?: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  rightElement?: React.ReactNode;
};

function InputField({
  label,
  icon: Icon,
  type = 'text',
  placeholder,
  value,
  error,
  onChange,
  rightElement,
}: InputFieldProps) {
  return (
    <div>
      <label className="text-white/80 text-sm font-medium block mb-1.5">{label}</label>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon className="w-4 h-4" />
        </div>

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full pl-10 ${rightElement ? 'pr-11' : 'pr-4'} py-3 rounded-xl bg-white/10 border ${
            error ? 'border-rose-400' : 'border-white/20'
          } text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all`}
        />

        {rightElement && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>

      {error && <p className="text-rose-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'passenger' as 'driver' | 'passenger',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Valid email required';
    if (!formData.phone.match(/^\+?[\d\s-]{10,}/)) errs.phone = 'Valid phone number required';
    if (formData.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Passwords do not match';

    return errs;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errs = validate();

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsLoading(true);

    const success = await register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: formData.role,
    });

    setIsLoading(false);

    if (success) navigate('/dashboard');
  };

  const update = (key: string, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-950 to-indigo-950 flex items-center justify-center p-4 py-10">
      <div className="absolute top-20 left-20 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-xl">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-white font-extrabold text-xl leading-tight">RideShare AI</p>
              <p className="text-violet-300 text-xs">Smart Carpooling Platform</p>
            </div>
          </Link>

          <h1 className="text-2xl font-extrabold text-white">Create your account</h1>
          <p className="text-slate-400 mt-1">Join 50K+ smart commuters today</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="grid grid-cols-2 gap-3 mb-6">
            {(['passenger', 'driver'] as const).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setFormData((p) => ({ ...p, role }))}
                className={`py-3 rounded-xl text-sm font-bold border transition-all flex flex-col items-center gap-1.5 ${
                  formData.role === role
                    ? 'bg-gradient-to-br from-violet-600 to-indigo-600 border-transparent text-white shadow-lg shadow-violet-500/30'
                    : 'bg-white/10 border-white/20 text-slate-300 hover:bg-white/20'
                }`}
              >
                <span className="text-xl">{role === 'driver' ? '🚗' : '👤'}</span>
                <span className="capitalize">{role}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Full Name"
              icon={User}
              value={formData.name}
              error={errors.name}
              onChange={(v) => update('name', v)}
              placeholder="Arjun Sharma"
            />

            <InputField
              label="Email Address"
              icon={Mail}
              type="email"
              value={formData.email}
              error={errors.email}
              onChange={(v) => update('email', v)}
              placeholder="you@example.com"
            />

            <InputField
              label="Phone Number"
              icon={Phone}
              value={formData.phone}
              error={errors.phone}
              onChange={(v) => update('phone', v)}
              placeholder="+91 98765 43210"
            />

            <InputField
              label="Password"
              icon={Lock}
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              error={errors.password}
              onChange={(v) => update('password', v)}
              placeholder="Min. 6 characters"
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />

            <InputField
              label="Confirm Password"
              icon={Lock}
              type="password"
              value={formData.confirmPassword}
              error={errors.confirmPassword}
              onChange={(v) => update('confirmPassword', v)}
              placeholder="Repeat your password"
            />

            {formData.password && (
              <div className="space-y-1">
                <div className="flex gap-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-1 rounded-full transition-colors ${
                        formData.password.length > i * 2
                          ? formData.password.length >= 10
                            ? 'bg-emerald-400'
                            : formData.password.length >= 6
                            ? 'bg-amber-400'
                            : 'bg-rose-400'
                          : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs text-slate-400">
                  {formData.password.length >= 10
                    ? '✅ Strong'
                    : formData.password.length >= 6
                    ? '⚡ Medium'
                    : '⚠️ Weak'}
                </p>
              </div>
            )}

            <label className="flex items-start gap-2.5 cursor-pointer mt-2">
              <input type="checkbox" required className="w-4 h-4 mt-0.5 rounded accent-violet-500 flex-shrink-0" />
              <span className="text-xs text-slate-400">
                I agree to the{' '}
                <a href="#" className="text-violet-400 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-violet-400 hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-60 transition-all shadow-lg shadow-violet-500/30 flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-white/10">
            <p className="text-xs text-slate-400 mb-3">What you get:</p>
            <div className="grid grid-cols-2 gap-2">
              {['AI ride matching', 'Gemini insights', 'Live analytics', 'Safe & verified'].map((b) => (
                <div key={b} className="flex items-center gap-1.5 text-xs text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  {b}
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-slate-400 text-sm mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-violet-400 font-semibold hover:text-violet-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}