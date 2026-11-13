import React, { useState } from 'react';
import {
  User,
  Package,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  ShieldCheck,
  AlertCircle,
  PlusCircle,
  ExternalLink,
  Trash2,
  QrCode,
  Tag
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ItemCard } from './ItemCard';
import { formatDate, timeAgo, getStatusBadgeStyle } from '../utils/helpers';

export const StudentDashboard = () => {
  const {
    currentUser,
    items,
    claims,
    setReportModal,
    setSelectedItemModal,
    updateItemStatus,
    deleteItem,
    triggerConfetti,
    addToast
  } = useApp();

  const [dashboardTab, setDashboardTab] = useState('reports'); // 'reports' | 'claims' | 'guide'

  // Filter items reported by current user
  const myItems = items.filter((i) => i.reporter?.id === currentUser?.id);
  const myLostCount = myItems.filter((i) => i.type === 'lost').length;
  const myFoundCount = myItems.filter((i) => i.type === 'found').length;
  const myResolvedCount = myItems.filter((i) => i.status === 'Resolved').length;

  // Filter claims filed by this student
  const myClaims = claims.filter((c) => c.claimantId === currentUser?.id);

  // Filter claims received on items this student reported as found
  const myFoundItemIds = new Set(myItems.filter((i) => i.type === 'found').map((i) => i.id));
  const claimsOnMyFoundItems = claims.filter((c) => myFoundItemIds.has(c.itemId));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Student Profile Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-campus-500/30 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {currentUser.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-campus-100 dark:bg-campus-950 text-campus-700 dark:text-campus-300 border border-campus-300">
                  {currentUser.role === 'admin' ? 'Campus Admin' : 'Verified Student'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {currentUser.department || 'University Student'} • ID: {currentUser.studentId}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {currentUser.email} • {currentUser.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <button
              onClick={() => setReportModal({ open: true, defaultType: 'lost' })}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-campus-600 hover:bg-campus-700 text-white text-xs font-bold shadow-md shadow-campus-600/20 transition-all hover:scale-102"
            >
              <PlusCircle className="w-4 h-4" />
              Report New Item
            </button>
          </div>

        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-center">
            <div className="text-xl font-black text-slate-900 dark:text-white">
              {myItems.length}
            </div>
            <div className="text-xs text-slate-400 font-medium">My Total Reports</div>
          </div>
          <div className="p-3 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 text-center">
            <div className="text-xl font-black text-rose-600 dark:text-rose-400">
              {myLostCount}
            </div>
            <div className="text-xs text-slate-400 font-medium">Items I Lost</div>
          </div>
          <div className="p-3 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 text-center">
            <div className="text-xl font-black text-campus-600 dark:text-campus-400">
              {myFoundCount}
            </div>
            <div className="text-xs text-slate-400 font-medium">Items I Found</div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 text-center">
            <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
              {myResolvedCount}
            </div>
            <div className="text-xs text-slate-400 font-medium">Reunited & Resolved</div>
          </div>
        </div>

      </div>

      {/* Dashboard Subtabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-6">
        <button
          onClick={() => setDashboardTab('reports')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            dashboardTab === 'reports'
              ? 'bg-campus-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          My Reported Items ({myItems.length})
        </button>

        <button
          onClick={() => setDashboardTab('claims')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
            dashboardTab === 'claims'
              ? 'bg-campus-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <span>My Claims & Pickup Codes</span>
          {myClaims.length > 0 && (
            <span className="w-5 h-5 rounded-full bg-white/20 text-white text-[10px] flex items-center justify-center font-black">
              {myClaims.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setDashboardTab('guide')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            dashboardTab === 'guide'
              ? 'bg-campus-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Campus Recovery Guide
        </button>
      </div>

      {/* Tab 1: My Reported Items */}
      {dashboardTab === 'reports' && (
        <div>
          {myItems.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 max-w-md mx-auto">
              <Package className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No items reported yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
                Have you lost or found something around the campus recently?
              </p>
              <button
                onClick={() => setReportModal({ open: true, defaultType: 'lost' })}
                className="px-4 py-2 rounded-xl bg-campus-600 text-white text-xs font-bold shadow-md hover:bg-campus-700"
              >
                Report an Item Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myItems.map((item) => {
                const statusStyle = getStatusBadgeStyle(item.status);
                return (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-800">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${statusStyle.bg}`}
                          >
                            <span className={`w-2 h-2 rounded-full ${statusStyle.dot}`} />
                            {statusStyle.label}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span
                            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold text-white uppercase ${
                              item.type === 'lost' ? 'bg-rose-600' : 'bg-campus-600'
                            }`}
                          >
                            {item.type}
                          </span>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="text-xs text-slate-400 mb-1">
                          Reported on {formatDate(item.date)}
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                          {item.title}
                        </h4>
                        <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-campus-500" />
                          <span className="truncate">{item.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedItemModal(item)}
                          className="flex-1 py-1.5 px-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                        >
                          View Details
                        </button>
                        {item.status !== 'Resolved' && (
                          <button
                            onClick={() => {
                              updateItemStatus(item.id, 'Resolved');
                            }}
                            className="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
                          >
                            Mark Returned
                          </button>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                        <span>Views: {item.views || 1}</span>
                        <button
                          onClick={() => {
                            if (window.confirm('Delete this report?')) {
                              deleteItem(item.id);
                            }
                          }}
                          className="text-rose-500 hover:underline flex items-center gap-1 text-[11px]"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: My Claims & Pickups */}
      {dashboardTab === 'claims' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
              Claims Submitted by You ({myClaims.length})
            </h3>

            {myClaims.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs text-slate-400">
                You haven't submitted any ownership claims yet.
              </div>
            ) : (
              <div className="space-y-3">
                {myClaims.map((claim) => (
                  <div
                    key={claim.id}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={claim.itemImage}
                        alt={claim.itemTitle}
                        className="w-14 h-14 rounded-xl object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                            {claim.itemTitle}
                          </h4>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              claim.status === 'Approved'
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                                : claim.status === 'Rejected'
                                ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                                : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                            }`}
                          >
                            {claim.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Claimed on {formatDate(claim.claimDate)}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 italic">
                          "{claim.proofAnswers}"
                        </p>
                      </div>
                    </div>

                    {/* Pickup code / status pill */}
                    <div className="flex flex-col sm:items-end gap-1 w-full sm:w-auto">
                      {claim.status === 'Approved' ? (
                        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-left sm:text-right">
                          <div className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase">
                            Pickup Verification Code
                          </div>
                          <div className="text-base font-black text-emerald-600 dark:text-emerald-400 tracking-wider font-mono">
                            {claim.pickupCode}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-0.5">
                            Show this code + Student ID at the Safe Desk
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs text-slate-400">
                          {claim.adminNotes || 'Verification under review by Campus Public Safety'}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Incoming claims on found items reported by this student */}
          {claimsOnMyFoundItems.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                Claims Received on Items You Found ({claimsOnMyFoundItems.length})
              </h3>
              <div className="space-y-3">
                {claimsOnMyFoundItems.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                      <span>{c.claimantName} claimed "{c.itemTitle}"</span>
                      <span className="text-campus-600">{c.status}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      Proof Answer: "{c.proofAnswers}"
                    </p>
                    <div className="text-[11px] text-slate-400">
                      Claimant Email: {c.claimantEmail} • Student ID: {c.claimantStudentId}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Tab 3: Campus Recovery Guide */}
      {dashboardTab === 'guide' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-campus-600" />
              What to do if you lose your Student ID card:
            </h3>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-4 leading-relaxed">
              <li>Check UniFind search first for "Student ID" or your initials.</li>
              <li>Immediately freeze your campus meal points and dorm access via Campus Card Portal.</li>
              <li>Visit the Student Union Welcome Desk or Central Library Front Desk.</li>
              <li>Found IDs are held for 14 days before being shredded for security.</li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Tips for Faster Recovery on UniFind:
            </h3>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-4 leading-relaxed">
              <li>Include exact room or floor details (e.g. "Library 3rd floor quiet corner").</li>
              <li>Mention unique stickers, scratches, or custom keychains.</li>
              <li>Keep your university email notifications enabled for match alerts.</li>
              <li>Always arrange safe handovers at designated campus desks.</li>
            </ul>
          </div>
        </div>
      )}

    </div>
  );
};
