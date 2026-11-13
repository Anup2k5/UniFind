import React, { useState, useEffect } from 'react';
import {
  X,
  Upload,
  Camera,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  Lock,
  Tag,
  Building,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, CAMPUS_LOCATIONS, SAFE_DROP_OFF_ZONES, SAMPLE_PHOTO_PRESETS } from '../data/mockData';
import { calculateMatchScore } from '../utils/helpers';

export const ReportItemModal = () => {
  const {
    reportModal,
    setReportModal,
    reportItem,
    items,
    currentUser,
    setSelectedItemModal
  } = useApp();

  const [type, setType] = useState(reportModal.defaultType || 'lost');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('electronics');
  const [location, setLocation] = useState(CAMPUS_LOCATIONS[0].name);
  const [specificLocation, setSpecificLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('12:00');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [safeZone, setSafeZone] = useState('');
  const [verificationQuestion, setVerificationQuestion] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [tagsInput, setTagsInput] = useState('');

  // Update default type when modal opens
  useEffect(() => {
    if (reportModal.open) {
      setType(reportModal.defaultType || 'lost');
      // Set default image preset
      if (!image) {
        setImage(SAMPLE_PHOTO_PRESETS[0].url);
      }
    }
  }, [reportModal.open, reportModal.defaultType]);

  if (!reportModal.open) return null;

  // Real-time potential match checker while typing
  const simulatedItem = {
    title,
    category,
    location,
    date,
    type,
    tags: tagsInput.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean)
  };

  const detectedMatches = items.filter((other) => {
    if (!title || title.length < 3) return false;
    return calculateMatchScore(
      type === 'lost' ? simulatedItem : other,
      type === 'found' ? simulatedItem : other
    ) >= 45;
  });

  const handleImageFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter an item name or title.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    reportItem({
      title: title.trim(),
      type,
      category,
      location,
      specificLocation: specificLocation.trim(),
      date,
      time,
      description: description.trim() || 'No additional details provided.',
      image: image || SAMPLE_PHOTO_PRESETS[0].url,
      safeZone: type === 'found' ? safeZone : null,
      verificationQuestion: type === 'found' ? verificationQuestion.trim() : null,
      isUrgent,
      tags
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Report Campus Item
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Submit your report to the university recovery registry
            </p>
          </div>
          <button
            onClick={() => setReportModal({ open: false, defaultType: 'lost' })}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Type Selector Tabs */}
        <div className="px-5 pt-4">
          <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
            <button
              type="button"
              onClick={() => setType('lost')}
              className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                type === 'lost'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-rose-600'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-xs font-black">
                ?
              </span>
              I Lost An Item
            </button>
            <button
              type="button"
              onClick={() => setType('found')}
              className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                type === 'found'
                  ? 'bg-campus-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-campus-600'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-xs font-black">
                !
              </span>
              I Found An Item
            </button>
          </div>
        </div>

        {/* Real-time Match Alert Banner if detected */}
        {detectedMatches.length > 0 && (
          <div className="mx-5 mt-3 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3 animate-slide-up">
            <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-xs font-bold text-amber-900 dark:text-amber-200">
                Possible Existing Campus Matches ({detectedMatches.length})
              </div>
              <p className="text-[11px] text-amber-800 dark:text-amber-400 mt-0.5">
                We spotted items already reported that might match what you're entering:
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {detectedMatches.slice(0, 2).map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setReportModal({ open: false, defaultType: 'lost' });
                      setSelectedItemModal(m);
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-800 text-[11px] font-semibold text-slate-800 dark:text-slate-200 hover:shadow-sm"
                  >
                    <span>{m.title}</span>
                    <span className="text-amber-600 font-bold">→ View</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 max-h-[65vh] overflow-y-auto space-y-4">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
              Item Name / Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Space Gray MacBook Air, Hydro Flask 32oz, Blue Dorm Keycard"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-campus-500 text-slate-900 dark:text-white"
            />
          </div>

          {/* Category & Campus Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-campus-500 text-slate-900 dark:text-white"
              >
                {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                Campus Location *
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-campus-500 text-slate-900 dark:text-white"
              >
                {CAMPUS_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Specific Location Spot */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
              Specific Room, Table, or Floor (Optional)
            </label>
            <input
              type="text"
              value={specificLocation}
              onChange={(e) => setSpecificLocation(e.target.value)}
              placeholder="e.g. 3rd floor study carrel #14, near water fountain, seat 12B"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-campus-500 text-slate-900 dark:text-white"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                Date {type === 'lost' ? 'Lost' : 'Found'} *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-campus-500 text-slate-900 dark:text-white"
              >
              </input>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                Approximate Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-campus-500 text-slate-900 dark:text-white"
              >
              </input>
            </div>
          </div>

          {/* Image Upload & Presets */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
              Item Photo (Upload or Pick a Campus Preset)
            </label>

            <div className="flex flex-col sm:flex-row gap-3 items-center">
              {/* Preview Box */}
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex-shrink-0 relative group">
                {image ? (
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                    <ImageIcon className="w-6 h-6" />
                    <span className="text-[10px]">No Image</span>
                  </div>
                )}
              </div>

              {/* Upload input + quick preset buttons */}
              <div className="flex-1 w-full space-y-2">
                <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors">
                  <Upload className="w-4 h-4 text-campus-500" />
                  <span>Upload Photo from Device</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileUpload}
                    className="hidden"
                  />
                </label>

                {/* Preset suggestions */}
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold mb-1">
                    Or select a sample campus preset:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {SAMPLE_PHOTO_PRESETS.slice(0, 6).map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setImage(preset.url)}
                        className={`text-[10px] px-2 py-0.5 rounded-md border transition-colors ${
                          image === preset.url
                            ? 'bg-campus-600 text-white border-campus-600'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
              Description & Distinctive Features *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe colors, brands, scratches, stickers, case type, or specific distinguishing marks..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-campus-500 text-slate-900 dark:text-white"
            />
          </div>

          {/* Found Item Special Fields: Safe Zone or Verification Question */}
          {type === 'found' && (
            <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/60 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 dark:text-blue-300">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Safe Custody & Proof Question
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Did you drop it off at a Campus Safe Zone?
                </label>
                <select
                  value={safeZone}
                  onChange={(e) => setSafeZone(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200"
                >
                  <option value="">No, I am keeping it safe myself</option>
                  {SAFE_DROP_OFF_ZONES.map((zone) => (
                    <option key={zone.id} value={zone.name}>
                      Yes: {zone.name} ({zone.building})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Secret Verification Question for Owner
                </label>
                <input
                  type="text"
                  value={verificationQuestion}
                  onChange={(e) => setVerificationQuestion(e.target.value)}
                  placeholder="e.g. What photo is on the phone lockscreen? Or what sticker is on the back?"
                  className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>
          )}

          {/* Tags & Urgent Checkbox */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                Keywords / Tags (comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="laptop, silver, stickers, apple"
                className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div className="pt-4">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="w-4 h-4 rounded text-campus-600 focus:ring-campus-500 border-slate-300"
                />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Mark as Urgent (ID Card, Keys, Vital Study Materials)
                </span>
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setReportModal({ open: false, defaultType: 'lost' })}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2.5 rounded-xl text-white text-xs font-bold shadow-md transition-all hover:scale-102 ${
                type === 'lost'
                  ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/25'
                  : 'bg-campus-600 hover:bg-campus-700 shadow-campus-600/25'
              }`}
            >
              Publish {type === 'lost' ? 'Lost' : 'Found'} Report
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
