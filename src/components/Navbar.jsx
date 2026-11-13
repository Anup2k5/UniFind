import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  PlusCircle,
  Sun,
  Moon,
  ShieldCheck,
  User,
  MapPin,
  Sparkles,
  Layers,
  ChevronDown,
  CheckCircle2,
  ExternalLink,
  LogOut,
  SlidersHorizontal,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DEMO_USERS } from '../data/mockData';

export const Navbar = () => {
  const {
    isDarkMode,
    setIsDarkMode,
    currentUser,
    switchUser,
    toggleAdminRole,
    activeTab,
    setActiveTab,
    unreadCount,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setReportModal,
    setAuthModalOpen,
    searchQuery,
    setSearchQuery,
    setSelectedItemModal
  } = useApp();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [reportDropdownOpen, setReportDropdownOpen] = useState(false);

  const notifRef = useRef(null);
  const userRef = useRef(null);
  const reportRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (reportRef.current && !reportRef.current.contains(event.target)) {
        setReportDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const userNotifications = notifications.filter(
    (n) => n.userId === currentUser.id || (currentUser.role === 'admin' && n.type === 'admin_alert')
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
      {/* Top emergency / campus ticker bar */}
      <div className="bg-gradient-to-r from-campus-900 via-campus-800 to-indigo-900 text-white text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500 text-white animate-pulse">
              LIVE
            </span>
            <span className="font-medium text-slate-200">
              Campus Public Safety Lost & Found Network • 4 Safe Drop-Off Desks Online
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verified Student Recovery Portal
            </span>
            <span className="text-slate-400">|</span>
            <span>Emergency Helpdesk: (555) 019-9111</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('browse')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-campus-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-campus-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white font-sans">
                    Uni<span className="text-campus-600 dark:text-campus-400">Find</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-campus-100 dark:bg-campus-950 text-campus-700 dark:text-campus-300 rounded border border-campus-200 dark:border-campus-800">
                    Campus
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 -mt-1 font-medium">
                  University Lost & Found
                </p>
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/60 p-1 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'browse'
                  ? 'bg-white dark:bg-slate-900 text-campus-600 dark:text-campus-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Browse Campus
            </button>

            <button
              onClick={() => setActiveTab('matches')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'matches'
                  ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Smart Matches
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-white dark:bg-slate-900 text-campus-600 dark:text-campus-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Student Hub
            </button>

            <button
              onClick={() => setActiveTab('safe-zones')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                activeTab === 'safe-zones'
                  ? 'bg-white dark:bg-slate-900 text-campus-600 dark:text-campus-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              Safe Desks
            </button>

            {currentUser.role === 'admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                  activeTab === 'admin'
                    ? 'bg-campus-600 text-white shadow-sm'
                    : 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Panel
              </button>
            )}
          </nav>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Report Button Dropdown */}
            <div className="relative" ref={reportRef}>
              <button
                onClick={() => setReportDropdownOpen(!reportDropdownOpen)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-campus-600 hover:bg-campus-700 text-white text-sm font-semibold shadow-md shadow-campus-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <PlusCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Report Item</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {reportDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-slide-up">
                  <button
                    onClick={() => {
                      setReportDropdownOpen(false);
                      setReportModal({ open: true, defaultType: 'lost' });
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/50 flex items-start gap-2.5 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <span className="text-base font-bold">?</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400">
                        I Lost an Item
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Ask the campus to help recover it
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setReportDropdownOpen(false);
                      setReportModal({ open: true, defaultType: 'found' });
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/50 flex items-start gap-2.5 transition-colors group mt-1"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <span className="text-base font-bold">!</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        I Found an Item
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Safely return it to a fellow student
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle theme"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="View notifications"
                className="relative p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-50 overflow-hidden animate-slide-up">
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
                        Notifications
                      </h3>
                      {unreadCount > 0 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-campus-100 dark:bg-campus-900 text-campus-700 dark:text-campus-300">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-xs text-campus-600 dark:text-campus-400 hover:underline font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                    {userNotifications.length === 0 ? (
                      <div className="p-6 text-center text-sm text-slate-400">
                        No notifications yet.
                      </div>
                    ) : (
                      userNotifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            markNotificationRead(notif.id);
                            if (notif.itemId) {
                              setSelectedItemModal(notif.itemId);
                            }
                            setNotificationsOpen(false);
                          }}
                          className={`p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors ${
                            !notif.read ? 'bg-campus-50/40 dark:bg-campus-950/20' : ''
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <div
                              className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                                !notif.read ? 'bg-campus-600' : 'bg-transparent'
                              }`}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-slate-900 dark:text-white">
                                {notif.title}
                              </p>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">
                                {notif.message}
                              </p>
                              <p className="text-[10px] text-slate-400 mt-1">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Switcher / Profile Menu */}
            <div className="relative" ref={userRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1.5 pl-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-lg object-cover"
                />
                <div className="hidden lg:block text-left pr-1">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight flex items-center gap-1">
                    {currentUser.name}
                    {currentUser.role === 'admin' && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[9px] font-black bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border border-purple-300">
                        ADMIN
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {currentUser.role === 'admin' ? 'Campus Administrator' : currentUser.studentId}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-slide-up">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl mb-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {currentUser.name}
                      </p>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        currentUser.role === 'admin'
                          ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border border-purple-300'
                          : 'bg-campus-100 text-campus-700 dark:bg-campus-950 dark:text-campus-300'
                      }`}>
                        {currentUser.role === 'admin' ? '🛡️ Administrator' : '🎓 Student'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {currentUser.email}
                    </p>

                    <button
                      onClick={() => toggleAdminRole()}
                      className="mt-2.5 w-full py-1.5 px-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                      <span>{currentUser.role === 'admin' ? 'Switch to Student View' : 'Switch to Admin View'}</span>
                    </button>
                  </div>

                  <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                    Quick Switch Account (Demo)
                  </div>

                  <div className="space-y-1">
                    {DEMO_USERS.map((demo) => (
                      <button
                        key={demo.id}
                        onClick={() => {
                          switchUser(demo);
                          setUserMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 p-2 rounded-lg text-left text-xs transition-colors ${
                          demo.id === currentUser.id
                            ? 'bg-campus-50 dark:bg-campus-950/60 text-campus-700 dark:text-campus-300 font-bold'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <img
                          src={demo.avatar}
                          alt={demo.name}
                          className="w-6 h-6 rounded-md object-cover"
                        />
                        <div className="flex-1 truncate">
                          <div>{demo.name}</div>
                          <div className="text-[10px] text-slate-400">
                            {demo.role === 'admin' ? '🛡️ Campus Officer (Admin)' : demo.studentId}
                          </div>
                        </div>
                        {demo.id === currentUser.id && (
                          <CheckCircle2 className="w-4 h-4 text-campus-600" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800 mt-2 pt-2">
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        setAuthModalOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <User className="w-3.5 h-3.5" />
                      Sign In with University ID / SSO
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Mobile Nav links strip */}
        <div className="flex md:hidden items-center justify-between py-2 border-t border-slate-200/60 dark:border-slate-800/60 gap-1 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'browse'
                ? 'bg-campus-600 text-white font-bold'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Browse Campus
          </button>
          <button
            onClick={() => setActiveTab('matches')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'matches'
                ? 'bg-amber-600 text-white font-bold'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            Smart Matches
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-campus-600 text-white font-bold'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Student Hub
          </button>
          <button
            onClick={() => setActiveTab('safe-zones')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'safe-zones'
                ? 'bg-campus-600 text-white font-bold'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Safe Desks
          </button>
          {currentUser.role === 'admin' && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
                activeTab === 'admin'
                  ? 'bg-purple-600 text-white font-bold'
                  : 'text-purple-600 dark:text-purple-400'
              }`}
            >
              Admin
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
