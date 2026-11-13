import React from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  Eye,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Share2,
  Printer,
  Sparkles,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { timeAgo, getStatusBadgeStyle } from '../utils/helpers';
import { CATEGORIES } from '../data/mockData';

export const ItemCard = ({ item }) => {
  const {
    setSelectedItemModal,
    setClaimModalItem,
    setPrintFlyerItem,
    currentUser,
    recordView
  } = useApp();

  const statusStyle = getStatusBadgeStyle(item.status);
  const categoryObj = CATEGORIES.find((c) => c.id === item.category);

  const handleCardClick = () => {
    recordView(item.id);
    setSelectedItemModal(item);
  };

  const isOwner = currentUser?.id === item.reporter?.id;

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 flex flex-col overflow-hidden">
      
      {/* Top Image & Overlay Badges */}
      <div
        onClick={handleCardClick}
        className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Status Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm ${statusStyle.bg}`}
          >
            <span className={`w-2 h-2 rounded-full ${statusStyle.dot}`} />
            {statusStyle.label}
          </span>

          {item.isUrgent && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-600 text-white shadow-sm">
              Urgent
            </span>
          )}
        </div>

        {/* Type Ribbon (Lost vs Found) */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md text-white ${
              item.type === 'lost' ? 'bg-rose-600/90' : 'bg-campus-600/90'
            }`}
          >
            {item.type === 'lost' ? 'Lost Item' : 'Found Item'}
          </span>
        </div>

        {/* Safe Drop-off / Helpdesk Badge if at desk */}
        {item.safeZone && (
          <div className="absolute bottom-2 left-3 right-3">
            <div className="px-2.5 py-1 rounded-xl bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1.5 truncate">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span className="truncate">Safe at: {item.safeZone}</span>
            </div>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Category & Time Ago */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span className="inline-flex items-center gap-1 font-medium px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <Tag className="w-3 h-3 text-campus-500" />
              {categoryObj ? categoryObj.name : 'General'}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {timeAgo(item.createdAt || item.date)}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={handleCardClick}
            className="font-bold text-base text-slate-900 dark:text-white group-hover:text-campus-600 dark:group-hover:text-campus-400 cursor-pointer line-clamp-1 transition-colors"
          >
            {item.title}
          </h3>

          {/* Location */}
          <div className="mt-2 flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-campus-500 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-1 font-medium">{item.location}</span>
          </div>

          {/* Description snippet */}
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Reporter info & Action buttons */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/80">
          
          <div className="flex items-center justify-between mb-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-[10px] text-slate-700 dark:text-slate-300">
                {item.reporter?.name?.charAt(0) || 'U'}
              </div>
              <span className="text-slate-600 dark:text-slate-400 font-medium truncate max-w-[120px]">
                {item.reporter?.name || 'Campus Student'}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <Eye className="w-3 h-3" />
              <span>{item.views || 1} views</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCardClick}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
            >
              View Details
            </button>

            {item.type === 'found' && item.status !== 'Resolved' && !isOwner && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setClaimModalItem(item);
                }}
                className="py-2 px-3 rounded-xl bg-campus-600 hover:bg-campus-700 text-white text-xs font-semibold shadow-sm transition-all hover:scale-102"
              >
                Claim This
              </button>
            )}

            {item.type === 'lost' && item.status !== 'Resolved' && !isOwner && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  recordView(item.id);
                  setSelectedItemModal(item);
                }}
                className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all hover:scale-102"
              >
                I Found It
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                setPrintFlyerItem(item);
              }}
              title="Print Campus Notice Board Flyer"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
