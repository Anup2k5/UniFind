import React from 'react';
import {
  Search,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Filter,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, CAMPUS_LOCATIONS } from '../data/mockData';

export const Hero = () => {
  const {
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    setReportModal,
    items,
    setActiveTab
  } = useApp();

  const totalReports = items.length;
  const lostCount = items.filter((i) => i.status === 'Lost').length;
  const foundCount = items.filter((i) => i.status === 'Found' || i.status === 'Matched').length;
  const resolvedCount = items.filter((i) => i.status === 'Resolved' || i.status === 'Claimed').length;

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-campus-50/70 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900/60 dark:to-slate-950 pt-8 pb-10 border-b border-slate-200/60 dark:border-slate-800/60">
      {/* Background decorative campus lattice / blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40 dark:opacity-20 overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-campus-400 blur-3xl" />
        <div className="absolute -top-20 right-1/4 w-80 h-80 rounded-full bg-indigo-400 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top pill badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-campus-200 dark:border-campus-800/80 shadow-sm text-xs font-semibold text-campus-700 dark:text-campus-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Official Campus Lost & Found Registry</span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="text-slate-500 dark:text-slate-400">89% Reunite Rate This Semester</span>
          </div>
        </div>

        {/* Heading & Subtitle */}
        <div className="text-center mt-4 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">
            Lost Something on Campus? <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-campus-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              We'll Help You Recover It Fast.
            </span>
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Search items reported across university libraries, halls, shuttles, and gyms.
            Automated student-to-student matching with verified campus safe-zone pickups.
          </p>
        </div>

        {/* Quick Dual Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setReportModal({ open: true, defaultType: 'lost' })}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-lg shadow-rose-600/25 transition-all hover:scale-105 active:scale-95"
          >
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
              ?
            </span>
            I Lost an Item
          </button>

          <button
            onClick={() => setReportModal({ open: true, defaultType: 'found' })}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-campus-600 hover:bg-campus-700 text-white font-semibold text-sm shadow-lg shadow-campus-600/25 transition-all hover:scale-105 active:scale-95"
          >
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
              !
            </span>
            I Found an Item
          </button>

          <button
            onClick={() => setActiveTab('matches')}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            View Smart Matches
          </button>
        </div>

        {/* Search & Multi-Filter Bar Container */}
        <div className="mt-8 max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-3 sm:p-4 shadow-xl border border-slate-200/80 dark:border-slate-800">
          
          {/* Main search row */}
          <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lost or found items (e.g. MacBook, AirPods, Hydro Flask, Keys)..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-campus-500 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Status pills selector */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  filterType === 'all'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                All Items
              </button>
              <button
                onClick={() => setFilterType('lost')}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  filterType === 'lost'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-rose-600'
                }`}
              >
                Lost ({lostCount})
              </button>
              <button
                onClick={() => setFilterType('found')}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  filterType === 'found'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-blue-600'
                }`}
              >
                Found ({foundCount})
              </button>
            </div>
          </div>

          {/* Secondary filter selectors (Category & Campus Location) */}
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex flex-wrap items-center gap-2.5 text-xs">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Filter by:
            </span>

            {/* Category dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-1.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-campus-500 cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Location dropdown */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="py-1.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-campus-500 cursor-pointer max-w-[220px] truncate"
            >
              <option value="all">All Campus Locations</option>
              {CAMPUS_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>

            {(selectedCategory !== 'all' || selectedLocation !== 'all' || searchQuery || filterType !== 'all') && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedLocation('all');
                  setSearchQuery('');
                  setFilterType('all');
                }}
                className="ml-auto text-campus-600 dark:text-campus-400 hover:underline font-semibold"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Campus Recovery Metrics Strip */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
          <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {totalReports}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Active Reports
            </div>
          </div>

          <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center">
            <div className="text-2xl font-black text-rose-600 dark:text-rose-400">
              {lostCount}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Items Lost
            </div>
          </div>

          <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center">
            <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
              {foundCount}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Items Found / Matched
            </div>
          </div>

          <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center">
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {resolvedCount + 28}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Reunited This Month
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
