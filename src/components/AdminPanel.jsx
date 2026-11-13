import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  Trash2,
  Send,
  Eye,
  Clock,
  MapPin,
  Lock,
  FileCheck,
  Bell,
  Sparkles,
  Building
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatDate, timeAgo, getStatusBadgeStyle } from '../utils/helpers';
import { SAFE_DROP_OFF_ZONES } from '../data/mockData';

export const AdminPanel = () => {
  const {
    items,
    claims,
    currentUser,
    updateClaimStatus,
    updateItemStatus,
    deleteItem,
    setSelectedItemModal,
    addToast
  } = useApp();

  const [adminTab, setAdminTab] = useState('claims'); // 'claims' | 'items' | 'broadcast'
  const [itemSearch, setItemSearch] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [selectedClaimForAction, setSelectedClaimForAction] = useState(null);

  // Broadcast alert state
  const [alertHeadline, setAlertHeadline] = useState('');
  const [alertDetails, setAlertDetails] = useState('');
  const [alertLocation, setAlertLocation] = useState('Campus-Wide');

  const pendingClaims = claims.filter((c) => c.status === 'Pending');
  const approvedClaims = claims.filter((c) => c.status === 'Approved');

  const filteredItems = items.filter((i) => {
    if (!itemSearch) return true;
    const q = itemSearch.toLowerCase();
    return (
      i.title.toLowerCase().includes(q) ||
      i.location.toLowerCase().includes(q) ||
      i.id.toLowerCase().includes(q) ||
      i.reporter?.name?.toLowerCase().includes(q)
    );
  });

  const handleBroadcastAlert = (e) => {
    e.preventDefault();
    if (!alertHeadline.trim()) return;

    addToast(`Campus Alert Broadcasted: "${alertHeadline}" sent to student body!`, 'info');
    setAlertHeadline('');
    setAlertDetails('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-campus-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 border border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-campus-600 flex items-center justify-center text-white shadow-lg shadow-campus-600/40">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                  Public Safety & Campus Administration
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Officer Active
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Official Campus Recovery Operations • Apex State University Police Services
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-400 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur-sm">
            Admin Officer: <span className="text-white font-bold">{currentUser.name}</span>
          </div>
        </div>

        {/* Admin KPI stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm text-center">
            <div className="text-2xl font-black text-amber-400">
              {pendingClaims.length}
            </div>
            <div className="text-xs text-slate-300 font-medium">Claims Pending Review</div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm text-center">
            <div className="text-2xl font-black text-white">
              {items.length}
            </div>
            <div className="text-xs text-slate-300 font-medium">Total Items Logged</div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm text-center">
            <div className="text-2xl font-black text-emerald-400">
              {approvedClaims.length + 24}
            </div>
            <div className="text-xs text-slate-300 font-medium">Verified Hand-Backs</div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm text-center">
            <div className="text-2xl font-black text-blue-400">
              4
            </div>
            <div className="text-xs text-slate-300 font-medium">Safe Desks Operational</div>
          </div>
        </div>

      </div>

      {/* Admin Subtabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-6">
        <button
          onClick={() => setAdminTab('claims')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
            adminTab === 'claims'
              ? 'bg-campus-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Claims Verification Queue</span>
          {pendingClaims.length > 0 && (
            <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-black">
              {pendingClaims.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setAdminTab('items')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
            adminTab === 'items'
              ? 'bg-campus-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <span>All Items Moderation</span>
          <span className="text-xs text-slate-400 font-normal">({items.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('broadcast')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
            adminTab === 'broadcast'
              ? 'bg-campus-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Bell className="w-4 h-4" />
          Broadcast Campus Alert
        </button>
      </div>

      {/* Tab 1: Claims Verification Queue */}
      {adminTab === 'claims' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Pending Ownership Claims ({pendingClaims.length})
            </h3>
            <span className="text-xs text-slate-400">
              Review claimant answers before issuing pickup authorization
            </span>
          </div>

          {pendingClaims.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 max-w-md mx-auto">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Queue is Clear!
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                All submitted student ownership claims have been verified.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingClaims.map((claim) => (
                <div
                  key={claim.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm"
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    
                    {/* Left: Item + Claimant info */}
                    <div className="flex items-start gap-4 flex-1">
                      <img
                        src={claim.itemImage}
                        alt={claim.itemTitle}
                        className="w-20 h-20 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0"
                      />
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                            Claim ID: {claim.id}
                          </span>
                          <span className="text-xs text-slate-400">
                            Filed {timeAgo(claim.claimDate)}
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {claim.itemTitle}
                        </h4>

                        <div className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                          Claimed by: <span className="font-bold text-slate-900 dark:text-white">{claim.claimantName}</span> ({claim.claimantStudentId})
                        </div>

                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Email: {claim.claimantEmail} • Phone: {claim.claimantPhone}
                        </div>
                      </div>
                    </div>

                    {/* Middle: Claimant's Proof of ownership */}
                    <div className="lg:max-w-md w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-campus-500" />
                        Claimant's Proof Explanation:
                      </div>
                      <p className="text-xs text-slate-800 dark:text-slate-200 italic leading-relaxed whitespace-pre-line">
                        "{claim.proofAnswers}"
                      </p>
                      {claim.proofImage && (
                        <div className="mt-2 flex items-center gap-2">
                          <img
                            src={claim.proofImage}
                            alt="Claimant supporting proof"
                            className="w-12 h-12 rounded-lg object-cover border"
                          />
                          <span className="text-[10px] text-campus-600 font-bold">
                            Supporting attachment provided
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Right: Actions */}
                    <div className="flex lg:flex-col gap-2 w-full lg:w-auto">
                      <button
                        onClick={() => {
                          updateClaimStatus(claim.id, 'Approved', 'Verified by Campus Public Safety Officer');
                        }}
                        className="flex-1 lg:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-102"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Approve & Issue Pickup Code
                      </button>

                      <button
                        onClick={() => {
                          const reason = prompt('Please enter the reason for rejecting this claim:');
                          if (reason) {
                            updateClaimStatus(claim.id, 'Rejected', reason);
                          }
                        }}
                        className="flex-1 lg:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-300 text-xs font-bold transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject Claim
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Past Approved Claims History */}
          {approvedClaims.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                Recently Approved & Awaiting Physical Pickup ({approvedClaims.length})
              </h3>
              <div className="space-y-2">
                {approvedClaims.map((c) => (
                  <div
                    key={c.id}
                    className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {c.itemTitle}
                      </span>
                      <span className="text-slate-400 ml-2">
                        Owner: {c.claimantName} ({c.claimantStudentId})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-1 rounded-lg">
                        {c.pickupCode}
                      </span>
                      <span className="text-[10px] text-slate-400">Approved</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: All Items Moderation */}
      {adminTab === 'items' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={itemSearch}
                onChange={(e) => setItemSearch(e.target.value)}
                placeholder="Search by title, location, student name, or item ID..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-campus-500"
              />
            </div>
            <div className="text-xs text-slate-400 font-medium">
              Showing {filteredItems.length} of {items.length} items
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Item Details</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Reported By</th>
                    <th className="py-3 px-4 text-right">Moderation Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredItems.map((item) => {
                    const statusStyle = getStatusBadgeStyle(item.status);
                    return (
                      <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0"
                            />
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white line-clamp-1">
                                {item.title}
                              </div>
                              <div className="text-[10px] text-slate-400">
                                ID: {item.id} • {formatDate(item.date)}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                              item.type === 'lost'
                                ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                                : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                            }`}
                          >
                            {item.type}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <select
                            value={item.status}
                            onChange={(e) => updateItemStatus(item.id, e.target.value)}
                            className="text-xs font-semibold px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 cursor-pointer"
                          >
                            <option value="Lost">Lost</option>
                            <option value="Found">Found</option>
                            <option value="Matched">Matched</option>
                            <option value="Claimed">Claimed</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                        </td>

                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                          <div className="line-clamp-1">{item.location}</div>
                        </td>

                        <td className="py-3 px-4">
                          <div className="text-slate-800 dark:text-slate-200 font-medium">
                            {item.reporter?.name}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {item.reporter?.studentId}
                          </div>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedItemModal(item)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete post "${item.title}"?`)) {
                                  deleteItem(item.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950"
                              title="Remove fake/spam"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Broadcast Campus Alert */}
      {adminTab === 'broadcast' && (
        <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 flex items-center justify-center font-bold">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Campus-Wide Recovery Alert
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Send push notification and banner alert to all active students
              </p>
            </div>
          </div>

          <form onSubmit={handleBroadcastAlert} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                Alert Headline *
              </label>
              <input
                type="text"
                required
                value={alertHeadline}
                onChange={(e) => setAlertHeadline(e.target.value)}
                placeholder="e.g. URGENT: Prescription Asthma Inhaler & Bag left in Rec Gym"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-campus-500 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                Campus Target Area
              </label>
              <input
                type="text"
                value={alertLocation}
                onChange={(e) => setAlertLocation(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                Details & Safety Instructions
              </label>
              <textarea
                rows={3}
                value={alertDetails}
                onChange={(e) => setAlertDetails(e.target.value)}
                placeholder="If found, please immediately surrender to Campus Police or the closest 24/7 library desk..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Broadcast Alert to Student Portal
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
