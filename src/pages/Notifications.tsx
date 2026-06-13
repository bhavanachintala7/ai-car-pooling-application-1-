// ============================================================
// NOTIFICATIONS PAGE
// ============================================================

import { Bell, CheckCheck, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

const colorMap = {
  info: 'bg-blue-50 border-blue-200 text-blue-600',
  success: 'bg-emerald-50 border-emerald-200 text-emerald-600',
  warning: 'bg-amber-50 border-amber-200 text-amber-600',
  error: 'bg-rose-50 border-rose-200 text-rose-600',
};

export default function Notifications() {
  const { notifications, markNotificationRead, markAllRead, unreadCount } = useApp();

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Bell className="w-5 h-5 text-violet-600" />
            Notifications
            {unreadCount > 0 && (
              <span className="w-6 h-6 bg-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">{unreadCount} unread notifications</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 text-sm font-semibold text-violet-600 hover:text-violet-700 border border-violet-200 px-3 py-1.5 rounded-xl hover:bg-violet-50 transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm">
          <Bell className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="font-semibold text-slate-500">No notifications yet</p>
          <p className="text-sm text-slate-400 mt-1">You'll see ride updates, bookings, and AI alerts here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notif) => {
            const Icon = iconMap[notif.type];
            const colors = colorMap[notif.type];
            return (
              <div
                key={notif.id}
                onClick={() => markNotificationRead(notif.id)}
                className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all hover:shadow-sm
                  ${notif.read ? 'bg-white border-slate-100' : `${colors.split(' ')[0]} ${colors.split(' ')[1]}`}`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${colors}`}>
                  <Icon className="w-4.5 h-4.5" style={{ width: '18px', height: '18px' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-semibold ${notif.read ? 'text-slate-600' : 'text-slate-800'}`}>
                      {notif.title}
                    </p>
                    {!notif.read && <div className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0 mt-1" />}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{notif.message}</p>
                  <p className="text-[10px] text-slate-300 mt-1.5">
                    {new Date(notif.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
