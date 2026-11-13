import React, { useState } from 'react';
import {
  Layers,
  Filter,
  ArrowUpDown,
  Search,
  Sparkles,
  PlusCircle,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ItemCard } from './ItemCard';
import { CATEGORIES, CAMPUS_LOCATIONS } from '../data/mockData';

export const BrowseView = () => {
  const {
    items,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    filterStatus,
    setFilterStatus,
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    sortBy,
    setSortBy,
    setReportModal
  } = useApp();

  // Filter items logic
  const filteredItems = items.filter((item) => {
    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchLoc = item.location.toLowerCase().includes(q);
      const matchTags = (item.tags || []).some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchLoc && !matchTags) return false;
    }

    // 2. Filter Type (lost vs found)
    if (filterType !== 'all') {
      if (item.type !== filterType) return false;
    }

    // 3. Filter Status (Lost, Found, Matched, Claimed, Resolved)
    if (filterStatus !== 'all') {
      if (item.status.toLowerCase() !== filterStatus.toLowerCase()) return false;
    }

    // 4. Category
    if (selectedCategory !== 'all') {
      if (item.category !== selectedCategory) return false;
    }

    // 5. Campus Location
    if (selectedLocation !== 'all') {
      if (item.location !== selectedLocation) return false;
    }

    return true;
  });

  // Sorting
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date);
    }
    if (sortBy === 'oldest') {
      return new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date);
    }
    if (sortBy === 'popular') {
      return (b.views || 0) - (a.views || 0);
    }
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Category Pills Horizontal Scroller */}
      <div className="mb-6 pb-2 overflow-x-auto flex items-center gap-2 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = cat.id === 'all'
            ? items.length
            : items.filter((i) => i.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-campus-600 text-white border-campus-600 shadow-md shadow-campus-600/25 scale-[1.02]'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                  isSelected
                    ? 'bg-white/25 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results Header with View / Sort controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            Campus Lost & Found Bulletin
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Showing <strong className="text-slate-800 dark:text-slate-200">{sortedItems.length}</strong> items reported across campus
          </p>
        </div>

        {/* Sorting Dropdown & Status Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 self-stretch sm:self-auto text-xs">
          {/* Status selector */}
          <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1">
            {['all', 'Lost', 'Found', 'Resolved'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  filterStatus === st
                    ? 'bg-campus-100 dark:bg-campus-950 text-campus-700 dark:text-campus-300 font-bold'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {st === 'all' ? 'All Status' : st}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-slate-700 dark:text-slate-300 font-medium focus:outline-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Viewed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Items Card Grid */}
      {sortedItems.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 max-w-lg mx-auto my-6">
          <div className="w-16 h-16 rounded-2xl bg-campus-50 dark:bg-campus-950/60 text-campus-600 dark:text-campus-400 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No campus items match your criteria
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Try adjusting your search terms, campus location, or category filter to discover more reported items.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedLocation('all');
                setFilterType('all');
                setFilterStatus('all');
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors"
            >
              Clear All Filters
            </button>
            <button
              onClick={() => setReportModal({ open: true, defaultType: 'lost' })}
              className="px-4 py-2 rounded-xl bg-campus-600 hover:bg-campus-700 text-xs font-bold text-white shadow-md transition-all"
            >
              Report Your Missing Item
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Bottom CTA Banner */}
      <div className="mt-14 rounded-3xl bg-gradient-to-r from-campus-600 via-indigo-600 to-purple-600 text-white p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-black">
            Can't find what you lost on campus?
          </h3>
          <p className="text-xs sm:text-sm text-campus-100 mt-1 max-w-xl">
            Publish a lost report now. When someone finds it or turns it in at a safe desk, our smart matching system will alert you instantly.
          </p>
        </div>

        <button
          onClick={() => setReportModal({ open: true, defaultType: 'lost' })}
          className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-campus-700 font-extrabold text-sm shadow-lg hover:bg-campus-50 transition-all hover:scale-105 active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          Report Missing Item
        </button>
      </div>

    </div>
  );
};
