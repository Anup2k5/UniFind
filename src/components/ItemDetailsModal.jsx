import React, { useState } from 'react';
import {
  X,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  Printer,
  Share2,
  AlertTriangle,
  CheckCircle2,
  User,
  Phone,
  Mail,
  HelpCircle,
  Sparkles,
  Lock,
  Tag,
  Building
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getStatusBadgeStyle, formatDate, timeAgo } from '../utils/helpers';
import { CATEGORIES } from '../data/mockData';

export const ItemDetailsModal = () => {
  const {
    selectedItemModal,
    setSelectedItemModal,
    setClaimModalItem,
    setPrintFlyerItem,
    currentUser,
    updateItemStatus,
    deleteItem,
    addToast
  } = useApp();

  const [copiedLink, setCopiedLink] = useState(false);

  if (!selectedItemModal) return null;

  const item = selectedItemModal;
  const statusStyle = getStatusBadgeStyle(item.status);
  const categoryObj = CATEGORIES.find((c) => c.id === item.category);
  const isOwner = currentUser?.id === item.reporter?.id;
  const isAdmin = currentUser?.role === 'admin';

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    addToast('Item link copied to clipboard!', 'info');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
        
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusStyle.bg}`}
            >
              <span className={`w-2 h-2 rounded-full ${statusStyle.dot}`} />
              {statusStyle.label}
            </span>
            <span className="text-xs text-slate-400">ID: {item.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setPrintFlyerItem(item);
              }}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Print Campus Notice Board Flyer"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Share item"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSelectedItemModal(null)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="max-h-[80vh] overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Main Visual & Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Left: Image Container */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-inner group">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 sm:h-72 object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 p-2 rounded-xl bg-slate-900/80 backdrop-blur-md text-white text-xs flex items-center justify-between">
                <span className="font-medium">
                  {item.type === 'lost' ? 'Reported Lost by Student' : 'Reported Found on Campus'}
                </span>
                <span className="text-[11px] text-slate-300">
                  {formatDate(item.date)}
                </span>
              </div>
            </div>

            {/* Right: Quick Overview */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <span className="inline-flex items-center gap-1 font-semibold px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    <Tag className="w-3 h-3 text-campus-500" />
                    {categoryObj?.name || 'General'}
                  </span>
                  <span>•</span>
                  <span>{timeAgo(item.createdAt || item.date)}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                  {item.title}
                </h2>
              </div>

              {/* Campus Location Card */}
              <div className="p-3.5 rounded-2xl bg-campus-50/70 dark:bg-campus-950/40 border border-campus-100 dark:border-campus-900/60">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-campus-600 dark:text-campus-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-campus-900 dark:text-campus-200">
                      {item.location}
                    </div>
                    {item.specificLocation && (
                      <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                        Specific Spot: <span className="font-medium text-slate-800 dark:text-slate-200">{item.specificLocation}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Lifecycle Indicator */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                  Recovery Lifecycle
                </div>
                <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-bold">
                  <div className="p-1 rounded-lg bg-campus-600 text-white">
                    1. Reported
                  </div>
                  <div className={`p-1 rounded-lg ${item.status !== 'Lost' ? 'bg-campus-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                    2. Tagged
                  </div>
                  <div className={`p-1 rounded-lg ${['Claimed', 'Resolved'].includes(item.status) ? 'bg-campus-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                    3. Claim
                  </div>
                  <div className={`p-1 rounded-lg ${item.status === 'Resolved' ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                    4. Reunited
                  </div>
                </div>
              </div>

              {/* Safe Drop-off Desk Alert if applicable */}
              {item.safeZone && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-emerald-900 dark:text-emerald-200">
                      Safely Deposited at Helpdesk:
                    </span>
                    <p className="text-emerald-800 dark:text-emerald-300 mt-0.5">
                      {item.safeZone}. You can pick it up by presenting your Student ID and pickup verification code.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Description Section */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Item Description & Distinguishing Marks
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {item.description}
            </p>

            {item.tags && item.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Ownership Verification Question Notice (for Found items) */}
          {item.type === 'found' && (
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 flex items-start gap-3">
              <Lock className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                  Verification Safeguard Active
                </h4>
                <p className="text-xs text-amber-800 dark:text-amber-400 mt-1">
                  To prevent unauthorized claims, the finder/campus officer has established an ownership challenge:
                </p>
                <div className="mt-2 text-xs italic font-medium p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-200 dark:border-amber-900 text-slate-800 dark:text-slate-200">
                  "{item.verificationQuestion || 'Describe unique items or serial marks not shown in photo'}"
                </div>
              </div>
            </div>
          )}

          {/* Reporter & Contact Info */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-campus-100 dark:bg-campus-900 text-campus-700 dark:text-campus-300 font-bold flex items-center justify-center">
                {item.reporter?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Reported by</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  {item.reporter?.name}
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {item.reporter?.studentId} • {item.reporter?.email}
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
              Campus Phone: <span className="font-semibold text-slate-700 dark:text-slate-300">{item.reporter?.phone || '(555) Campus-Ext'}</span>
            </div>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            {(isOwner || isAdmin) && item.status !== 'Resolved' && (
              <button
                onClick={() => {
                  updateItemStatus(item.id, 'Resolved');
                  setSelectedItemModal(null);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
              >
                Mark as Reunited & Resolved
              </button>
            )}

            {(isOwner || isAdmin) && (
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this report?')) {
                    deleteItem(item.id);
                    setSelectedItemModal(null);
                  }
                }}
                className="px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 text-xs font-semibold transition-colors"
              >
                Delete Report
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 ml-auto">
            {item.type === 'found' && item.status !== 'Resolved' && !isOwner && (
              <button
                onClick={() => {
                  setSelectedItemModal(null);
                  setClaimModalItem(item);
                }}
                className="px-5 py-2.5 rounded-xl bg-campus-600 hover:bg-campus-700 text-white text-sm font-bold shadow-md shadow-campus-600/20 transition-all hover:scale-102"
              >
                Claim This Item
              </button>
            )}

            {item.type === 'lost' && item.status !== 'Resolved' && !isOwner && (
              <button
                onClick={() => {
                  addToast('Alert dispatched to the owner with your contact details!', 'success');
                  setSelectedItemModal(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-102"
              >
                I Found This Item!
              </button>
            )}

            <button
              onClick={() => setSelectedItemModal(null)}
              className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
