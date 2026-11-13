import React from 'react';
import {
  Sparkles,
  ArrowRight,
  MapPin,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { calculateMatchScore, formatDate, timeAgo } from '../utils/helpers';

export const SmartMatchesView = () => {
  const {
    items,
    currentUser,
    setSelectedItemModal,
    setClaimModalItem,
    triggerConfetti,
    addToast
  } = useApp();

  // Find all lost items and match them against found items
  const lostItems = items.filter((i) => i.type === 'lost' && i.status !== 'Resolved');
  const foundItems = items.filter((i) => i.type === 'found' && i.status !== 'Resolved');

  const matchPairs = [];

  lostItems.forEach((lost) => {
    foundItems.forEach((found) => {
      const score = calculateMatchScore(lost, found);
      if (score >= 40) {
        matchPairs.push({
          lost,
          found,
          score,
          isUserLostOwner: currentUser?.id === lost.reporter?.id,
          isUserFoundOwner: currentUser?.id === found.reporter?.id
        });
      }
    });
  });

  // Sort by highest match score
  matchPairs.sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-amber-500/15 via-campus-500/10 to-indigo-500/15 p-6 sm:p-8 border border-amber-200/80 dark:border-amber-900/40 mb-8 overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            AI & Algorithmic Smart Recovery
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Campus Smart Matches
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Our campus recovery algorithm cross-references lost items with found items reported across campus buildings, matching categories, locations, dates, and keywords.
          </p>
        </div>
      </div>

      {/* Match Results */}
      {matchPairs.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-500 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No Active High-Confidence Matches Right Now
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
            When new lost or found items are reported with overlapping details or locations, our engine will automatically surface them here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Showing {matchPairs.length} potential matching pairs</span>
            <span className="text-amber-600">Scores calculated in real-time</span>
          </div>

          {matchPairs.map((pair, idx) => (
            <div
              key={`${pair.lost.id}-${pair.found.id}-${idx}`}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              
              {/* Match Header with percentage pill */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    {pair.score}% Match Score
                  </div>
                  {(pair.isUserLostOwner || pair.isUserFoundOwner) && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-campus-100 dark:bg-campus-950 text-campus-700 dark:text-campus-300 border border-campus-300">
                      Involves Your Reported Item
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-400">
                  Detected {timeAgo(pair.found.createdAt || pair.found.date)}
                </div>
              </div>

              {/* Side by side comparison cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
                
                {/* Lost Item Card */}
                <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-600 text-white">
                        Reported Lost
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {formatDate(pair.lost.date)}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <img
                        src={pair.lost.image}
                        alt={pair.lost.title}
                        className="w-16 h-16 rounded-xl object-cover border border-rose-200 dark:border-rose-900"
                      />
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          {pair.lost.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-rose-500 flex-shrink-0" />
                          <span className="truncate">{pair.lost.location}</span>
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                      {pair.lost.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-rose-200/60 dark:border-rose-900/30 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Owner: {pair.lost.reporter?.name}
                    </span>
                    <button
                      onClick={() => setSelectedItemModal(pair.lost)}
                      className="text-xs font-semibold text-rose-700 dark:text-rose-400 hover:underline"
                    >
                      View Report →
                    </button>
                  </div>
                </div>

                {/* Found Item Card */}
                <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/40 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-campus-600 text-white">
                        Reported Found
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {formatDate(pair.found.date)}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <img
                        src={pair.found.image}
                        alt={pair.found.title}
                        className="w-16 h-16 rounded-xl object-cover border border-blue-200 dark:border-blue-900"
                      />
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          {pair.found.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-campus-500 flex-shrink-0" />
                          <span className="truncate">{pair.found.location}</span>
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                      {pair.found.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-blue-200/60 dark:border-blue-900/30 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Finder: {pair.found.reporter?.name}
                    </span>
                    <button
                      onClick={() => setSelectedItemModal(pair.found)}
                      className="text-xs font-semibold text-campus-700 dark:text-campus-400 hover:underline"
                    >
                      View Report →
                    </button>
                  </div>
                </div>

              </div>

              {/* Match Action Bar */}
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  Category matched: <span className="font-bold text-slate-700 dark:text-slate-300">{pair.lost.category}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setClaimModalItem(pair.found);
                    }}
                    className="px-4 py-2 rounded-xl bg-campus-600 hover:bg-campus-700 text-white text-xs font-bold shadow-md shadow-campus-600/20 transition-all hover:scale-102"
                  >
                    Confirm & File Claim for Found Item
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
