import React from 'react';
import { ShieldCheck, Heart, GraduationCap, MapPin, Phone, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 transition-colors mt-16 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-campus-600 flex items-center justify-center text-white font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white">
                Uni<span className="text-campus-600 dark:text-campus-400">Find</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Official campus lost & found network connecting students, staff, and public safety officers to recover lost items across university grounds.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Campus Public Safety Certified</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Campus Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => setActiveTab('browse')}
                  className="hover:text-campus-600 dark:hover:text-campus-400"
                >
                  Browse Reported Items
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('matches')}
                  className="hover:text-campus-600 dark:hover:text-campus-400"
                >
                  Smart AI Matches
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="hover:text-campus-600 dark:hover:text-campus-400"
                >
                  Student Hub & Claims
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('safe-zones')}
                  className="hover:text-campus-600 dark:hover:text-campus-400"
                >
                  Safe Drop-Off Helpdesks
                </button>
              </li>
            </ul>
          </div>

          {/* Official safe desks */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Official Safe Desks
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>Main Library Circulation (24/7)</li>
              <li>Public Safety HQ (Room 102)</li>
              <li>Student Union Information Hub</li>
              <li>Recreation Sports Complex Desk</li>
            </ul>
          </div>

          {/* Emergency contacts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Campus Public Safety
            </h4>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-campus-500" />
                <span>Emergency: (555) 019-9111</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-campus-500" />
                <span>Lost & Found Desk: (555) 019-4821</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-campus-500" />
                <span>lostfound@university.edu</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-campus-500" />
                <span>Hall of Administration, Suite 102</span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Apex State University Lost & Found Registry. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built for university students with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
