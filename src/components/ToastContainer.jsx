import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-slate-900/95 text-white dark:bg-white/95 dark:text-slate-900 px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 dark:border-slate-200 flex items-start gap-3 backdrop-blur-md animate-slide-up"
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 dark:text-emerald-600 flex-shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Info className="w-5 h-5 text-campus-400 dark:text-campus-600 flex-shrink-0 mt-0.5" />
          )}
          {toast.type === 'error' && (
            <AlertCircle className="w-5 h-5 text-rose-400 dark:text-rose-600 flex-shrink-0 mt-0.5" />
          )}

          <div className="flex-1 text-xs font-medium leading-relaxed">
            {toast.message}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-white dark:hover:text-slate-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
