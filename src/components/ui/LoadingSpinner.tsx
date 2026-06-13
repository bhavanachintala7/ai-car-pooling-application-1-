// ============================================================
// LOADING SPINNER COMPONENT
// ============================================================

export default function LoadingSpinner({ size = 'md', color = 'violet' }: { size?: 'sm' | 'md' | 'lg'; color?: string }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className={`${sizes[size]} border-2 border-slate-200 border-t-${color}-600 rounded-full animate-spin`} />
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="w-12 h-12 border-3 border-slate-200 border-t-violet-600 rounded-full animate-spin mx-auto mb-4" style={{ borderWidth: '3px' }} />
        <p className="text-slate-500 font-medium">Loading RideShare AI...</p>
      </div>
    </div>
  );
}
