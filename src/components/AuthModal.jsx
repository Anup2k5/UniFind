import React, { useState } from 'react';
import {
  X,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  User,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DEMO_USERS } from '../data/mockData';

export const AuthModal = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    currentUser,
    switchUser,
    addToast
  } = useApp();

  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  if (!authModalOpen) return null;

  const handleCustomLogin = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      alert('Please enter a valid university email address (.edu)');
      return;
    }

    const newUser = {
      id: `user-${Date.now().toString().slice(-4)}`,
      name: name.trim() || email.split('@')[0],
      email: email.trim(),
      studentId: studentId.trim() || `STU-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      role: 'student',
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80`,
      department: 'University Student',
      phone: '+1 (555) 492-1082'
    };

    switchUser(newUser);
    setAuthModalOpen(false);
    addToast(`Signed in as ${newUser.name}!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-campus-600 flex items-center justify-center text-white font-bold shadow-md shadow-campus-600/30">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                University SSO Authentication
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sign in with your university student or staff credentials
              </p>
            </div>
          </div>
          <button
            onClick={() => setAuthModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          
          {/* Quick 1-Click Demo Profiles */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Instant 1-Click Demo Profiles:
            </label>

            <div className="space-y-2">
              {DEMO_USERS.map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => {
                    switchUser(demo);
                    setAuthModalOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all ${
                    demo.id === currentUser.id
                      ? 'border-campus-500 bg-campus-50/60 dark:bg-campus-950/40 text-campus-900 dark:text-campus-100'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={demo.avatar}
                      alt={demo.name}
                      className="w-9 h-9 rounded-xl object-cover"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                        {demo.name}
                        {demo.role === 'admin' && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                            ADMIN
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {demo.department}
                      </div>
                    </div>
                  </div>

                  {demo.id === currentUser.id ? (
                    <CheckCircle2 className="w-5 h-5 text-campus-600" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
            <span className="flex-shrink mx-3 text-[11px] uppercase tracking-wider font-bold text-slate-400">
              Or Sign In with Custom ID
            </span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
          </div>

          {/* Custom Login Form */}
          <form onSubmit={handleCustomLogin} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jordan Miller"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-campus-500 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                University Email (.edu)
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="j.miller@student.university.edu"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-campus-500 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Student ID Number
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="STU-2026-XXXX"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-campus-500 text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-campus-600 hover:bg-campus-700 text-white text-xs font-bold shadow-md shadow-campus-600/20 transition-all hover:scale-102 mt-2"
            >
              Sign In to Campus Portal
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
