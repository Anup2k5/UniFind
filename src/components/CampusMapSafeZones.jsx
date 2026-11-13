import React from 'react';
import {
  MapPin,
  Clock,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  Building,
  UserCheck
} from 'lucide-react';
import { SAFE_DROP_OFF_ZONES } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const CampusMapSafeZones = () => {
  const { items, setSelectedItemModal } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-campus-900 to-indigo-900 text-white p-6 sm:p-8 mb-8 shadow-xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-slate-200 border border-white/20 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Official Campus Public Safety Safe Desks
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            Campus Safe Drop-Off & Pickup Desks
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Never meet strangers in isolated dorm rooms or parking lots. Hand over found items at these 4 official, staff-monitored university custody desks.
          </p>
        </div>
      </div>

      {/* Safe Desks Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SAFE_DROP_OFF_ZONES.map((zone) => {
          // Items held at this desk
          const heldItems = items.filter((i) => i.safeZone === zone.name && i.status !== 'Resolved');

          return (
            <div
              key={zone.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      {zone.status}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-2">
                      {zone.name}
                    </h3>
                  </div>

                  <div className="w-10 h-10 rounded-2xl bg-campus-50 dark:bg-campus-950/60 text-campus-600 dark:text-campus-400 flex items-center justify-center font-bold flex-shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-campus-500 flex-shrink-0" />
                    <span>{zone.building}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-campus-500 flex-shrink-0" />
                    <span>Hours: {zone.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-campus-500 flex-shrink-0" />
                    <span>Desk Phone: <strong className="text-slate-900 dark:text-white">{zone.phone}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-campus-500 flex-shrink-0" />
                    <span>Attendant: {zone.officerInCharge}</span>
                  </div>
                </div>

                {/* Items currently in custody at this desk */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Items Currently in Safe Custody ({heldItems.length}):
                  </div>

                  {heldItems.length === 0 ? (
                    <div className="text-xs text-slate-400 italic">
                      No unclaimed items at this desk today.
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {heldItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedItemModal(item)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-4 h-4 rounded object-cover"
                          />
                          <span className="truncate max-w-[150px]">{item.title}</span>
                          <span className="text-campus-600 font-bold">→</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">ID Verification Required for Collection</span>
                <span className="font-semibold text-campus-600 dark:text-campus-400">
                  Official Public Safety Desk
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety Policy Banner */}
      <div className="mt-8 p-6 rounded-3xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-campus-600 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Campus Property Recovery Protocol
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Items not claimed within 90 days are handled under State University Surplus & Charity Disposition regulations.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
